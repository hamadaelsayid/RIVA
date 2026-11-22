export type Language = 'ar' | 'en';
export type PersonaMode = 'hardware' | 'service';
export type PageView = 'home' | 'simulator' | 'bscan' | 'offerings' | 'specs';

export type StructureType = 'bridge_deck' | 'industrial_floor' | 'parking_slab' | 'pier_column';
export type EnvironmentExposure = 'coastal' | 'urban' | 'industrial';

export interface StructuralParameters {
  structureType: StructureType;
  length: number; // in meters (5 - 100)
  width: number; // in meters (2 - 30)
  depth: number; // in centimeters (15 - 100)
  ageYears: number; // in years (1 - 60)
  exposure: EnvironmentExposure;
  rebarDiameterMm: number; // e.g. 16, 20, 25, 32
}

export interface DefectZone {
  id: string;
  type: 'rust' | 'crack' | 'void' | 'moisture';
  x: number; // normalized 0 - 1
  y: number; // normalized 0 - 1
  depthCm: number;
  severity: 'low' | 'moderate' | 'critical';
  amplitudeDb: number;
}

export interface ScenarioResult {
  areaM2: number;
  volumeM3: number;
  scanDurationHours: number;
  
  // Scenario 1: RIVA
  rivaServiceCostEgp: number;
  rivaServiceCostUsd: number;
  rivaHardwareRoiMonths: number;
  rivaDamagePercent: number;
  rivaAccuracyPercent: number;

  // Scenario 2: Traditional Core Drilling
  coresRequired: number;
  traditionalCostEgp: number;
  traditionalCostUsd: number;
  traditionalDowntimeDays: number;
  traditionalDamagePercent: number;

  // Scenario 3: Do Nothing
  projected3YrEscalationEgp: number;
  projected5YrEscalationEgp: number;
  corrosionVolumeMultiplier: number;
  spallingRiskScore: number; // 0 - 100

  // AI advisory
  advisoryTextAr: string;
  advisoryTextEn: string;
}
