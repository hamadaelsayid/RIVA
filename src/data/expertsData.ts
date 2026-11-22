export interface ExpertProfile {
  id: string;
  nameAr: string;
  nameEn: string;
  roleAr: string;
  roleEn: string;
  divisionAr: string;
  divisionEn: string;
  academicAr: string;
  academicEn: string;
  bioAr: string;
  bioEn: string;
  avatarColor: string;
  initials: string;
  skills: string[];
  innovationsAr: string[];
  innovationsEn: string[];
  publicationsCount: number;
  portfolioUrl: string;
  linkedinUrl: string;
  scholarUrl: string;
}

export const EXPERTS_DATA: ExpertProfile[] = [
  {
    id: 'tarek-mansour',
    nameAr: 'د. طارق منصور',
    nameEn: 'Dr. Tarek Mansour',
    roleAr: 'كبير مهندسي معمارية الترددات اللاسلكية والميكروويف (Principal RF Architect)',
    roleEn: 'Principal RF & Microwave Hardware Architect',
    divisionAr: 'فريق أجهزة التردد اللاسلكي والميكروويف (RF & Microwave)',
    divisionEn: 'RF & Microwave Hardware Division',
    academicAr: 'دكتوراه هندسة الاتصالات والميكروويف — جامعة القاهرة بالتعاون مع جامعة ميونخ التقنية (TUM)',
    academicEn: 'Ph.D. in Microwave Systems, Cairo University & TU Munich (TUM)',
    bioAr: 'خبير في تصميم مرسلات ومستقبلات التردد المتدرج (1.0–2.6 GHz SFCW). صمم مصفوفة هوائيات فيفالدي مزدوجة الاستقطاب ذات تشتت طوري متدنٍ ومعامل انعكاس S11 < -15 dB لضمان اختراق موجي أعمق في الخرسانة الكثيفة.',
    bioEn: 'Pioneered RIVA’s 1.0–2.6 GHz Stepped Frequency Continuous Wave (SFCW) RF front-end. Designed ultra-wideband antipodal Vivaldi antenna horns with low phase distortion and S11 < -15 dB for high concrete penetration.',
    avatarColor: 'from-cyan-600 to-blue-600',
    initials: 'TM',
    skills: ['SFCW Synthesizers', 'Vivaldi Arrays', 'RF Baluns', 'S11 Tuning', 'Rogers Substrates'],
    innovationsAr: [
      'براءة اختراع في توليد 512 خطوة ترددية متزامنة من 1.0 إلى 2.6 جيجاهرتز',
      'هوائيات فيفالدي مزدوجة بنظام Microstrip على ركائز روجرز RT/duroid',
    ],
    innovationsEn: [
      'Proprietary 512-channel coherent SFCW RF frequency synthesizer',
      'High-gain dual-polarization antipodal Vivaldi array on Rogers substrate',
    ],
    publicationsCount: 14,
    portfolioUrl: 'https://scholar.google.com/citations?user=tarek-mansour-riva',
    linkedinUrl: 'https://linkedin.com/in/tarek-mansour-rf',
    scholarUrl: 'https://researchgate.net/profile/Tarek-Mansour-Microwave',
  },
  {
    id: 'sarah-elkady',
    nameAr: 'م. سارة القاضي',
    nameEn: 'Eng. Sarah El-Kady',
    roleAr: 'رئيسة قسم الأنظمة المدمجة والروبوتات الميدانية (Lead Robotics & Firmware)',
    roleEn: 'Lead Robotics Systems & Embedded Firmware Engineer',
    divisionAr: 'فريق الأنظمة المدمجة والتحكم الروبوتي (Robotics Control)',
    divisionEn: 'Embedded Systems & Robotics Control Division',
    academicAr: 'ماجستير هندسة الروبوتات والتحكم الآلي — كلية الهندسة جامعة عين شمس',
    academicEn: 'M.Sc. in Autonomous Robotics & Real-Time Embedded Systems, Ain Shams University',
    bioAr: 'طورت منظومة الدفع الرباعي المستقلة (4WD) لروبوت ريفا، مع ربط مشفر المسافات البصري عالي الدقة (600-PPR Optical Odometry) لمزامنة إطلاق النبضات مع كل مليمتر حركة وتفادي أي انزلاق على المنحدرات والجسور.',
    bioEn: 'Architected the autonomous 4WD mobility rover platform and integrated industrial 600-PPR optical quadrature odometry for millimeter-accurate spatial synchronization, preventing wheel slip on bridge decks.',
    avatarColor: 'from-amber-600 to-orange-600',
    initials: 'SK',
    skills: ['Optical Odometry 600-PPR', 'STM32 RTOS', 'CAN-Bus', 'Obstacle Avoidance', 'Torque Vectoring'],
    innovationsAr: [
      'خوارزمية مزامنة النبضات الرادارية مع مشفر العجلات 600-PPR',
      'نظام أمان وتوجيه ذاتي ضد السقوط من حواف الجسور والفواصل الإنشائية',
    ],
    innovationsEn: [
      'Hardware-level radar trigger synchronization with 600-PPR quadrature encoder',
      'Deck expansion joint and drop-off fail-safe autonomous navigation system',
    ],
    publicationsCount: 8,
    portfolioUrl: 'https://github.com/sarah-elkady-robotics',
    linkedinUrl: 'https://linkedin.com/in/sarah-elkady-robotics',
    scholarUrl: 'https://ieeexplore.ieee.org/author/sarah-elkady',
  },
  {
    id: 'omar-fahmy',
    nameAr: 'د. عمر فهمي',
    nameEn: 'Dr. Omar Fahmy',
    roleAr: 'قائد معالجة الإشارات الرقمية والرادار SAR (Lead Radar DSP Architect)',
    roleEn: 'Lead Radar DSP & Synthetic Aperture Imaging Architect',
    divisionAr: 'فريق معالجة الإشارات والذكاء الاصطناعي (DSP & AI)',
    divisionEn: 'DSP & Signal Migration Division',
    academicAr: 'دكتوراه في المعالجة الكهرومغناطيسية الرقمية — الجامعة الأمريكية بالقاهرة بالتعاون مع جامعة واترلو',
    academicEn: 'Ph.D. in Computational Electromagnetics, AUC & University of Waterloo',
    bioAr: 'مطور خوارزمية Stolt f-k SAR Migration في ريفا لتحويل انعكاسات القطع المكافئ المشتتة إلى نقاط تركيز هندسية دقيقة، ومحلل طور هيلبرت الفوري (Hilbert Phase) للكشف المبكر عن بؤر رطوبة الأملاح والصدأ.',
    bioEn: 'Developed RIVA’s Stolt f-k frequency-wavenumber SAR migration pipeline to focus hyperbolic rebar reflections, alongside instantaneous Hilbert phase tracking to isolate early chloride moisture pockets.',
    avatarColor: 'from-emerald-600 to-teal-600',
    initials: 'OF',
    skills: ['Stolt f-k Migration', 'Hilbert Transform', 'Wavelet Denoising', '3D WebGL Twins', 'GPU Acceleration'],
    innovationsAr: [
      'محرك معالجة رقمية فوري يحول إشارات B-Scan إلى نماذج 3D في أقل من ثانية',
      'خوارزمية ذكاء اصطناعي لتمييز انعكاسات الفجوات الهوائية عن أكاسيد الحديد',
    ],
    innovationsEn: [
      'Sub-second Synthetic Aperture Radar (SAR) 3D volumetric migration engine',
      'Dielectric phase classifier discerning air voids from rust oxide volumes',
    ],
    publicationsCount: 19,
    portfolioUrl: 'https://github.com/omar-fahmy-dsp',
    linkedinUrl: 'https://linkedin.com/in/omar-fahmy-dsp',
    scholarUrl: 'https://researchgate.net/profile/Omar-Fahmy-SAR',
  },
  {
    id: 'khaled-abdelrahman',
    nameAr: 'د. خالد عبد الرحمن',
    nameEn: 'Dr. Khaled Abdel-Rahman, P.E.',
    roleAr: 'استشاري سلامة المنشآت والخرسانة المسلحة (Principal Structural Consultant)',
    roleEn: 'Principal Structural & Concrete Durability Consultant',
    divisionAr: 'فريق الفحص الإنشائي المعتمد والمطابقة للكود (Civil & Standards)',
    divisionEn: 'Structural NDT & Standards Certification Division',
    academicAr: 'دكتوراه الهندسة الإنشائية ومواد التشييد — جامعة الإسكندرية • عضو شعبة الهندسة المدنية بنقابة المهندسين المصرية',
    academicEn: 'Ph.D. in Structural Concrete Durability, Alexandria University • Licensed Consultant (ECP 203)',
    bioAr: 'استشاري معتمد بخبرة تزيد عن 22 عاماً في تقييم الجسور ومراقبة تدهور الخرسانة. أشرف على موائمة خوارزميات ريفا مع الكود المصري ECP 203 ومعايير ASTM D6432 وتطبيق قانون دي سيتر (Law of Fives) للتنبؤ بالتكاليف.',
    bioEn: 'Over 22 years of civil infrastructure forensic experience. Oversees RIVA’s mathematical calibration against the Egyptian Concrete Practice code (ECP 203) and De Sitter’s Law of Fives multi-year deterioration models.',
    avatarColor: 'from-sky-700 to-indigo-800',
    initials: 'KA',
    skills: ['ECP 203 Code', 'ASTM D6432', 'De Sitter Law of Fives', 'Bridge Inspection', 'Corrosion Forensics'],
    innovationsAr: [
      'صياغة مصفوفة تقييم خطورة تساقط الغطاء الخرساني (Spalling Index)',
      'تطوير نموذج التنبؤ بتكاليف الترميم الخمسية المعتمد في تقارير ريفا الرسمية',
    ],
    innovationsEn: [
      'Formulation of RIVA’s automated concrete cover spalling vulnerability score',
      'Calibration of De Sitter 3-year & 5-year cost escalation models for consultant reports',
    ],
    publicationsCount: 26,
    portfolioUrl: 'https://syndicate-eg.org/consultants/khaled-abdelrahman',
    linkedinUrl: 'https://linkedin.com/in/khaled-abdelrahman-pe',
    scholarUrl: 'https://scholar.google.com/citations?user=khaled-abdelrahman-concrete',
  },
];
