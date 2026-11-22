import { Language } from '../types';

export interface Translations {
  brand: {
    name: string;
    tagline: string;
    subtagline: string;
    standards: string;
  };
  nav: {
    home: string;
    simulator: string;
    bscan: string;
    offerings: string;
    specs: string;
    team: string;
    quote: string;
    personaHardware: string;
    personaService: string;
  };
  home: {
    badge: string;
    headline: string;
    subheadline: string;
    missionTitle: string;
    missionText: string;
    howItWorksTitle: string;
    howItWorksSubtitle: string;
    steps: {
      step1Title: string;
      step1Desc: string;
      step2Title: string;
      step2Desc: string;
      step3Title: string;
      step3Desc: string;
    };
    useCasesTitle: string;
    useCasesSubtitle: string;
    useCases: {
      bridgesTitle: string;
      bridgesDesc: string;
      bridgesBenefit: string;
      floorsTitle: string;
      floorsDesc: string;
      floorsBenefit: string;
      parkingTitle: string;
      parkingDesc: string;
      parkingBenefit: string;
      marineTitle: string;
      marineDesc: string;
      marineBenefit: string;
    };
    foundersTitle: string;
    foundersSubtitle: string;
    ctaSimulator: string;
    ctaServices: string;
  };
  hero: {
    badge: string;
    titlePart1: string;
    titleHighlight: string;
    titlePart2: string;
    desc: string;
    ctaService: string;
    ctaHardware: string;
    metric1Val: string;
    metric1Label: string;
    metric2Val: string;
    metric2Label: string;
    metric3Val: string;
    metric3Label: string;
    metric4Val: string;
    metric4Label: string;
  };
  simulator: {
    title: string;
    subtitle: string;
    paramsTitle: string;
    structureTypeLabel: string;
    types: {
      bridge_deck: string;
      industrial_floor: string;
      parking_slab: string;
      pier_column: string;
    };
    lengthLabel: string;
    widthLabel: string;
    depthLabel: string;
    ageLabel: string;
    exposureLabel: string;
    exposures: {
      coastal: string;
      urban: string;
      industrial: string;
    };
    runSimBtn: string;
    generatingAi: string;
    viewportTitle: string;
    viewportLiveBadge: string;
    roverStatus: string;
    roverScanning: string;
    toggleXray: string;
    toggleRebars: string;
    toggleDefects: string;
    resetCam: string;
    legendHealthy: string;
    legendRust: string;
    legendVoid: string;
    scenariosTitle: string;
    scenariosSubtitle: string;
    sc1Title: string;
    sc1Badge: string;
    sc1Duration: string;
    sc1Cost: string;
    sc1Roi: string;
    sc1Damage: string;
    sc1Accuracy: string;
    sc2Title: string;
    sc2Badge: string;
    sc2Cores: string;
    sc2Cost: string;
    sc2Downtime: string;
    sc2Damage: string;
    sc2Blindspots: string;
    sc3Title: string;
    sc3Badge: string;
    sc3LawTitle: string;
    sc3LawDesc: string;
    sc3Cost3Yr: string;
    sc3Cost5Yr: string;
    sc3Expansion: string;
    sc3RiskLevel: string;
    aiAdvisoryTitle: string;
    bookThisPlanBtn: string;
  };
  bscan: {
    title: string;
    subtitle: string;
    slideInstruction: string;
    beforeLabel: string;
    afterLabel: string;
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
    feature3Title: string;
    feature3Desc: string;
  };
  offerings: {
    title: string;
    subtitle: string;
    trackATitle: string;
    trackASubtitle: string;
    trackAPrice: string;
    trackAFeatures: string[];
    trackACta: string;
    trackADatasheetBtn: string;
    trackBTitle: string;
    trackBSubtitle: string;
    trackBPrice: string;
    trackBFeatures: string[];
    trackBCta: string;
    trackBSampleReportBtn: string;
  };
  matrix: {
    title: string;
    subtitle: string;
    colFeature: string;
    colRiva: string;
    colGpr: string;
    colCores: string;
    rows: {
      tech: [string, string, string, string];
      damage: [string, string, string, string];
      speed: [string, string, string, string];
      depthAccuracy: [string, string, string, string];
      costPerSqm: [string, string, string, string];
      trafficImpact: [string, string, string, string];
      digitalTwin: [string, string, string, string];
    };
  };
  team: {
    title: string;
    subtitle: string;
    div1Title: string;
    div1Desc: string;
    div1Specs: string;
    div2Title: string;
    div2Desc: string;
    div2Specs: string;
    div3Title: string;
    div3Desc: string;
    div3Specs: string;
  };
  form: {
    title: string;
    subtitle: string;
    prefilledNotice: string;
    orgLabel: string;
    contactLabel: string;
    emailLabel: string;
    phoneLabel: string;
    trackSelectLabel: string;
    trackHardwareOption: string;
    trackServiceOption: string;
    projectLocationLabel: string;
    notesLabel: string;
    submitBtn: string;
    submitting: string;
    successTitle: string;
    successDesc: string;
    downloadDocBtn: string;
  };
  rdModal: {
    title: string;
    badge: string;
    subtitle: string;
    section1Title: string;
    section1Text: string;
    section2Title: string;
    section2Text: string;
    section3Title: string;
    section3Text: string;
    closeBtn: string;
  };
}

export const content: Record<Language, Translations> = {
  ar: {
    brand: {
      name: 'RIVA',
      tagline: 'أنظمة الرادار الروبوتية المتقدمة للكشف غير الإتلافي',
      subtagline: '1.0–2.6 GHz UWB SFCW / FMCW Robotic NDT Systems',
      standards: 'متوافق مع الكود المصري للخرسانة (ECP 203) ومعايير ASTM D6432',
    },
    nav: {
      home: 'الرئيسية',
      simulator: 'المحاكي ثلاثي الأبعاد',
      bscan: 'الأشعة المقطعية B-Scan',
      offerings: 'الباقات والتعاقد',
      specs: 'المواصفات الهندسية R&D',
      team: 'الفريق المؤسس',
      quote: 'طلب عرض سعر / حجز',
      personaHardware: 'شراء روبوت RIVA',
      personaService: 'طلب فحص ميداني معتمد',
    },
    home: {
      badge: 'ابتكار عميق مصري 🇪🇬 • تقنية فحص غير إتلافي ذكية (NDT)',
      headline: 'حماية وتأمين البنية التحتية والخرسانة برادارات روبوتية فائقة الدقة',
      subheadline: 'منظومة ريفا تمنح المهندسين والاستشاريين والجهات المالكة رؤية داخلية شاملة لما تحت سطح الخرسانة دون الحاجة لتكسير أو تعطيل الحركة التشغيلية.',
      missionTitle: 'ما هو مشروع ريفا (RIVA)؟',
      missionText: 'ريفا هي شركة تكنولوجيا عميقة ناشئة تطور أول روبوت راداري مصري متعدد الترددات (1.0–2.6 GHz SFCW). يقوم الروبوت بالمسح الذاتي لأسطح الخرسانة، وتحويل الإشارات الميكروويفية المنعكسة إلى نموذج ثلاثي الأبعاد يكشف صدأ حديد التسليح والشروخ الدقيقة بدقة ±1 مليمتر، موفراً أكثر من 80% من تكاليف الاختبارات الإتلافية التقليدية وفق الكود المصري ECP 203.',
      howItWorksTitle: 'كيف تعمل تقنية ريفا في 3 خطوات بسيطة؟',
      howItWorksSubtitle: 'مسار عمل سلس يضمن الانتقال من الفحص الميداني إلى التقرير الهندسي المعتمد',
      steps: {
        step1Title: '1. مسح ميداني روبوتي ذاتي',
        step1Desc: 'يتحرك روبوت ريفا على سطح العنصر الإنشائي بمحدد مسافات بصري دقيق يطلق موجات رادارية غير ضارة تخترق حتى عمق 100 سم.',
        step2Title: '2. معالجة الإشارات وتوليد التوأم الرقمي',
        step2Desc: 'تُعالج الانعكاسات بخوارزميات Stolt f-k و Hilbert Phase لرسم خريطة ثلاثية الأبعاد واضحة لشبكة الحديد وبؤر التآكل.',
        step3Title: '3. تقرير استشاري معتمد وتوصيات تدعيم',
        step3Desc: 'استخراج فوري للتقرير الهندسي الشامل وقائمة بالخطوات العلاجية الموصى بها لمنع تفاقم الأضرار وتوفير التكاليف.',
      },
      useCasesTitle: 'أين وكيف يُستخدم رادار ريفا؟',
      useCasesSubtitle: 'تطبيقات عملية مصممة لحماية أهم عناصر البنية التحتية المدنية والصناعية',
      useCases: {
        bridgesTitle: 'بلاطات وركائز الجسور والكباري',
        bridgesDesc: 'فحص بلاطات الكباري العلوية والأنفاق دون إغلاق الطرق السريعة، وتحديد عمق الغطاء الخرساني وبؤر الصدأ الناتجة عن مياه الأمطار.',
        bridgesBenefit: 'فحص حتى 1,200 م² يومياً بدون تعطيل مروري',
        floorsTitle: 'أرضيات المصانع والمستودعات الثقيلة',
        floorsDesc: 'رصد الشروخ الدقيقة وتكهفات الهواء تحت الأرضيات الخرسانية قبل مرور الرافعات والمعدات الثقيلة لمنع الانهيارات المفاجئة.',
        floorsBenefit: 'تجنب توقف خطوط الإنتاج والعمليات الصناعية',
        parkingTitle: 'مواقف السيارات والمباني التجارية',
        parkingDesc: 'الكشف عن تسربات المياه المعالجة بالأملاح والكلوريدات التي تهاجم أسياخ التسليح السفلية وتسبب تساقط الغطاء (Spalling).',
        parkingBenefit: 'حماية الأرواح والسيارات من تساقط الخرسانة',
        marineTitle: 'المنشآت البحرية والأرصفة والموانئ',
        marineDesc: 'مراقبة تغلغل أيونات الكلوريد البحرية عبر الخرسانة في البيئات الساحلية الشديدة، وحساب العمر المتبقي قبل الحاجة لإعادة التأهيل.',
        marineBenefit: 'تطبيق قانون دي سيتر لتوفير ملايين الجنيهات',
      },
      foundersTitle: 'الفريق الهندسي والمؤسسون',
      foundersSubtitle: 'كفاءات هندسية متخصصة تقود ثورة الفحص غير الإتلافي في مصر والشرق الأوسط',
      ctaSimulator: 'تجربة محاكي التوأم الرقمي 3D الآن',
      ctaServices: 'استعراض باقات الخدمة والأسعار',
    },
    hero: {
      badge: 'ابتكار عميق مصري 🇪🇬 • متوافق مع ECP 203 و ASTM D6432',
      titlePart1: 'رؤية تشخيصية متقدمة لجسور ومنشآت الخرسانة',
      titleHighlight: 'بدون تكسير سنتيمتر واحد',
      titlePart2: 'بدقة المليمتر عبر موجات الرادار الترددية',
      desc: 'نظام ريفا (RIVA) الروبوتي يجمع بين موجات الرادار فائقة النطاق 1.0–2.6 GHz وخوارزميات المعالجة الرقمية للإشارات لتوليد توأم رقمي 3D يكشف صدأ حديد التسليح والشروخ الداخلية مبكراً بنسبة 98% وتوفير يصل إلى 85% من تكاليف الترميم التقليدي.',
      ctaService: 'طلب فحص ميداني معتمد (IaaS)',
      ctaHardware: 'شراء روبوت RIVA للشركات والمختبرات',
      metric1Val: '0%',
      metric1Label: 'تلف إنشائي (فحص غير إتلافي بالكامل)',
      metric2Val: '1.0–2.6 GHz',
      metric2Label: 'نطاق ترددي فائق (SFCW/FMCW)',
      metric3Val: '±1 mm',
      metric3Label: 'دقة تحديد عمق الغطاء الخرساني',
      metric4Val: '85%',
      metric4Label: 'وفر في التكاليف مقارنة بالتكسير ولب الخرسانة',
    },
    simulator: {
      title: 'محاكي التوأم الرقمي ثلاثي الأبعاد واختبار السيناريوهات',
      subtitle: 'أدخل أبعاد ومواصفات منشأتك لتشغيل مسح راداري افتراضي فوري وحساب مقارنة التكاليف الهندسية',
      paramsTitle: 'المدخلات الهندسية للمنشأة',
      structureTypeLabel: 'نوع العنصر الإنشائي:',
      types: {
        bridge_deck: 'بلاطة كوبري (Bridge Deck Slab)',
        industrial_floor: 'أرضية مصنع خرسانية (Industrial Floor)',
        parking_slab: 'بلاطة مبنى أو جراج (Parking Slab)',
        pier_column: 'ركيزة أو عمود جسر (Bridge Pier)',
      },
      lengthLabel: 'الطول (L):',
      widthLabel: 'العرض (W):',
      depthLabel: 'سُمك الخرسانة (D):',
      ageLabel: 'عمر المنشأة الحالي:',
      exposureLabel: 'البيئة التشغيلية ومستوى التعرض:',
      exposures: {
        coastal: 'ساحلية رطبة (أملاح وكلوريدات عالية)',
        urban: 'حضرية (عوادم سيارات وتكربن)',
        industrial: 'صناعية (أحماض واهتزازات كيميائية)',
      },
      runSimBtn: 'تشغيل محاكاة الرادار وتحليل السيناريوهات 3D',
      generatingAi: 'جارِ تحليل المخاطر الهندسية وتوليد التقرير الذكي...',
      viewportTitle: 'منصة المحاكاة ثلاثية الأبعاد (3D Digital Twin Viewport)',
      viewportLiveBadge: 'المسح التفاعلي المباشر نشط',
      roverStatus: 'حالة الروبوت:',
      roverScanning: 'مسح مستمر 1.0–2.6 GHz عبر الحساس الضوئي 600-PPR',
      toggleXray: 'رؤية الأشعة السينية (X-Ray)',
      toggleRebars: 'شبكة حديد التسليح',
      toggleDefects: 'تحديد بؤر الصدأ والفجوات',
      resetCam: 'إعادة ضبط الكاميرا',
      legendHealthy: 'حديد سليم (غطاء مطابق)',
      legendRust: 'بؤر صدأ نشطة (أكسدة الحديد)',
      legendVoid: 'شروخ دقيقة وفجوات هوائية',
      scenariosTitle: 'المقارنة الهندسية والمالية الثلاثية للسيناريوهات',
      scenariosSubtitle: 'تطبيق مباشر لقانون دي سيتر للتدهور الخرساني (De Sitter’s Law of Fives)',
      sc1Title: 'السيناريو الأول: استخدام RIVA (الخيار الذكي)',
      sc1Badge: 'أعلى عائد استثماري وأمان للمنشأة',
      sc1Duration: 'زمن المسح الشامل:',
      sc1Cost: 'تكلفة خدمة الفحص المعتمد:',
      sc1Roi: 'فترة استرداد استثمار الروبوت:',
      sc1Damage: 'نسبة التلف الإنشائي الناتج:',
      sc1Accuracy: 'دقة الكشف المبكر عن الصدأ:',
      sc2Title: 'السيناريو الثاني: الطرق التقليدية (Core Drilling)',
      sc2Badge: 'تكسير إتلافي ومخاطر إنشائية عالية',
      sc2Cores: 'عدد العينات الأسطوانية المطلوبة:',
      sc2Cost: 'تكلفة التكسير والاختبار ومعالجة الثقوب:',
      sc2Downtime: 'فترة تعطل حركة المرور/المصنع:',
      sc2Damage: 'ضعف إنشائي دائم ومناطق عمياء:',
      sc2Blindspots: 'احتمال فقدان بؤر صدأ خفية بين العينات يتجاوز 70%',
      sc3Title: 'السيناريو الثالث: ترك المنشأة كما هي (Do Nothing)',
      sc3Badge: 'تصاعد كارثي في تكاليف الترميم (De Sitter)',
      sc3LawTitle: 'قانون المضاعفة الخمسية لتدهور الخرسانة:',
      sc3LawDesc: 'كل جنيه يُنفق اليوم في الكشف المبكر بالرادار يوفر 5 جنيهات عند بداية تساقط الغطاء و25 جنيهاً عند ضرورة استبدال العنصر الإنشائي كاملاً.',
      sc3Cost3Yr: 'تكلفة الترميم المتوقعة بعد 3 سنوات:',
      sc3Cost5Yr: 'تكلفة الاستبدال والتدعيم بعد 5 سنوات:',
      sc3Expansion: 'تمدد حجم الحديد المصاب بالصدأ:',
      sc3RiskLevel: 'مؤشر خطورة تشظي الغطاء الخرساني (Spalling):',
      aiAdvisoryTitle: 'التوصية الهندسية الاستشارية للذكاء الاصطناعي (RIVA Engineering Advisory):',
      bookThisPlanBtn: 'اعتماد هذه النتائج والانتقال لطلب الفحص أو الشراء فوراً',
    },
    bscan: {
      title: 'محلل الأشعة الرادارية B-Scan التفاعلي',
      subtitle: 'اسحب الفاصل لمقارنة سطح الخرسانة الظاهري بالبنية الداخلية الدقيقة كما يراها رادار ريفا',
      slideInstruction: 'اسحب المؤشر لليمين واليسار لاستكشاف العمق الراداري',
      beforeLabel: 'السطح الخرساني الظاهري (بدون عيوب مرئية)',
      afterLabel: 'صورة رادار RIVA المقطعية (B-Scan Synthetic Aperture)',
      feature1Title: 'انعكاسات قطع مكافئ (Hyperbolic Profiles)',
      feature1Desc: 'تحديد دقيق لمواقع وأقطار أسياخ التسليح وعمق الغطاء الخرساني بدقة ±1 مليمتر وفق كود ECP 203.',
      feature2Title: 'رصد تشتت السعة والطور (Amplitude & Phase Inversion)',
      feature2Desc: 'التمييز الدقيق بين التصدعات الهوائية، التكهفات الرطبة، وتراكم أكاسيد الحديد المتمددة بنسبة 300–600%.',
      feature3Title: 'توليد خرائط توزيع الصدأ (Corrosion Probability Heatmap)',
      feature3Desc: 'تحويل بيانات النبضات الرادارية إلى خرائط حرارية ملونة جاهزة لتقارير الاستشاريين والجهات المالكة.',
    },
    offerings: {
      title: 'خيارات التعاقد: امتلك التكنولوجيا أو اطلب خدماتنا الميدانية',
      subtitle: 'حلول مرنة تلبي متطلبات شركات المقاولات، مكاتب الاستشارات الهندسية، والهيئات الحكومية',
      trackATitle: 'المسار الأول: شراء روبوت RIVA Rover',
      trackASubtitle: 'امتلك أحدث منظومة فحص راداري مستقلة لمؤسستك',
      trackAPrice: 'تواصل لطلب عرض سعر مخصص للشركات والمختبرات',
      trackAFeatures: [
        'وحدة الروبوت المستقلة مع شاسيه متين للأراضي الوعرة والجسور',
        'نظام إرسال واستقبال ميكروويف مخصص 1.0–2.6 GHz SFCW',
        'محدد مسافات بصري عالي الدقة (600-PPR Optical Odometry)',
        'ترخيص برمجيات RIVA Studio لتوليد التوائم الرقمية ثلاثية الأبعاد',
        'تدريب هندسي ميداني معتمد لفريق الفحص مع ضمان وصيانة لسنتين',
      ],
      trackACta: 'طلب شراء وحدة RIVA ومواصفاتها',
      trackADatasheetBtn: 'تحميل ورقة المواصفات الهندسية (PDF Datasheet)',
      trackBTitle: 'المسار الثاني: فحص ميداني معتمد (IaaS)',
      trackBSubtitle: 'فريق هندسي متخصص ينفذ المسح ويقدم تقارير استشارية مختومة',
      trackBPrice: 'يبدأ من 45 جنيه مصري للمتر المربع (حسب المساحة والموقع)',
      trackBFeatures: [
        'فريق فحص معتمد مجهز بأحدث روبوتات RIVA وأجهزة التحديد الميداني',
        'تغطية شاملة 100% للمساحة بدون إغلاق كامل لحركة السير أو تعطيل العمل',
        'تسليم التقرير الهندسي الشامل والنموذج ثلاثي الأبعاد خلال 24–48 ساعة',
        'اعتماد التقرير ومطابقته للكود المصري للمنشآت الخرسانية (ECP 203)',
        'توصيات تدعيم فورية وخرائط عمق الغطاء الخرساني وبؤر التآكل',
      ],
      trackBCta: 'حجز فحص ميداني لمشروعك الآن',
      trackBSampleReportBtn: 'تحميل نموذج تقرير استشاري معتمد (Sample Report)',
    },
    matrix: {
      title: 'المقارنة الهندسية والتشغيلية الشاملة',
      subtitle: 'لماذا يتفوق نظام ريفا على الحلول المستوردة التقليدية والتكسير الميداني؟',
      colFeature: 'وجه المقارنة الهندسي',
      colRiva: 'نظام ريفا الذكي (RIVA)',
      colGpr: 'أجهزة GPR المستوردة التقليدية',
      colCores: 'التكسير وأخذ القلوب (Core Drilling)',
      rows: {
        tech: ['تقنية الفحص', 'رادار روبوتي 1.0–2.6 GHz SFCW + 3D Twin', 'رادار نبضي يدوي أحادي الهوائي', 'تكسير إتلافي ميكانيكي بآلات الثقب'],
        damage: ['التلف الإنشائي', '0% (فحص غير إتلافي بالكامل)', '0% (فحص غير إتلافي يدوي)', 'تلف دائم في الغطاء والحديد وتوليد شروخ دقيقة'],
        speed: ['سرعة التغطية', 'حتى 1,200 م² يومياً بالمسح الآلي', '150–250 م² يومياً مسح يدوي شاق', '4–8 عينات فقط يومياً مع بطء شديد'],
        depthAccuracy: ['دقة تحديد الصدأ والعمق', '±1 mm مع خرائط حرارية ثلاثية الأبعاد', '±10 mm بصور رمادية صعبة التفسير', 'نقطي موضعي في مكان العينة فقط دون كشف ما بينها'],
        costPerSqm: ['التكلفة الإجمالية للمشروع', 'اقتصادية جداً ومحلية (توفير حتى 85%)', 'مرتفعة جداً (سعر استيراد يتجاوز $35,000)', 'باهظة للغاية تشمل التكسير، المعامل والترميم'],
        trafficImpact: ['تعطيل حركة المرور أو العمل', 'صفر إلى محدود جداً في حارة واحدة مؤقتة', 'يتطلب تواجد عمالة مكثفة يدوية', 'إغلاق كامل للمنشأة لعدة أيام مع خطورة أمان'],
        digitalTwin: ['مخرجات التقرير', 'توأم رقمي تفاعلي 3D + تقرير ذكاء اصطناعي', 'لقطات شاشة ثنائية الأبعاد مجتزأة', 'شهادة نتائج مخبرية متأخرة بعد أسبوعين'],
      },
    },
    team: {
      title: 'الفريق الهندسي المؤسس والخبرات المتخصصة',
      subtitle: 'كفاءات مصرية متخصصة في هندسة الترددات اللاسلكية، الروبوتات الميدانية ومعالجة الإشارات الرقمية',
      div1Title: 'فريق أجهزة التردد اللاسلكي والميكروويف (RF & Microwave)',
      div1Desc: 'مسؤول عن تصميم مُركّب التردد فائق النطاق 1.0–2.6 GHz، وهوائيات Vivaldi المزدوجة الاستقطاب ذات الكسب المتماثل وخفض الضوضاء الحرارية لتغلغل موجي فائق في الخرسانة الكثيفة.',
      div1Specs: 'SFCW Architecture • Ultra-Wideband Baluns • Return Loss S11 < -15dB',
      div2Title: 'فريق الأنظمة المدمجة والتحكم الروبوتي (Embedded & Robotics)',
      div2Desc: 'تطوير منصة الحركة المستقلة ذات الدفع الرباعي، حساسات المسافات البصرية 600-PPR، أنظمة السلامة وتتبع المسارات الميدانية في الظروف القاسية بدون انقطاع.',
      div2Specs: 'Real-time STM32/RTOS • Optical Quadrature Odometry • Auto-Grid Guidance',
      div3Title: 'فريق معالجة الإشارات والبرمجيات المتقدمة (DSP & AI Architecture)',
      div3Desc: 'بناء خوارزميات Synthetic Aperture Radar (SAR)، معالجة تحويلات المويجات (Wavelet Denoising)، ومحرك التوأم الرقمي ثلاثي الأبعاد للتنبؤ بصدأ الخرسانة.',
      div3Specs: 'GPU Acceleration • Hilbert Phase Analysis • Automated Defect Classification',
    },
    form: {
      title: 'طلب عرض سعر فوري أو حجز موعد فحص',
      subtitle: 'تم ملء بيانات المنشأة تلقائياً بناءً على محاكاتك ثلاثية الأبعاد أعلاه',
      prefilledNotice: 'البيانات المنقولة من المحاكي:',
      orgLabel: 'اسم المؤسسة / شركة المقاولات / المكتب الاستشاري:',
      contactLabel: 'اسم المهندس المسؤول:',
      emailLabel: 'البريد الإلكتروني للعمل:',
      phoneLabel: 'رقم الهاتف / الواتساب (مصر / دولي):',
      trackSelectLabel: 'نوع الطلب المفضل:',
      trackHardwareOption: 'شراء روبوت RIVA Radar Rover',
      trackServiceOption: 'طلب فحص ميداني معتمد (IaaS)',
      projectLocationLabel: 'موقع المنشأة / المشروع (المحافظة / المدينة):',
      notesLabel: 'ملاحظات إضافية حول المنشأة أو الكود المطلوب:',
      submitBtn: 'إرسال طلب الاعتماد وتوليد العرض الفني',
      submitting: 'جارِ تسجيل وتوليد العرض الفني المعتمد...',
      successTitle: 'تم تسجيل طلبك بنجاح وسيتواصل معك مهندس معتمد خلال ساعتين!',
      successDesc: 'تم إعداد ملخص التقييم الفني للمنشأة متضمناً أبعاد المنشأة وتقدير التكاليف الموفرة.',
      downloadDocBtn: 'تحميل ملخص الطلب والتقرير الفني (PDF / Doc Summary)',
    },
    rdModal: {
      title: 'المعمارية الهندسية ومواصفات أبحاث وتطوير RIVA',
      badge: 'R&D HARDWARE & DSP BLUEPRINT',
      subtitle: 'تفاصيل موجهة للمقيمين الأكاديميين، خبراء الاستشعار غير الإتلافي، ولجان الابتكار الصناعي',
      section1Title: '1. معمارية مرسل ومستقبل التردد المتدرج (1.0–2.6 GHz SFCW Architecture)',
      section1Text: 'يعتمد نظام ريفا على مولد تردد متدرج متصل (Stepped Frequency Continuous Wave) بدلاً من النبضات التقليدية الضعيفة. يغطي النطاق من 1.0 جيجاهرتز إلى 2.6 جيجاهرتز بعدد 512 خطوة ترددية بدقة طور متناهية، مما يمنح عمق نفاذ يصل إلى 100 سم في الخرسانة المسلحة ودقة تمييز محورية (Axial Resolution) تبلغ 1.8 سم وفق خصائص العزل الكهربائي النسبي للخرسانة (εr = 6 - 9).',
      section2Title: '2. مصفوفة هوائيات فيفالدي ونظام تحديد الموضع (Bowtie-Vivaldi & Odometry)',
      section2Text: 'تم تصنيع هوائيات فيفالدي بنظام Microstrip على ركائز روجرز (Rogers RT/duroid) عالية التردد مع كسب تماثلي يتجاوز 7 ديسيبل. يرتبط الروبوت بمشفر بصري دقيق (600 Pulses Per Revolution) متصل مباشرة بالعجلات المطاطية عالية التماسك لمزامنة بث الموجات الكهرومغناطيسية مع كل مليمتر حركة، مانعاً أي انزياح أو تشويه في توليد صور B-Scan.',
      section3Title: '3. خوارزميات المعالجة الرقمية للإشارة (DSP Pipeline & SAR Migration)',
      section3Text: 'تخضع الإشارات المنعكسة لسلسلة معالجات رقمية تبدأ بـ Bandpass Filtering وإزالة موجة السطح المباشرة (Direct Air-Coupling Removal)، تليها خوارزمية Stolt f-k Migration لإعادة تركيز الانعكاسات المتشتتة إلى نقاط بؤرية حقيقية. يحلل محرك الذكاء الاصطناعي طور هيلبرت (Hilbert Instantaneous Phase) للكشف عن التغيرات الطورية الناتجة عن رطوبة الكلوريدات وأكاسيد الحديد.',
      closeBtn: 'إغلاق نافذة المواصفات الهندسية',
    },
  },
  en: {
    brand: {
      name: 'RIVA',
      tagline: 'Advanced Robotic Non-Destructive Radar Systems',
      subtagline: '1.0–2.6 GHz UWB SFCW / FMCW Robotic NDT Systems',
      standards: 'Compliant with Egyptian Concrete Code (ECP 203) & ASTM D6432',
    },
    nav: {
      home: 'Home',
      simulator: '3D Twin Simulator',
      bscan: 'B-Scan Radiography',
      offerings: 'Services & Booking',
      specs: 'R&D Specs',
      team: 'Founding Team',
      quote: 'Request Quote / Booking',
      personaHardware: 'Buy RIVA Rover',
      personaService: 'Book Certified Inspection',
    },
    home: {
      badge: 'Egyptian Deep-Tech Innovation 🇪🇬 • Smart Robotic NDT Systems',
      headline: 'Non-Destructive Concrete & Bridge Health Assessment with Robotic Radar',
      subheadline: 'RIVA delivers deep millimeter-accurate subsurface visibility for civil engineers and asset owners without coring, drilling, or closing operational corridors.',
      missionTitle: 'What is RIVA (Radar Infrastructure Vision & Assessment)?',
      missionText: 'RIVA is an Egyptian deep-tech company engineering autonomous ultra-wideband radar rovers (1.0–2.6 GHz SFCW). By roving over concrete surfaces, the system converts electromagnetic wave reflections into actionable 3D digital twins, mapping steel rebar oxidation, cover depth, and voids with +/-1 mm precision compliant with ECP 203.',
      howItWorksTitle: 'How RIVA Works in 3 Clear Steps',
      howItWorksSubtitle: 'From autonomous field scanning to stamped civil engineering deliverables',
      steps: {
        step1Title: '1. Autonomous Field Surface Scan',
        step1Desc: 'The RIVA rover scans the concrete surface using 600-PPR optical odometry, emitting harmless stepped-frequency waves penetrating up to 100 cm.',
        step2Title: '2. DSP Signal Migration & 3D Twin',
        step2Desc: 'Stolt f-k and Hilbert phase algorithms reconstruct raw RF hyperbolic reflections into true spatial coordinates and rebar grids.',
        step3Title: '3. Certified Advisory & Remediation Report',
        step3Desc: 'Immediate generation of stamped technical reports, multi-year cost escalation forecasts, and prioritized remediation actions.',
      },
      useCasesTitle: 'Core Applications & Real-World Use Cases',
      useCasesSubtitle: 'Engineered for critical transportation and industrial concrete infrastructure',
      useCases: {
        bridgesTitle: 'Bridges, Highway Decks & Overpasses',
        bridgesDesc: 'Rapid continuous scanning of highway slabs and expansion joints without full roadway closure or invasive drilling.',
        bridgesBenefit: 'Scan up to 1,200 sq.m daily with zero traffic disruption',
        floorsTitle: 'Industrial Plants & Heavy Warehouse Floors',
        floorsDesc: 'Detecting subsurface void pockets, uncompacted honeycombing, and micro-cracks before heavy dynamic machinery loads trigger failure.',
        floorsBenefit: 'Zero plant downtime or production line halting',
        parkingTitle: 'Commercial & Multi-Story Parking Slabs',
        parkingDesc: 'Identifying moisture pathways and chloride accumulation that attack lower reinforcement mats and cause dangerous ceiling spalling.',
        parkingBenefit: 'Eliminates falling concrete hazards for vehicles and occupants',
        marineTitle: 'Piers, Ports & Marine Substructures',
        marineDesc: 'Monitoring aggressive marine chloride ingress across coastal piers, forecasting deterioration years before visible rust stains emerge.',
        marineBenefit: 'Saves millions by applying De Sitter’s Law of Fives',
      },
      foundersTitle: 'Founding Engineering Leadership',
      foundersSubtitle: 'Egyptian specialists pioneering microwave hardware, field robotics, and DSP architecture',
      ctaSimulator: 'Launch 3D Digital Twin Simulator',
      ctaServices: 'Explore Services & Pricing',
    },
    hero: {
      badge: 'Egyptian Deep-Tech Innovation 🇪🇬 • ECP 203 & ASTM D6432 Compliant',
      titlePart1: 'Precision Structural Vision for Bridges & Concrete',
      titleHighlight: 'Without Breaking a Single Centimeter',
      titlePart2: 'Millimeter-accurate radar imaging across 1.0–2.6 GHz',
      desc: 'RIVA combines ultra-wideband 1.0–2.6 GHz stepped-frequency robotic radar with proprietary digital signal processing to construct real-time 3D digital twins. Detect rebar corrosion and sub-surface cracking early with 98% confidence while saving up to 85% compared to destructive coring.',
      ctaService: 'Book Certified Inspection (IaaS)',
      ctaHardware: 'Purchase RIVA Rover Unit',
      metric1Val: '0%',
      metric1Label: 'Structural Damage (100% Non-Destructive)',
      metric2Val: '1.0–2.6 GHz',
      metric2Label: 'Stepped-Frequency UWB Radar Band',
      metric3Val: '±1 mm',
      metric3Label: 'Concrete Cover Depth Precision',
      metric4Val: '85%',
      metric4Label: 'Cost Savings vs Destructive Coring',
    },
    simulator: {
      title: '3D Structural Digital Twin & Scenario Simulator',
      subtitle: 'Enter your structure dimensions to launch an interactive 3D radar scan and evaluate multi-year cost scenarios',
      paramsTitle: 'Structural Parameters',
      structureTypeLabel: 'Structure Element Type:',
      types: {
        bridge_deck: 'Bridge Deck Slab (بلاطة كوبري)',
        industrial_floor: 'Industrial Floor (أرضية مصنع)',
        parking_slab: 'Parking / Building Slab (مبنى/جراج)',
        pier_column: 'Bridge Pier / Column (عمود/ركيزة)',
      },
      lengthLabel: 'Length (L):',
      widthLabel: 'Width (W):',
      depthLabel: 'Concrete Thickness (D):',
      ageLabel: 'Current Structure Age:',
      exposureLabel: 'Environmental Exposure Class:',
      exposures: {
        coastal: 'Coastal / High Moisture & Chlorides',
        urban: 'Urban / Heavy Traffic & Carbonation',
        industrial: 'Industrial / Chemical & Heavy Vibration',
      },
      runSimBtn: 'Run 3D Radar Pre-Test & Multi-Year Scenarios',
      generatingAi: 'Analyzing structural mechanics and calculating advisory report...',
      viewportTitle: '3D Real-Time Digital Twin Viewport',
      viewportLiveBadge: 'Live Three.js Simulation Active',
      roverStatus: 'Rover Status:',
      roverScanning: 'Scanning 1.0–2.6 GHz via 600-PPR Optical Odometry',
      toggleXray: 'X-Ray Opacity View',
      toggleRebars: 'Rebar Mesh Grid',
      toggleDefects: 'Corrosion & Crack Clusters',
      resetCam: 'Reset Camera',
      legendHealthy: 'Healthy Rebar (Adequate Cover)',
      legendRust: 'Active Rebar Oxidation (#F97316)',
      legendVoid: 'Micro-Cracks & Air Voids (#00CFFF)',
      scenariosTitle: '3-Way Financial & Technical Scenario Comparison',
      scenariosSubtitle: 'Direct implementation of De Sitter’s Law of Fives in concrete degradation',
      sc1Title: 'Scenario 1: Using RIVA (Smart Choice)',
      sc1Badge: 'Maximum ROI & Zero Structural Risk',
      sc1Duration: 'Total Scan Duration:',
      sc1Cost: 'Certified Inspection Service Cost:',
      sc1Roi: 'Hardware Rover Payback Period:',
      sc1Damage: 'Resulting Structural Damage:',
      sc1Accuracy: 'Early Rust & Crack Mapping Accuracy:',
      sc2Title: 'Scenario 2: Traditional Core Drilling',
      sc2Badge: 'Destructive Sampling & Blind Spots',
      sc2Cores: 'Drilled Core Samples Required:',
      sc2Cost: 'Coring, Lab Fees & Grout Patching:',
      sc2Downtime: 'Facility / Traffic Disruption Days:',
      sc2Damage: 'Permanent Micro-Fractures & Blind Spots:',
      sc2Blindspots: 'Probability of missing un-cored corrosion hotspots exceeds 70%',
      sc3Title: 'Scenario 3: "Do Nothing" (Leave As-Is)',
      sc3Badge: 'Exponential Cost Escalation (De Sitter)',
      sc3LawTitle: 'De Sitter’s Concrete Deterioration Law of Fives:',
      sc3LawDesc: '$1 spent on early diagnostic radar detection prevents $5 in spalling patch repair and $25 in major structural component replacement.',
      sc3Cost3Yr: 'Projected 3-Year Repair Cost:',
      sc3Cost5Yr: 'Projected 5-Year Replacement Cost:',
      sc3Expansion: 'Volumetric Rebar Rust Expansion:',
      sc3RiskLevel: 'Concrete Spalling & Failure Risk Score:',
      aiAdvisoryTitle: 'AI Executive Engineering Advisory Recommendation:',
      bookThisPlanBtn: 'Proceed With This Structure Quote & Assessment',
    },
    bscan: {
      title: 'Interactive 2D B-Scan Radar Radiography',
      subtitle: 'Drag the slider to compare external visual concrete with internal electromagnetic reflections as seen by RIVA',
      slideInstruction: 'Drag left/right to reveal subsurface radar cross-section',
      beforeLabel: 'Visible Concrete Surface (No Evident Surface Cracking)',
      afterLabel: 'RIVA 1.0–2.6 GHz Synthetic Aperture B-Scan',
      feature1Title: 'Hyperbolic Reflection Profiles',
      feature1Desc: 'Pinpoint precise rebar coordinates, pitch spacing, and concrete cover depth with ±1 mm accuracy compliant with ECP 203.',
      feature2Title: 'Amplitude & Instantaneous Phase Analysis',
      feature2Desc: 'Discerning dielectric contrast between dry concrete (εr ≈ 6), chloride ingress, and expanded iron oxide volumes (300–600%).',
      feature3Title: 'Corrosion Probability Heatmaps',
      feature3Desc: 'Directly converts raw RF reflected waveform chirps into actionable color-coded consultant engineering reports.',
    },
    offerings: {
      title: 'Dual Business Model: Own The Machine or Book The Service',
      subtitle: 'Tailored for engineering contractors, consulting bureaus, and national infrastructure authorities',
      trackATitle: 'Track A: Purchase RIVA Radar Rover',
      trackASubtitle: 'Acquire your own autonomous robotic NDT inspection unit',
      trackAPrice: 'Contact for Enterprise & Academic Pricing',
      trackAFeatures: [
        'Complete autonomous rover unit with all-terrain chassis',
        'Custom 1.0–2.6 GHz SFCW RF transceiver payload with dual Vivaldi horns',
        'High-resolution 600-PPR optical quadrature odometry encoder',
        'RIVA Studio 3D Digital Twin software desktop & cloud license',
        '2-day certified operator training, calibration kit & 2-year warranty',
      ],
      trackACta: 'Request RIVA Unit Procurement Quote',
      trackADatasheetBtn: 'Download Hardware Datasheet (PDF)',
      trackBTitle: 'Track B: Certified Inspection-as-a-Service (IaaS)',
      trackBSubtitle: 'Turnkey on-demand field scanning with certified structural reports',
      trackBPrice: 'Starting from 45 EGP / m² (Based on area & geometry)',
      trackBFeatures: [
        'Certified RIVA field engineering team dispatched to your jobsite',
        '100% complete area coverage without total roadway or facility shutdown',
        'Full 3D digital twin & stamped engineering report within 24–48 hours',
        'Accredited structural analysis compliant with ECP 203 & ASTM D6432',
        'Direct remediation roadmaps and concrete cover risk zone overlays',
      ],
      trackBCta: 'Schedule On-Site Inspection Now',
      trackBSampleReportBtn: 'Download Sample Certified Report (PDF)',
    },
    matrix: {
      title: 'Competitive & Technical Evaluation Matrix',
      subtitle: 'How RIVA outperforms costly imported equipment and destructive core drilling',
      colFeature: 'Technical Parameter',
      colRiva: 'RIVA Robotic System',
      colGpr: 'Imported Handheld GPR',
      colCores: 'Destructive Core Drilling',
      rows: {
        tech: ['Methodology', 'Autonomous 1.0–2.6 GHz SFCW + 3D Twin', 'Manual single-channel pulsed GPR', 'Destructive mechanical core sampling'],
        damage: ['Structural Damage', '0% (Completely Non-Destructive)', '0% (Manual non-destructive)', 'Permanent weakening & micro-cracking around holes'],
        speed: ['Coverage Velocity', 'Up to 1,200 m² / day autonomous', '150–250 m² / day strenuous manual cart', '4–8 core samples / day with slow lab turnaround'],
        depthAccuracy: ['Corrosion & Cover Accuracy', '±1 mm with instant 3D color heatmaps', '±10 mm with monochrome fuzzy scans', 'Point-specific only; 0 data between drilled holes'],
        costPerSqm: ['Total Project Cost', 'Highly economical local Egyptian tech', 'Prohibitive ($35,000+ unit import cost)', 'Exorbitant: drilling, laboratory testing & patching'],
        trafficImpact: ['Traffic / Operational Interruption', 'Zero to minimal single lane rolling bypass', 'Requires manual crew on roadway', 'Prolonged roadway closure & structural risk'],
        digitalTwin: ['Diagnostic Deliverables', 'Interactive 3D Digital Twin + AI Report', 'Fragmented 2D screen captures', 'Delayed paper lab results after 14-21 days'],
      },
    },
    team: {
      title: 'Founding Deep-Tech Engineering Divisions',
      subtitle: 'Interdisciplinary Egyptian engineers uniting microwave RF, autonomous robotics, and real-time DSP',
      div1Title: 'RF & Microwave Hardware Division',
      div1Desc: 'Engineered the custom 1.0–2.6 GHz stepped-frequency synthesizer, ultra-wideband baluns, and dual-polarization Vivaldi antennas with S11 < -15 dB to maximize concrete penetration depth.',
      div1Specs: 'SFCW Architecture • Ultra-Wideband Baluns • Return Loss S11 < -15dB',
      div2Title: 'Embedded Systems & Robotics Control Division',
      div2Desc: 'Architected the 4WD robotic mobility chassis, 600-PPR optical encoders, power management, and fail-safe obstacle avoidance algorithms tailored for rugged construction decks.',
      div2Specs: 'Real-time STM32/RTOS • Optical Quadrature Odometry • Auto-Grid Guidance',
      div3Title: 'DSP & Software Architecture Division',
      div3Desc: 'Developed the Synthetic Aperture Radar (SAR) migration pipeline, Hilbert instantaneous phase analysis, and real-time WebGL 3D digital twin rendering engine.',
      div3Specs: 'GPU Acceleration • Hilbert Phase Analysis • Automated Defect Classification',
    },
    form: {
      title: 'Request Pre-Filled Quote or Schedule Inspection',
      subtitle: 'Parameters from your 3D Digital Twin simulation have been pre-loaded into this form',
      prefilledNotice: 'Imported from your active simulation:',
      orgLabel: 'Organization / Contracting Firm / Consulting Bureau:',
      contactLabel: 'Principal Engineer / Contact Name:',
      emailLabel: 'Work Email Address:',
      phoneLabel: 'Phone / WhatsApp Number (Egypt or International):',
      trackSelectLabel: 'Preferred Engagement Track:',
      trackHardwareOption: 'Buy RIVA Radar Rover Unit',
      trackServiceOption: 'Book Certified Inspection Service (IaaS)',
      projectLocationLabel: 'Project Location (Governorate / City / Site):',
      notesLabel: 'Additional Engineering Notes or Code Requirements:',
      submitBtn: 'Submit & Generate Pre-Engineered Proposal',
      submitting: 'Processing engineering calculations...',
      successTitle: 'Proposal Registered! A certified RIVA engineer will contact you within 2 hours.',
      successDesc: 'Your structural data and cost estimates have been compiled into an official proposal.',
      downloadDocBtn: 'Download Summary Report (PDF / Doc Summary)',
    },
    rdModal: {
      title: 'RIVA R&D Hardware & DSP Architecture Blueprint',
      badge: 'R&D HARDWARE & DSP BLUEPRINT',
      subtitle: 'Technical specifications for academic evaluators, NDT specialists, and industrial innovation committees',
      section1Title: '1. 1.0–2.6 GHz Stepped Frequency Continuous Wave (SFCW) Architecture',
      section1Text: 'RIVA utilizes a coherent Stepped Frequency Continuous Wave synthesizer across 1.0 GHz to 2.6 GHz with 512 discrete frequency steps. Unlike short impulse radars, SFCW provides higher dynamic range (>100 dB) and superior signal-to-noise ratio in wet or chloride-rich concrete, achieving up to 100 cm penetration with 1.8 cm axial resolution.',
      section2Title: '2. Bowtie-Vivaldi Antenna Array & High-Resolution Optical Odometry',
      section2Text: 'The antenna array utilizes microstrip-fed antipodal Vivaldi structures etched on low-loss Rogers substrates with >7 dBi gain. Mechanical motion is synchronized down to the millimeter via an industrial 600-PPR optical quadrature encoder coupled directly to the rover wheel axle, ensuring zero synthetic aperture distortion during autonomous scanning.',
      section3Title: '3. DSP Pipeline & Synthetic Aperture Radar (SAR) Migration',
      section3Text: 'Reflected signals are filtered for direct antenna coupling removal, followed by Stolt f-k frequency-wavenumber migration to focus hyperbolic diffraction patterns into point scatterers. Hilbert transform extracts instantaneous phase to detect dielectric shifts caused by chloride accumulation and expanding iron oxide rust.',
      closeBtn: 'Close Technical Specifications',
    },
  },
};
