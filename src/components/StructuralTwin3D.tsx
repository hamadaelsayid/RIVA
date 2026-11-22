import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { StructuralParameters } from '../types';
import { Eye, EyeOff, Layers, RotateCcw, Zap, Compass, ShieldAlert, Cpu } from 'lucide-react';

interface StructuralTwin3DProps {
  params: StructuralParameters;
  isArabic: boolean;
}

export const StructuralTwin3D: React.FC<StructuralTwin3DProps> = ({ params, isArabic }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fallbackCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const [useFallback, setUseFallback] = useState(false);
  const [xrayMode, setXrayMode] = useState(true);
  const [showRebars, setShowRebars] = useState(true);
  const [showDefects, setShowDefects] = useState(true);
  const [isScanning, setIsScanning] = useState(true);
  const [roverPosition, setRoverPosition] = useState({ x: 0, y: 0 });
  const [hudCollapsed, setHudCollapsed] = useState(false);

  // Store mutable control refs to communicate with Three.js render loop without remounting
  const controlFlags = useRef({
    xrayMode: true,
    showRebars: true,
    showDefects: true,
    isScanning: true,
    camTarget: new THREE.Vector3(0, 0, 0),
    camPos: new THREE.Vector3(12, 10, 16),
  });

  useEffect(() => {
    controlFlags.current.xrayMode = xrayMode;
    controlFlags.current.showRebars = showRebars;
    controlFlags.current.showDefects = showDefects;
    controlFlags.current.isScanning = isScanning;
  }, [xrayMode, showRebars, showDefects, isScanning]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL
    let isSoftwareGl = false;
    try {
      const probeCanvas = document.createElement('canvas');
      const gl = probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
      if (!gl) {
        setUseFallback(true);
        return;
      }
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      isSoftwareGl = /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    } catch {
      setUseFallback(true);
      return;
    }

    // Three.js scene setup
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch (e) {
      console.warn('WebGL initialization failed, falling back to 2D isometric canvas:', e);
      setUseFallback(true);
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;
    renderer.setSize(width, height);
    renderer.setClearColor(0x0b1120, 1);

    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    canvasRef.current = renderer.domElement;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0b1120, 0.025);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(12, 10, 15);
    camera.lookAt(0, 0, 0);

    // Studio Environment Lighting
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // Studio 3-point lighting rig
    const ambientLight = new THREE.HemisphereLight(0x38bdf8, 0x0f172a, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff7ed, 1.8);
    dirLight.position.set(15, 20, 12);
    dirLight.castShadow = !isSoftwareGl;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.bias = -0.0005;
    dirLight.shadow.camera.near = 1;
    dirLight.shadow.camera.far = 40;
    dirLight.shadow.camera.left = -12;
    dirLight.shadow.camera.right = 12;
    dirLight.shadow.camera.top = 12;
    dirLight.shadow.camera.bottom = -12;
    scene.add(dirLight);

    const rimLight = new THREE.DirectionalLight(0x00cfff, 1.2);
    rimLight.position.set(-15, 8, -10);
    scene.add(rimLight);

    // Procedural Concrete Texture for realistic physical material
    const concreteCanvas = document.createElement('canvas');
    concreteCanvas.width = 256;
    concreteCanvas.height = 256;
    const ctx = concreteCanvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#64748b';
      ctx.fillRect(0, 0, 256, 256);
      for (let i = 0; i < 4000; i++) {
        const val = Math.floor(Math.random() * 60 + 100);
        ctx.fillStyle = `rgba(${val}, ${val + 5}, ${val + 10}, 0.12)`;
        ctx.fillRect(Math.random() * 256, Math.random() * 256, Math.random() * 3 + 1, Math.random() * 3 + 1);
      }
    }
    const concreteTexture = new THREE.CanvasTexture(concreteCanvas);
    concreteTexture.colorSpace = THREE.SRGBColorSpace;
    concreteTexture.wrapS = THREE.RepeatWrapping;
    concreteTexture.wrapT = THREE.RepeatWrapping;
    concreteTexture.repeat.set(4, 4);

    // Structural Slab Dimensions (normalized for 3D viewport)
    // Map length (5 - 100m) to (6 - 16 units), width (2 - 30m) to (3 - 10 units), depth (15 - 100cm) to (0.6 - 2.2 units)
    const slabL = Math.min(16, Math.max(6, (params.length / 100) * 10 + 6));
    const slabW = Math.min(10, Math.max(3.5, (params.width / 30) * 6.5 + 3.5));
    const slabD = Math.min(2.2, Math.max(0.6, (params.depth / 100) * 1.6 + 0.6));

    const slabGroup = new THREE.Group();
    scene.add(slabGroup);

    // Concrete Slab Mesh
    const slabGeom = new THREE.BoxGeometry(slabL, slabD, slabW);
    const concreteMat = new THREE.MeshPhysicalMaterial({
      color: 0x94a3b8,
      map: concreteTexture,
      roughness: 0.85,
      metalness: 0.05,
      transparent: true,
      opacity: controlFlags.current.xrayMode ? 0.45 : 0.95,
      depthWrite: true,
    });
    const slabMesh = new THREE.Mesh(slabGeom, concreteMat);
    slabMesh.position.y = slabD / 2;
    slabMesh.castShadow = true;
    slabMesh.receiveShadow = true;
    slabGroup.add(slabMesh);

    // Wireframe Cage for the slab
    const wireGeom = new THREE.EdgesGeometry(slabGeom);
    const wireMat = new THREE.LineBasicMaterial({ color: 0x00cfff, transparent: true, opacity: 0.6 });
    const wireMesh = new THREE.LineSegments(wireGeom, wireMat);
    wireMesh.position.y = slabD / 2;
    slabGroup.add(wireMesh);

    // Ground Grid & Shadow plane
    const gridHelper = new THREE.GridHelper(30, 30, 0x0284c7, 0x1e293b);
    gridHelper.position.y = -0.01;
    scene.add(gridHelper);

    // Contact shadow beneath slab
    const shadowGeom = new THREE.PlaneGeometry(slabL * 1.2, slabW * 1.2);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x020617,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
    });
    const shadowPlane = new THREE.Mesh(shadowGeom, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = 0.005;
    scene.add(shadowPlane);

    // Internal Rebar Mesh Group
    const rebarGroup = new THREE.Group();
    slabGroup.add(rebarGroup);

    const rebarRadius = 0.035;
    const healthyRebarMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.35,
      metalness: 0.85,
    });
    const rustedRebarMat = new THREE.MeshStandardMaterial({
      color: 0xf97316,
      emissive: 0xea580c,
      emissiveIntensity: 0.45,
      roughness: 0.85,
      metalness: 0.2,
    });

    // Longitudinal rebars (along X axis)
    const numLongRebars = Math.max(4, Math.floor(slabW * 1.8));
    const zStep = (slabW - 0.4) / (numLongRebars - 1);
    const longGeom = new THREE.CylinderGeometry(rebarRadius, rebarRadius, slabL - 0.4, 8);
    longGeom.rotateZ(Math.PI / 2);

    for (let i = 0; i < numLongRebars; i++) {
      const zPos = -slabW / 2 + 0.2 + i * zStep;
      // top layer rebar
      const isRustedZone = i === 1 || i === 2;
      const barTop = new THREE.Mesh(longGeom, isRustedZone ? rustedRebarMat : healthyRebarMat);
      barTop.position.set(0, slabD * 0.75, zPos);
      rebarGroup.add(barTop);

      // bottom layer rebar
      const barBottom = new THREE.Mesh(longGeom, healthyRebarMat);
      barBottom.position.set(0, slabD * 0.25, zPos);
      rebarGroup.add(barBottom);
    }

    // Transverse rebars (along Z axis)
    const numTransRebars = Math.max(6, Math.floor(slabL * 1.5));
    const xStep = (slabL - 0.4) / (numTransRebars - 1);
    const transGeom = new THREE.CylinderGeometry(rebarRadius, rebarRadius, slabW - 0.4, 8);
    transGeom.rotateX(Math.PI / 2);

    for (let j = 0; j < numTransRebars; j++) {
      const xPos = -slabL / 2 + 0.2 + j * xStep;
      const isRustedZone = j >= 2 && j <= 4;
      const barTrans = new THREE.Mesh(transGeom, isRustedZone ? rustedRebarMat : healthyRebarMat);
      barTrans.position.set(xPos, slabD * 0.78, 0);
      rebarGroup.add(barTrans);
    }

    // Defect & Void Clusters (Corrosion anomalies & Internal cracks)
    const defectsGroup = new THREE.Group();
    slabGroup.add(defectsGroup);

    // Void anomaly 1 (Delamination air void)
    const voidGeom = new THREE.SphereGeometry(0.35, 16, 16);
    voidGeom.scale(1.8, 0.4, 1.2);
    const voidMat = new THREE.MeshPhysicalMaterial({
      color: 0x00cfff,
      emissive: 0x0284c7,
      emissiveIntensity: 0.6,
      transparent: true,
      opacity: 0.8,
      roughness: 0.2,
      transmission: 0.4,
    });
    const voidMesh = new THREE.Mesh(voidGeom, voidMat);
    voidMesh.position.set(slabL * 0.2, slabD * 0.65, -slabW * 0.2);
    defectsGroup.add(voidMesh);

    // Corrosion hotspot halo
    const rustHaloGeom = new THREE.SphereGeometry(0.5, 16, 16);
    rustHaloGeom.scale(2.2, 0.5, 1.5);
    const rustHaloMat = new THREE.MeshStandardMaterial({
      color: 0xf97316,
      emissive: 0xf97316,
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 0.65,
      roughness: 0.9,
    });
    const rustHalo = new THREE.Mesh(rustHaloGeom, rustHaloMat);
    rustHalo.position.set(-slabL * 0.25, slabD * 0.75, slabW * 0.15);
    defectsGroup.add(rustHalo);

    // ----------------------------------------------------
    // COMPOSITE PROCEDURAL MODEL: RIVA RADAR ROVER (8 PARTS)
    // ----------------------------------------------------
    const roverGroup = new THREE.Group();
    scene.add(roverGroup);

    // Part 1: Main Robotic Chassis
    const chassisGeom = new THREE.BoxGeometry(0.9, 0.22, 0.65);
    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a, // Deep Radar Navy
      metalness: 0.85,
      roughness: 0.25,
    });
    const chassis = new THREE.Mesh(chassisGeom, chassisMat);
    chassis.position.y = 0.2;
    chassis.castShadow = true;
    roverGroup.add(chassis);

    // Part 2: Radar Payload Enclosure with Cyan Accent Stripe
    const payloadGeom = new THREE.BoxGeometry(0.65, 0.2, 0.5);
    const payloadMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.7,
      roughness: 0.3,
    });
    const payload = new THREE.Mesh(payloadGeom, payloadMat);
    payload.position.set(0, 0.35, 0);
    payload.castShadow = true;
    roverGroup.add(payload);

    const stripeGeom = new THREE.BoxGeometry(0.66, 0.04, 0.52);
    const stripeMat = new THREE.MeshBasicMaterial({ color: 0x00cfff });
    const stripe = new THREE.Mesh(stripeGeom, stripeMat);
    stripe.position.set(0, 0.38, 0);
    roverGroup.add(stripe);

    // Part 3: LiDAR Dome & Stereo Telemetry Camera
    const lidarGeom = new THREE.CylinderGeometry(0.1, 0.12, 0.08, 16);
    const lidarMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.9, roughness: 0.1 });
    const lidar = new THREE.Mesh(lidarGeom, lidarMat);
    lidar.position.set(0.18, 0.48, 0);
    roverGroup.add(lidar);

    // Part 4: 4 Rugged All-Terrain Rubber Wheels with Metal Hubcaps
    const wheelGeom = new THREE.CylinderGeometry(0.13, 0.13, 0.08, 16);
    wheelGeom.rotateX(Math.PI / 2);
    const tireMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.9, metalness: 0.1 });
    const hubMat = new THREE.MeshStandardMaterial({ color: 0x00cfff, roughness: 0.3, metalness: 0.8 });

    const wheelPositions = [
      [-0.32, 0.13, 0.34],
      [0.32, 0.13, 0.34],
      [-0.32, 0.13, -0.34],
      [0.32, 0.13, -0.34],
    ];

    wheelPositions.forEach(([wx, wy, wz]) => {
      const wheel = new THREE.Mesh(wheelGeom, tireMat);
      wheel.position.set(wx, wy, wz);
      wheel.castShadow = true;
      roverGroup.add(wheel);

      const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.085, 12), hubMat);
      hub.rotateX(Math.PI / 2);
      hub.position.set(wx, wy, wz);
      roverGroup.add(hub);
    });

    // Part 5: Optical Quadrature Odometry Sensor (600-PPR disk)
    const odoGeom = new THREE.CylinderGeometry(0.07, 0.07, 0.02, 16);
    const odoMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9, roughness: 0.2 });
    const odo = new THREE.Mesh(odoGeom, odoMat);
    odo.position.set(-0.35, 0.13, -0.25);
    roverGroup.add(odo);

    // Part 6: Transmit/Receive Horn Antenna Assembly underneath
    const hornGeom = new THREE.ConeGeometry(0.18, 0.14, 4);
    hornGeom.rotateX(Math.PI);
    const hornMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.95, roughness: 0.15 });
    const horn = new THREE.Mesh(hornGeom, hornMat);
    horn.position.set(0, 0.08, 0);
    roverGroup.add(horn);

    // Part 7: Telemetry Mast & High-Gain Antenna
    const mastGeom = new THREE.CylinderGeometry(0.015, 0.015, 0.45, 8);
    const mastMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.9, roughness: 0.2 });
    const mast = new THREE.Mesh(mastGeom, mastMat);
    mast.position.set(-0.25, 0.55, -0.15);
    roverGroup.add(mast);

    // Part 8: 1.0–2.6 GHz Radar Wave Cone (Penetrating into concrete)
    const coneGeom = new THREE.ConeGeometry(0.7, 1.2, 16, 1, true);
    coneGeom.rotateX(Math.PI);
    const coneMat = new THREE.MeshBasicMaterial({
      color: 0x00cfff,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const radarCone = new THREE.Mesh(coneGeom, coneMat);
    radarCone.position.set(0, -0.5, 0);
    roverGroup.add(radarCone);

    // Internal radar wavefront pulse
    const ringGeom = new THREE.RingGeometry(0.1, 0.45, 16);
    ringGeom.rotateX(-Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.7,
      side: THREE.DoubleSide,
    });
    const waveRing = new THREE.Mesh(ringGeom, ringMat);
    waveRing.position.set(0, -0.4, 0);
    roverGroup.add(waveRing);

    // Position rover on top surface of slab
    roverGroup.position.set(0, slabD, 0);

    // Camera Orbit & Interaction Controls (Without external controls library)
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let camSpherical = {
      radius: 18,
      theta: 0.8,
      phi: 1.0,
    };

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      camSpherical.theta -= deltaX * 0.008;
      camSpherical.phi = Math.max(0.15, Math.min(Math.PI / 2 - 0.05, camSpherical.phi - deltaY * 0.008));
    };

    const handlePointerUp = (e: PointerEvent) => {
      isDragging = false;
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // Safe ignore
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      camSpherical.radius = Math.max(7, Math.min(32, camSpherical.radius + e.deltaY * 0.02));
    };

    const canvasElem = renderer.domElement;
    canvasElem.addEventListener('pointerdown', handlePointerDown);
    canvasElem.addEventListener('pointermove', handlePointerMove);
    canvasElem.addEventListener('pointerup', handlePointerUp);
    canvasElem.addEventListener('wheel', handleWheel, { passive: false });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // Animation Render Loop with Exponential Damping
    let animId = 0;
    let scanTime = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Dynamic updates from control flags
      concreteMat.opacity = controlFlags.current.xrayMode ? 0.35 : 0.95;
      rebarGroup.visible = controlFlags.current.showRebars;
      defectsGroup.visible = controlFlags.current.showDefects;

      // Autonomous Rover Motion across slab surface
      if (controlFlags.current.isScanning) {
        scanTime += delta * 0.75;
        // Raster pattern: sinusoidal along length with lane step
        const scanRangeX = (slabL / 2) - 0.7;
        const scanRangeZ = (slabW / 2) - 0.6;
        
        const roverX = Math.sin(scanTime) * scanRangeX;
        const roverZ = Math.cos(scanTime * 0.25) * scanRangeZ;
        roverGroup.position.x = roverX;
        roverGroup.position.z = roverZ;
        roverGroup.position.y = slabD;

        // Point rover along direction of movement
        const heading = Math.atan2(-Math.sin(scanTime * 0.25) * 0.25, Math.cos(scanTime));
        roverGroup.rotation.y = THREE.MathUtils.damp(roverGroup.rotation.y, heading, 8, delta);

        // Animate radar emission wave
        radarCone.rotation.y += delta * 3;
        waveRing.scale.setScalar(1 + (Math.sin(scanTime * 10) * 0.3 + 0.3));
        waveRing.position.y = -0.3 - ((scanTime * 3) % 0.8);

        // Update telemetry state for UI (sampled)
        if (Math.random() < 0.05) {
          setRoverPosition({
            x: Math.round(((roverX + slabL / 2) / slabL) * params.length * 10) / 10,
            y: Math.round(((roverZ + slabW / 2) / slabW) * params.width * 10) / 10,
          });
        }
      }

      // Smooth camera position damping
      const targetCamX = camSpherical.radius * Math.sin(camSpherical.phi) * Math.sin(camSpherical.theta);
      const targetCamY = camSpherical.radius * Math.cos(camSpherical.phi);
      const targetCamZ = camSpherical.radius * Math.sin(camSpherical.phi) * Math.cos(camSpherical.theta);

      camera.position.x = THREE.MathUtils.damp(camera.position.x, targetCamX, 6, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCamY, 6, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, targetCamZ, 6, delta);
      camera.lookAt(0, slabD * 0.5, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      canvasElem.removeEventListener('pointerdown', handlePointerDown);
      canvasElem.removeEventListener('pointermove', handlePointerMove);
      canvasElem.removeEventListener('pointerup', handlePointerUp);
      canvasElem.removeEventListener('wheel', handleWheel);
      renderer.dispose();
      slabGeom.dispose();
      concreteMat.dispose();
    };
  }, [params]);

  // Fallback 2D Canvas Isometric renderer if WebGL unavailable
  useEffect(() => {
    if (!useFallback || !fallbackCanvasRef.current) return;
    const canvas = fallbackCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let t = 0;

    const render2D = () => {
      animId = requestAnimationFrame(render2D);
      t += 0.02;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Isometric projection helper
      const toIso = (x: number, y: number, z: number) => {
        return {
          px: cx + (x - z) * Math.cos(Math.PI / 6) * 18,
          py: cy + (x + z) * Math.sin(Math.PI / 6) * 18 - y * 18,
        };
      };

      // Draw concrete slab base
      ctx.fillStyle = '#1e293b';
      ctx.strokeStyle = '#00cfff';
      ctx.lineWidth = 1.5;

      const p0 = toIso(-6, 0, -4);
      const p1 = toIso(6, 0, -4);
      const p2 = toIso(6, 0, 4);
      const p3 = toIso(-6, 0, 4);

      ctx.beginPath();
      ctx.moveTo(p0.px, p0.py);
      ctx.lineTo(p1.px, p1.py);
      ctx.lineTo(p2.px, p2.py);
      ctx.lineTo(p3.px, p3.py);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Draw top face
      const t0 = toIso(-6, 2, -4);
      const t1 = toIso(6, 2, -4);
      const t2 = toIso(6, 2, 4);
      const t3 = toIso(-6, 2, 4);

      ctx.fillStyle = xrayMode ? 'rgba(30, 41, 59, 0.5)' : '#334155';
      ctx.beginPath();
      ctx.moveTo(t0.px, t0.py);
      ctx.lineTo(t1.px, t1.py);
      ctx.lineTo(t2.px, t2.py);
      ctx.lineTo(t3.px, t3.py);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Draw internal rebars
      if (showRebars) {
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 2;
        for (let i = -3; i <= 3; i += 1.5) {
          const rA = toIso(-5.5, 1.2, i);
          const rB = toIso(5.5, 1.2, i);
          ctx.beginPath();
          ctx.moveTo(rA.px, rA.py);
          ctx.lineTo(rB.px, rB.py);
          ctx.stroke();
        }
      }

      // Draw rover
      const rx = Math.sin(t) * 4;
      const rz = Math.cos(t * 0.5) * 2.5;
      const roverPt = toIso(rx, 2.3, rz);

      ctx.fillStyle = '#00cfff';
      ctx.beginPath();
      ctx.arc(roverPt.px, roverPt.py, 10, 0, Math.PI * 2);
      ctx.fill();

      // Radar cone
      ctx.strokeStyle = 'rgba(0, 207, 255, 0.4)';
      ctx.fillStyle = 'rgba(0, 207, 255, 0.15)';
      ctx.beginPath();
      ctx.moveTo(roverPt.px, roverPt.py);
      const c1 = toIso(rx - 1.5, 0.5, rz - 1.5);
      const c2 = toIso(rx + 1.5, 0.5, rz + 1.5);
      ctx.lineTo(c1.px, c1.py);
      ctx.lineTo(c2.px, c2.py);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    };

    render2D();
    return () => cancelAnimationFrame(animId);
  }, [useFallback, xrayMode, showRebars]);

  return (
    <div className="relative w-full h-[540px] md:h-[620px] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col">
      {/* Top Status & Telemetry Bar */}
      <div className="absolute top-3 left-3 right-3 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="flex items-center gap-2 bg-slate-900/90 text-slate-100 px-3 py-1.5 rounded-lg border border-slate-700/80 shadow-md text-xs font-mono pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
          <span className="font-semibold text-cyan-400">RIVA ROVER V3:</span>
          <span>1.0–2.6 GHz SFCW</span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-300">X: {roverPosition.x}m, Y: {roverPosition.y}m</span>
        </div>

        <div className="flex items-center gap-2 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-700/80 shadow-md text-xs pointer-events-auto">
          <span className="text-slate-400">{isArabic ? 'العنصر:' : 'Element:'}</span>
          <span className="text-slate-100 font-semibold">{params.length}m × {params.width}m × {params.depth}cm</span>
        </div>
      </div>

      {/* Main 3D Viewport / Canvas Container */}
      <div className="relative flex-1 w-full h-full cursor-grab active:cursor-grabbing">
        {!useFallback ? (
          <div ref={mountRef} className="w-full h-full" />
        ) : (
          <canvas
            ref={fallbackCanvasRef}
            width={800}
            height={500}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Floating Legend Badge (Top-right corner, non-intrusive) */}
      <div className="absolute top-14 right-3 z-10 bg-slate-900/85 backdrop-blur-none border border-slate-800 rounded-lg p-2.5 text-[11px] text-slate-300 space-y-1.5 pointer-events-none hidden sm:block">
        <div className="flex items-center gap-2">
          <span className="w-3 h-1 bg-slate-400 rounded-full inline-block"></span>
          <span>{isArabic ? 'حديد سليم (غطاء كافٍ)' : 'Healthy Rebar'}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-1 bg-orange-500 rounded-full inline-block"></span>
          <span className="text-orange-300 font-medium">{isArabic ? 'أكسدة صدأ نشطة (Orange)' : 'Active Corrosion Zone'}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-cyan-400/70 border border-cyan-400 rounded-full inline-block"></span>
          <span className="text-cyan-300 font-medium">{isArabic ? 'فجوة هوائية / شرخ دقيق' : 'Subsurface Void / Delamination'}</span>
        </div>
      </div>

      {/* Unified Bottom Control Dock (Compliant with Three.js skill: pinned to bottom center, zero side occlusion, collapsible) */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 w-[94%] max-w-[760px] pointer-events-auto">
        {/* Toggle Collapse Pill */}
        <div className="flex justify-center mb-1">
          <button
            onClick={() => setHudCollapsed(!hudCollapsed)}
            className="px-3 py-0.5 text-[11px] font-mono bg-slate-900/90 text-slate-400 hover:text-cyan-300 border border-slate-700/60 rounded-full shadow transition-colors"
          >
            {hudCollapsed ? (isArabic ? '▲ إظهار أزرار التحكم بالرؤية 3D' : '▲ Show 3D Viewport Controls') : (isArabic ? '▼ إخفاء لوحة التحكم' : '▼ Minimize Dock')}
          </button>
        </div>

        {!hudCollapsed && (
          <div className="bg-slate-900/95 border border-slate-700/80 rounded-xl p-2.5 shadow-2xl flex flex-wrap items-center justify-between gap-2 text-xs">
            {/* View Toggles */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                onClick={() => setXrayMode(!xrayMode)}
                className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all font-medium ${
                  xrayMode ? 'bg-cyan-600/30 text-cyan-300 border border-cyan-500/50' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {xrayMode ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{isArabic ? 'الأشعة X-Ray' : 'X-Ray View'}</span>
              </button>

              <button
                onClick={() => setShowRebars(!showRebars)}
                className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all font-medium ${
                  showRebars ? 'bg-cyan-600/30 text-cyan-300 border border-cyan-500/50' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{isArabic ? 'حديد التسليح' : 'Rebar Grid'}</span>
              </button>

              <button
                onClick={() => setShowDefects(!showDefects)}
                className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all font-medium ${
                  showDefects ? 'bg-orange-500/20 text-orange-300 border border-orange-500/50' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>{isArabic ? 'بؤر الصدأ' : 'Rust Anomalies'}</span>
              </button>
            </div>

            {/* Scan State & Hint */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsScanning(!isScanning)}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition-all ${
                  isScanning ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-800 text-slate-400'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>{isScanning ? (isArabic ? 'المسح نشط' : 'Scanning...') : (isArabic ? 'استئناف المسح' : 'Resume Scan')}</span>
              </button>

              <span className="text-[11px] text-slate-400 font-mono hidden md:inline">
                {isArabic ? 'اسحب لتدوير المشهد • عجلة الماوس للتكبير' : 'Drag to Rotate • Scroll to Zoom'}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
