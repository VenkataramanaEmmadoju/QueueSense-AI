import i18n from '../i18n';

// Department dictionary for dynamic translations
const DEPARTMENTS: Record<string, { te: string; hi: string }> = {
  'Cardiology & Hypertension': {
    te: 'కార్డియాలజీ & రక్తపోటు విభాగం',
    hi: 'हृदय रोग एवं उच्च रक्तचाप (Cardiology)'
  },
  'General Medicine & Fevers': {
    te: 'జనరల్ మెడిసిన్ & జ్వరాల విభాగం',
    hi: 'सामान्य चिकित्सा एवं ज्वर (General Medicine)'
  },
  'Pediatrics & Child Care': {
    te: 'పీడియాట్రిక్స్ & శిశు సంరక్షణ',
    hi: 'बाल चिकित्सा एवं शिशु देखभाल (Pediatrics)'
  },
  'Orthopedics & Joint Care': {
    te: 'ఆర్థోపెడిక్స్ & కీళ్ల వైద్య విభాగం',
    hi: 'अस्थि रोग एवं जोड़ चिकित्सा (Orthopedics)'
  },
  'Gynecology & Obstetrics': {
    te: 'గైనకాలజీ & ప్రసూతి విభాగం',
    hi: 'स्त्री रोग एवं प्रसूति (Gynecology)'
  },
  'Pulmonology & Respiratory Care': {
    te: 'పల్మోనాలజీ & శ్వాసకోశ వైద్యం',
    hi: 'श्वसन रोग एवं फेफड़े (Pulmonology)'
  },
  'Neurology': {
    te: 'న్యూరాలజీ (నరాల విభాగం)',
    hi: 'तंत्रिका रोग (Neurology)'
  },
  'Dermatology & Skin': {
    te: 'డెర్మటాలజీ & చర్మ వ్యాధుల విభాగం',
    hi: 'त्वचा रोग विभाग (Dermatology)'
  },
  'ENT (Ear, Nose & Throat)': {
    te: 'ఇ.ఎన్.టి (చెవి, ముక్కు, గొంతు విభాగం)',
    hi: 'ई.एन.टी (कान, नाक, गला)'
  },
  'Ophthalmology (Eye Care)': {
    te: 'ఆప్తాల్మాలజీ (నేత్ర వైద్య విభాగం)',
    hi: 'नेत्र रोग विभाग (Eye Care)'
  }
};

// Bed Category dictionary
const BED_CATEGORIES: Record<string, { te: string; hi: string }> = {
  'ICU with Ventilator': {
    te: 'వెంటిలేటర్ సదుపాయం గల ఐసీయూ (ICU)',
    hi: 'वेंटिलेटर युक्त आईसीयू (ICU)'
  },
  'Emergency Resuscitation & Trauma Bay': {
    te: 'అత్యవసర పునరుజ్జీవన & ప్రమాద విభాగం',
    hi: 'आपातकालीन ट्रॉमा एवं पुनर्जीवन कक्ष'
  },
  'Oxygen Supported High-Dependency': {
    te: 'ఆక్సిజన్ సదుపాయం గల హై-డిపెండెన్సీ బెడ్లు',
    hi: 'ऑक्सीजन युक्त हाई-डिपेंडेंसी बेड (HDU)'
  },
  'Post-Operative Recovery Ward': {
    te: 'శస్త్రచికిత్స అనంతర రికవరీ వార్డు',
    hi: 'ऑपरेशन के बाद का रिकवरी वार्ड'
  },
  'Pediatric Critical Care (PICU)': {
    te: 'పీడియాట్రిక్ క్రిటికల్ కేర్ (PICU)',
    hi: 'बाल गहन चिकित्सा इकाई (PICU)'
  },
  'General Male & Female Medical Wards': {
    te: 'జనరల్ పురుషుల & మహిళల వార్డులు',
    hi: 'सामान्य पुरुष एवं महिला चिकित्सा वार्ड'
  }
};

// Grievance Category dictionary
const CIVICCARE_CATEGORIES: Record<string, { te: string; hi: string }> = {
  'sanitation': {
    te: 'పరిశుభ్రత, మరుగుదొడ్లు & పారిశుధ్యం',
    hi: 'स्वच्छता, शौचालय और सफाई'
  },
  'medicine': {
    te: 'మందుల కొరత / ఫార్మసీలో స్టాక్ లేకపోవడం',
    hi: 'दवाइयों की कमी / फार्मेसी में स्टॉक नहीं'
  },
  'queue_delay': {
    te: 'క్యూలో అధిక జాప్యం / కౌంటర్ ఖాళీగా ఉండటం',
    hi: 'कतार में अत्यधिक देरी / खाली काउंटर'
  },
  'equipment': {
    te: 'పాడైన లిఫ్ట్ / వీల్ చైర్ లభించకపోవడం',
    hi: 'टूटी लिफ्ट / व्हीलचेयर अनुपलब्ध'
  },
  'staff': {
    te: 'సిబ్బంది ప్రవర్తన & సహాయం',
    hi: 'कर्मचारी आचरण एवं सहायता'
  },
  'other': {
    te: 'ఇతర ఆసుపత్రి సౌకర్యాల సమస్య',
    hi: 'अन्य अस्पताल सुविधा समस्या'
  }
};

// Status labels
const STATUS_LABELS: Record<string, { te: string; hi: string }> = {
  'waiting': {
    te: 'క్యూలో వేచి ఉన్నారు',
    hi: 'कतार में प्रतीक्षारत'
  },
  'serving': {
    te: 'సంప్రదింపులో ఉన్నారు',
    hi: 'परामर्श में हैं'
  },
  'in_consultation': {
    te: 'సంప్రదింపులో ఉన్నారు',
    hi: 'परामर्श में हैं'
  },
  'in-triage': {
    te: 'ట్రయాజ్ పరీక్షలో',
    hi: 'ट्राइएज जांच में'
  },
  'in_triage': {
    te: 'ట్రయాజ్ పరీక్షలో',
    hi: 'ट्राइएज जांच में'
  },
  'completed': {
    te: 'పూర్తయింది',
    hi: 'पूर्ण'
  },
  'on_hold': {
    te: 'హోల్డ్‌లో ఉంది',
    hi: 'होल्ड पर'
  },
  'cancelled': {
    te: 'రద్దు చేయబడింది',
    hi: 'रद्द'
  },
  'upcoming': {
    te: 'రాబోయేవి',
    hi: 'आगामी'
  },
  'submitted': {
    te: 'సమర్పించబడింది',
    hi: 'दर्ज की गई'
  },
  'under_review': {
    te: 'పరిశీలనలో ఉంది',
    hi: 'समीक्षाधीन'
  },
  'action_taken': {
    te: 'చర్యలు తీసుకున్నారు',
    hi: 'कार्रवाई की गई'
  },
  'resolved': {
    te: 'పరిష్కరించబడింది',
    hi: 'हल की गई'
  },
  'ambulance_en_route': {
    te: 'అంబులెన్స్ వస్తోంది',
    hi: 'एम्बुलेंस रास्ते में है'
  },
  'hospital_alerted': {
    te: 'ఆసుపత్రిని అప్రమత్తం చేశారు',
    hi: 'अस्पताल को सूचित किया गया'
  },
  'casualty_admitted': {
    te: 'ఎమర్జెన్సీలో చేర్చుకున్నారు',
    hi: 'कैजुअल्टी में भर्ती'
  }
};

// Role labels
const ROLES: Record<string, { te: string; hi: string }> = {
  'admin': {
    te: 'ఆసుపత్రి అడ్మినిస్ట్రేటర్',
    hi: 'अस्पताल प्रशासक'
  },
  'receptionist': {
    te: 'డ్యూటీ రిసెప్షనిస్ట్ & ట్రయాజ్',
    hi: 'ड्यूटी रिसेप्शनिस्ट एवं ट्राइएज'
  },
  'nurse': {
    te: 'స్టాఫ్ నర్స్',
    hi: 'स्टाफ नर्स'
  },
  'bed_manager': {
    te: 'బెడ్ నిర్వహణ అధికారి',
    hi: 'बिस्तर प्रबंधन अधिकारी'
  },
  'emergency_staff': {
    te: 'అత్యవసర & కాజువాల్టీ అధికారి',
    hi: 'आपातकालीन एवं ट्रॉमा अधिकारी'
  },
  'attendant': {
    te: 'రోగి సహాయక అటెండెంట్',
    hi: 'रोगी परिवहन अटेंडेंट'
  },
  'sanitation_lead': {
    te: 'పరిశుభ్రత సూపర్వైజర్',
    hi: 'स्वच्छता पर्यवेक्षक'
  },
  'maintenance_lead': {
    te: 'మెయింటెనెన్స్ ఇంజనీర్',
    hi: 'रखरखाव इंजीनियर'
  },
  'grievance_officer': {
    te: 'ఫిర్యాదుల పరిష్కార అధికారి',
    hi: 'शिकायत निवारण अधिकारी'
  }
};

// Hospital name abbreviations & simplified names
const HOSPITALS: Record<string, { te: string; hi: string }> = {
  'Telangana Institute of Medical Sciences (TIMS)': {
    te: 'తెలంగాణ ఇన్‌స్టిట్యూట్ ఆఫ్ మెడికల్ సైన్సెస్ (TIMS గచ్చిబౌలి)',
    hi: 'तेलंगाना इंस्टीट्यूट ऑफ मेडिकल साइंसेज (TIMS गच्चीबाउली)'
  },
  'Gandhi Hospital & Medical College': {
    te: 'గాంధీ ఆసుపత్రి & మెడికల్ కాలేజ్ (సికింద్రాబాద్)',
    hi: 'गांधी अस्पताल एवं मेडिकल कॉलेज (सिकंदराबाद)'
  },
  'Osmania General Hospital': {
    te: 'ఉస్మానియా జనరల్ ఆసుపత్రి (అఫ్జల్‌గంజ్)',
    hi: 'उस्मानिया जनरल अस्पताल (अफज़लगंज)'
  },
  'Nizam\'s Institute of Medical Sciences (NIMS)': {
    te: 'నిజామ్స్ ఇన్‌స్టిట్యూట్ ఆఫ్ మెడికల్ సైన్సెస్ (NIMS పంజాగుట్ట)',
    hi: 'निज़ाम्स इंस्टीट्यूट ऑफ मेडिकल साइंसेज (NIMS पंजगुट्टा)'
  },
  'District Hospital King Koti': {
    te: 'జిల్లా ఆసుపత్రి కింగ్ కోఠి',
    hi: 'जिला अस्पताल किंग कोठी'
  },
  'District Hospital Kondapur': {
    te: 'జిల్లా ఆసుపత్రి కొండాపూర్ (రంగారెడ్డి)',
    hi: 'जिला अस्पताल कोंडापुर (रंगारेड्डी)'
  }
};

// Helper: Get current language safely
export const getCurrentLanguage = (): 'en' | 'te' | 'hi' => {
  const lang = i18n.language || (typeof window !== 'undefined' ? localStorage.getItem('queuesense_preferred_lang') : null) || 'en';
  if (lang.startsWith('te')) return 'te';
  if (lang.startsWith('hi')) return 'hi';
  return 'en';
};

// Dynamic translation functions
export const translateDepartment = (deptName: string): string => {
  if (!deptName) return deptName;
  const lang = getCurrentLanguage();
  if (lang === 'en') return deptName;
  for (const [key, trans] of Object.entries(DEPARTMENTS)) {
    if (deptName.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(deptName.toLowerCase())) {
      return trans[lang];
    }
  }
  return deptName;
};

export const translateBedCategory = (catName: string): string => {
  if (!catName) return catName;
  const lang = getCurrentLanguage();
  if (lang === 'en') return catName;
  for (const [key, trans] of Object.entries(BED_CATEGORIES)) {
    if (catName.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(catName.toLowerCase())) {
      return trans[lang];
    }
  }
  return catName;
};

export const translateGrievanceCategory = (catKey: string): string => {
  if (!catKey) return catKey;
  const lang = getCurrentLanguage();
  if (lang === 'en') return catKey;
  const normalized = catKey.toLowerCase().replace(/[^a-z_]/g, '_');
  for (const [key, trans] of Object.entries(CIVICCARE_CATEGORIES)) {
    if (normalized.includes(key)) {
      return trans[lang];
    }
  }
  return catKey;
};

export const translateStatus = (status: string): string => {
  if (!status) return status;
  const lang = getCurrentLanguage();
  if (lang === 'en') return status;
  const normalized = status.toLowerCase().replace(/\s+/g, '_').replace(/-/g, '_');
  if (STATUS_LABELS[normalized]) {
    return STATUS_LABELS[normalized][lang];
  }
  return status;
};

export const translateRole = (roleKey: string): string => {
  if (!roleKey) return roleKey;
  const lang = getCurrentLanguage();
  if (lang === 'en') return roleKey.replace(/_/g, ' ');
  const normalized = roleKey.toLowerCase();
  if (ROLES[normalized]) {
    return ROLES[normalized][lang];
  }
  return roleKey;
};

export const translateHospitalName = (name: string): string => {
  if (!name) return name;
  const lang = getCurrentLanguage();
  if (lang === 'en') return name;
  for (const [key, trans] of Object.entries(HOSPITALS)) {
    if (name.includes(key) || key.includes(name)) {
      return trans[lang];
    }
  }
  return name;
};
