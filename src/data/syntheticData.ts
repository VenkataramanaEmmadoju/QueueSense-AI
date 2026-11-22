import { 
  Hospital, 
  DepartmentInfo, 
  BedCategory, 
  OPDToken, 
  EmergencyRequest, 
  CivicCareGrievance, 
  StaffUser, 
  AuditLogItem, 
  PatientProfile,
  DoctorUser,
  OperationalTask
} from '../types';

export const DEMO_DATA_NOTICE = "QueueSense AI Synthetic Simulation Data - Fictional Reference Model for Telangana Public Health System Evaluation";

export const PRIMARY_DEMO_HOSPITAL: Hospital = {
  id: 'hosp-tims-gachibowli',
  name: 'Telangana Institute of Medical Sciences (TIMS - Gachibowli Synthetic)',
  district: 'Rangareddy',
  mandal: 'Serilingampally',
  village: 'Gachibowli',
  address: 'Main Health Corridor, Gachibowli Stadium Road, Serilingampally, Rangareddy 500032',
  category: 'Government Teaching Hospital',
  distanceKm: 2.4,
  rating: 4.6,
  totalBeds: 850,
  availableBeds: 124,
  departments: ['General Medicine', 'Cardiology', 'Pediatrics', 'Orthopedics', 'OBGYN', 'Pulmonology', 'Ophthalmology', 'Emergency Trauma'],
  emergencyHelpline: '040-2300-8801 / Toll-Free 108',
  ambulanceAvailable: 6,
  liveWaitMinutes: 24,
  isAyushmanBharat: true,
  isAarogyasri: true
};

export const OTHER_DEMO_HOSPITALS: Hospital[] = [
  {
    id: 'hosp-osmania',
    name: 'Osmania General Hospital (Regional Unit)',
    district: 'Hyderabad',
    mandal: 'Charminar',
    village: 'Afzal Gunj',
    address: 'Afzal Gunj, Hyderabad 500012',
    category: 'Government Teaching Hospital',
    distanceKm: 14.8,
    rating: 4.3,
    totalBeds: 1100,
    availableBeds: 82,
    departments: ['General Medicine', 'Cardiology', 'General Surgery', 'Orthopedics', 'Emergency Trauma'],
    emergencyHelpline: '040-2460-0121',
    ambulanceAvailable: 4,
    liveWaitMinutes: 48,
    isAyushmanBharat: true,
    isAarogyasri: true
  },
  {
    id: 'hosp-krmn-dist',
    name: 'Karimnagar District Headquarter Hospital',
    district: 'Karimnagar',
    mandal: 'Karimnagar Urban',
    village: 'Collectorate Camp',
    address: 'Court Road, Karimnagar Urban, 505001',
    category: 'District Hospital',
    distanceKm: 165,
    rating: 4.4,
    totalBeds: 450,
    availableBeds: 68,
    departments: ['General Medicine', 'Pediatrics', 'OBGYN', 'Orthopedics', 'Ophthalmology'],
    emergencyHelpline: '0878-2244-108',
    ambulanceAvailable: 3,
    liveWaitMinutes: 18,
    isAyushmanBharat: true,
    isAarogyasri: true
  },
  {
    id: 'hosp-shadnagar-chc',
    name: 'Farooqnagar Community Health Centre (CHC)',
    district: 'Rangareddy',
    mandal: 'Shadnagar (Farooqnagar)',
    village: 'Farooqnagar',
    address: 'Station Road, Shadnagar, Rangareddy 509216',
    category: 'Community Health Centre (CHC)',
    distanceKm: 46.2,
    rating: 4.1,
    totalBeds: 60,
    availableBeds: 19,
    departments: ['General Medicine', 'Maternity', 'Pediatrics', 'Emergency First Response'],
    emergencyHelpline: '08548-252108',
    ambulanceAvailable: 2,
    liveWaitMinutes: 12,
    isAyushmanBharat: true,
    isAarogyasri: true
  }
];

export const ALL_DEMO_HOSPITALS = [PRIMARY_DEMO_HOSPITAL, ...OTHER_DEMO_HOSPITALS];

export const INITIAL_DEPARTMENTS: DepartmentInfo[] = [
  {
    id: 'dept-gen-med',
    name: 'General Medicine & Fevers',
    shortCode: 'GEN',
    headDoctor: 'Dr. K. Srinivas Rao, MD',
    roomNumber: 'OPD Room 101-103',
    currentQueueLength: 14,
    avgWaitMins: 22,
    activeDoctors: 3,
    status: 'moderate'
  },
  {
    id: 'dept-cardio',
    name: 'Cardiology & Hypertension',
    shortCode: 'CAR',
    headDoctor: 'Dr. Arvind Rao, DM (Cardio)',
    roomNumber: 'OPD Room 204',
    currentQueueLength: 8,
    avgWaitMins: 35,
    activeDoctors: 2,
    status: 'congested'
  },
  {
    id: 'dept-pediatrics',
    name: 'Pediatrics & Child Care',
    shortCode: 'PED',
    headDoctor: 'Dr. M. Sunitha, MD (Ped)',
    roomNumber: 'OPD Room 108',
    currentQueueLength: 6,
    avgWaitMins: 15,
    activeDoctors: 2,
    status: 'smooth'
  },
  {
    id: 'dept-ortho',
    name: 'Orthopedics & Joint Care',
    shortCode: 'ORT',
    headDoctor: 'Dr. T. Venkat Reddy, MS (Ortho)',
    roomNumber: 'OPD Room 210',
    currentQueueLength: 11,
    avgWaitMins: 28,
    activeDoctors: 2,
    status: 'moderate'
  },
  {
    id: 'dept-obgyn',
    name: 'Obstetrics & Gynecology',
    shortCode: 'OBG',
    headDoctor: 'Dr. G. Lakshmi Prasanna, MS',
    roomNumber: 'Maternal Block M-04',
    currentQueueLength: 9,
    avgWaitMins: 20,
    activeDoctors: 2,
    status: 'smooth'
  },
  {
    id: 'dept-pulmo',
    name: 'Pulmonology & Chest Clinic',
    shortCode: 'PUL',
    headDoctor: 'Dr. N. Rajeshwar, MD (Chest)',
    roomNumber: 'OPD Room 114',
    currentQueueLength: 5,
    avgWaitMins: 14,
    activeDoctors: 1,
    status: 'smooth'
  }
];

export const INITIAL_BED_CATEGORIES: BedCategory[] = [
  {
    id: 'bed-gen-male',
    name: 'General Ward (Male)',
    total: 320,
    occupied: 278,
    available: 42,
    reservedEmergency: 6,
    turnaroundAvgHours: 48,
    lastUpdated: 'Live sync 2 mins ago'
  },
  {
    id: 'bed-gen-female',
    name: 'General Ward (Female)',
    total: 280,
    occupied: 241,
    available: 39,
    reservedEmergency: 6,
    turnaroundAvgHours: 42,
    lastUpdated: 'Live sync 1 min ago'
  },
  {
    id: 'bed-oxygen',
    name: 'Oxygen Supported Wards',
    total: 120,
    occupied: 98,
    available: 22,
    reservedEmergency: 4,
    turnaroundAvgHours: 36,
    lastUpdated: 'Live sync 4 mins ago'
  },
  {
    id: 'bed-icu-crit',
    name: 'Intensive Care Unit (ICU / CCU)',
    total: 50,
    occupied: 43,
    available: 7,
    reservedEmergency: 2,
    turnaroundAvgHours: 72,
    lastUpdated: 'Live sync 30 secs ago'
  },
  {
    id: 'bed-pediatric',
    name: 'Pediatric & Neonatal (NICU/PICU)',
    total: 45,
    occupied: 36,
    available: 9,
    reservedEmergency: 2,
    turnaroundAvgHours: 40,
    lastUpdated: 'Live sync 3 mins ago'
  },
  {
    id: 'bed-maternity',
    name: 'Maternity & Labour Suite',
    total: 35,
    occupied: 30,
    available: 5,
    reservedEmergency: 2,
    turnaroundAvgHours: 28,
    lastUpdated: 'Live sync 1 min ago'
  }
];

export const INITIAL_TOKENS: OPDToken[] = [
  {
    id: 'tok-001',
    tokenNumber: 'A-104',
    patientName: 'Rahul Kumar',
    patientAge: 34,
    patientGender: 'Male',
    patientPhone: '+91 98490 12345',
    abhaId: '91-4920-8831-2940',
    uhid: 'TIMS-2026-8812',
    isCaregiverBooking: false,
    hospitalId: 'hosp-tims-gachibowli',
    hospitalName: 'Telangana Institute of Medical Sciences (TIMS)',
    department: 'Cardiology & Hypertension',
    doctorName: 'Dr. Arvind Rao, DM',
    slotTime: '10:30 AM - 11:00 AM',
    roomNumber: 'OPD Room 204',
    status: 'waiting',
    queuePosition: 3,
    peopleAhead: 2,
    estimatedConsultTime: '10:48 AM',
    bookingTimestamp: '2026-11-22T09:15:00',
    qrCodeData: 'QUEUESENSE:TOK-001:A104:TIMS:CAR',
    priority: 'normal',
    aiAdvice: 'Current pace is steady. Please complete vital check at Triage Booth 2 before 10:40 AM.',
    journeySteps: [
      { step: 'Check-in & QR Verification', station: 'Main Reception Kiosk', status: 'completed', time: '09:20 AM', note: 'ABHA Card verified' },
      { step: 'Vitals & Nursing Triage', station: 'Triage Booth 2', status: 'in_progress', time: '10:35 AM', note: 'BP & Pulse recording' },
      { step: 'Doctor Consultation', station: 'Room 204 (Dr. Arvind Rao)', status: 'upcoming', time: '10:48 AM', note: 'Estimated 13 mins wait' },
      { step: 'Diagnostic / Pharmacy Route', station: 'Counter 4 (Ground Floor)', status: 'upcoming', time: '11:15 AM', note: 'Pre-linked e-Prescription' }
    ],
    vitals: {
      bp: '124/82 mmHg',
      pulse: 74,
      spo2: 99,
      temp: 98.4
    }
  },
  {
    id: 'tok-002',
    tokenNumber: 'A-102',
    patientName: 'M. Narayana Reddy',
    patientAge: 68,
    patientGender: 'Male',
    patientPhone: '+91 94401 56789',
    abhaId: '91-3812-7740-9921',
    uhid: 'TIMS-2026-7241',
    isCaregiverBooking: true,
    bookedForName: 'Father',
    hospitalId: 'hosp-tims-gachibowli',
    hospitalName: 'Telangana Institute of Medical Sciences (TIMS)',
    department: 'Cardiology & Hypertension',
    doctorName: 'Dr. Arvind Rao, DM',
    slotTime: '10:00 AM - 10:30 AM',
    roomNumber: 'OPD Room 204',
    status: 'serving',
    queuePosition: 1,
    peopleAhead: 0,
    estimatedConsultTime: 'Now Inside',
    bookingTimestamp: '2026-11-22T08:45:00',
    qrCodeData: 'QUEUESENSE:TOK-002:A102:TIMS:CAR',
    priority: 'priority',
    aiAdvice: 'Senior Citizen expedited track. ECG pre-scan attached.',
    journeySteps: [
      { step: 'Check-in & QR Verification', station: 'Main Reception Kiosk', status: 'completed', time: '09:00 AM', note: 'Fast-track senior lane' },
      { step: 'Vitals & Nursing Triage', station: 'Triage Booth 1', status: 'completed', time: '09:25 AM', note: 'ECG conducted' },
      { step: 'Doctor Consultation', station: 'Room 204 (Dr. Arvind Rao)', status: 'in_progress', time: '10:25 AM', note: 'In Consultation' },
      { step: 'Medication Dispensation', station: 'Aarogyasri Pharmacy Counter 1', status: 'upcoming', time: '10:50 AM', note: 'Free generic medicine window' }
    ],
    vitals: {
      bp: '138/88 mmHg',
      pulse: 82,
      spo2: 97,
      temp: 98.6
    }
  },
  {
    id: 'tok-003',
    tokenNumber: 'G-211',
    patientName: 'B. Kavitha',
    patientAge: 29,
    patientGender: 'Female',
    patientPhone: '+91 99890 33441',
    abhaId: '91-1192-3490-5511',
    uhid: 'TIMS-2026-9043',
    isCaregiverBooking: false,
    hospitalId: 'hosp-tims-gachibowli',
    hospitalName: 'Telangana Institute of Medical Sciences (TIMS)',
    department: 'General Medicine & Fevers',
    doctorName: 'Dr. K. Srinivas Rao, MD',
    slotTime: '11:00 AM - 11:30 AM',
    roomNumber: 'OPD Room 101',
    status: 'waiting',
    queuePosition: 5,
    peopleAhead: 4,
    estimatedConsultTime: '11:18 AM',
    bookingTimestamp: '2026-11-22T09:30:00',
    qrCodeData: 'QUEUESENSE:TOK-003:G211:TIMS:GEN',
    priority: 'normal',
    aiAdvice: 'Seasonal viral caseload active. You may wait in Waiting Bay C with air ventilation.',
    journeySteps: [
      { step: 'Check-in & Registration', station: 'Self Kiosk B', status: 'completed', time: '09:35 AM', note: 'Token Issued' },
      { step: 'Vitals Check', station: 'Triage 3', status: 'upcoming', time: '11:00 AM', note: 'Fever clinic triage' },
      { step: 'Doctor Consultation', station: 'Room 101', status: 'upcoming', time: '11:18 AM', note: 'Dr. Srinivas Rao' },
      { step: 'Blood Work / Labs', station: 'Central Sample Collection', status: 'upcoming', time: '11:45 AM', note: 'CBC & Dengue NS1 if ordered' }
    ]
  }
];

export const INITIAL_EMERGENCY_ALERTS: EmergencyRequest[] = [
  {
    id: 'emg-901',
    patientName: 'K. Mallesh (Road Accident)',
    contactPhone: '+91 97000 11223',
    location: 'Outer Ring Road, Nanakramguda Junction',
    mandal: 'Serilingampally',
    condition: 'Multiple Trauma & Suspected Limb Fracture',
    severity: 'critical',
    status: 'ambulance_en_route',
    ambulanceId: 'TS-108-EMG-44',
    etaMinutes: 6,
    timestamp: '10:28 AM'
  },
  {
    id: 'emg-902',
    patientName: 'Anasuya Bai (Severe Dyspnea)',
    contactPhone: '+91 98488 44332',
    location: 'Hafeezpet Main Road, Near Railway Station',
    mandal: 'Serilingampally',
    condition: 'Acute Asthma / SpO2 86%',
    severity: 'severe',
    status: 'arrived_at_triage',
    ambulanceId: 'TS-108-EMG-19',
    etaMinutes: 0,
    timestamp: '10:15 AM'
  }
];

export const INITIAL_CIVICCARE_GRIEVANCES: CivicCareGrievance[] = [
  {
    id: 'cc-8492',
    trackingCode: 'CC-TS-8492',
    category: 'sanitation',
    title: 'Water dispenser leakage in OPD Bay B',
    description: 'Drinking water station near OPD Room 104 is overflowing onto the tiled corridor creating slip hazard for elderly patients.',
    hospitalName: 'Telangana Institute of Medical Sciences (TIMS)',
    wardOrDept: 'OPD Waiting Bay B (Ground Floor)',
    isAnonymous: false,
    reporterName: 'Rahul Kumar',
    reporterPhone: '+91 98490 12345',
    status: 'action_taken',
    filedAt: '2026-11-21 16:30',
    officerAssigned: 'K. Suresh (Hospital Sanitation Lead)',
    resolutionSummary: 'Maintenance team deployed at 17:10. Drain cleared, non-slip mat installed.',
    urgency: 'urgent'
  },
  {
    id: 'cc-8493',
    trackingCode: 'CC-TS-8493',
    category: 'queue_delay',
    title: 'Pharmacy window #2 closed during peak 11 AM hour',
    description: 'Only window 1 was operational leading to 40+ patients crowding outside medicine counter.',
    hospitalName: 'Telangana Institute of Medical Sciences (TIMS)',
    wardOrDept: 'Central Pharmacy Block',
    isAnonymous: true,
    status: 'under_review',
    filedAt: '2026-11-22 09:40',
    officerAssigned: 'Dr. V. Prasad (Chief Pharmacist)',
    resolutionSummary: 'Shift re-allocation in progress. Second pharmacist assigned to counter 2.',
    urgency: 'urgent'
  },
  {
    id: 'cc-8494',
    trackingCode: 'CC-TS-8494',
    category: 'infrastructure',
    title: 'Ceiling fan #3 making loud rattling noise',
    description: 'Pediatric waiting area fan rattles loudly, disturbing infant patients.',
    hospitalName: 'Telangana Institute of Medical Sciences (TIMS)',
    wardOrDept: 'Pediatric Waiting Area',
    isAnonymous: false,
    reporterName: 'P. Aruna',
    reporterPhone: '+91 99123 44556',
    status: 'submitted',
    filedAt: '2026-11-22 10:10',
    urgency: 'routine'
  }
];

export const PRIMARY_DEMO_DOCTOR: DoctorUser = {
  id: 'doc-arvind-rao',
  name: 'Dr. Arvind Rao, MD, DM',
  department: 'Cardiology',
  roomNumber: 'OPD Room 104 (Ground Floor, Wing B)',
  specialty: 'Senior Consultant Interventional Cardiologist',
  email: 'doctor@queuesense.demo',
  badgeId: 'TIMS-DOC-409',
  avatar: '👨‍⚕️',
  hospitalName: 'Telangana Institute of Medical Sciences (TIMS - Gachibowli)',
  onDuty: true,
  registrationNumber: 'TS-MCI-2014-9981',
  consultationStats: {
    scheduledToday: 18,
    completedToday: 11,
    waitingNow: 6,
    avgConsultMins: 8.5
  }
};

export const DEMO_STAFF_USERS: StaffUser[] = [
  {
    id: 'staff-admin-suresh',
    name: 'S. Ananth Kumar',
    role: 'admin',
    title: 'Hospital Operational Director & Administrator',
    department: 'Hospital Administration & CivicCare',
    badgeId: 'TIMS-ADM-001',
    avatar: '🏛️',
    email: 'staff@queuesense.demo',
    allowedTabs: ['overview', 'departments', 'analytics', 'audit', 'tokens', 'beds', 'civiccare']
  },
  {
    id: 'staff-receptionist-lavanya',
    name: 'K. Lavanya',
    role: 'receptionist',
    title: 'Chief OPD Reception & Registration Lead',
    department: 'Central Registration Block',
    badgeId: 'TIMS-REC-102',
    avatar: '👩‍💼',
    email: 'receptionist@queuesense.demo',
    allowedTabs: ['registration', 'tokens', 'departments']
  },
  {
    id: 'staff-nurse-sandhya',
    name: 'Nurse Sandhya K.',
    role: 'nurse',
    title: 'Senior OPD Triage & Patient Prep Nurse',
    department: 'Cardiology & General Medicine Triage',
    badgeId: 'TIMS-NUR-112',
    avatar: '👩‍⚕️',
    email: 'nurse@queuesense.demo',
    allowedTabs: ['tokens', 'registration', 'beds']
  },
  {
    id: 'staff-bed-rajesh',
    name: 'Rajesh Varma',
    role: 'bed_manager',
    title: 'Central Inpatient & Ward Bed Coordinator',
    department: 'Ward Admissions & Bed Bureau',
    badgeId: 'TIMS-BED-045',
    avatar: '🛏️',
    email: 'bedmanager@queuesense.demo',
    allowedTabs: ['beds', 'analytics']
  },
  {
    id: 'staff-emergency-ramesh',
    name: 'Ramesh Goud',
    role: 'emergency_staff',
    title: '108 Casualty & Trauma Coordinator',
    department: 'Emergency & Acute Trauma Unit',
    badgeId: 'TIMS-EMG-078',
    avatar: '🚨',
    email: 'emergency@queuesense.demo',
    allowedTabs: ['emergency', 'beds']
  },
  {
    id: 'staff-attendant-venkatesh',
    name: 'M. Venkatesh',
    role: 'attendant',
    title: 'Senior Patient Escort & Stretcher Attendant',
    department: 'Patient Transport & Mobility Services',
    badgeId: 'TIMS-ATT-204',
    avatar: '🦽',
    email: 'attendant@queuesense.demo',
    allowedTabs: ['attendant_tasks']
  },
  {
    id: 'staff-sanitation-mallesh',
    name: 'P. Mallesh',
    role: 'sanitation_worker',
    title: 'Hospital Hygiene & Sanitation Lead',
    department: 'Facility Sanitation & Biohazard Management',
    badgeId: 'TIMS-SAN-311',
    avatar: '🧹',
    email: 'sanitation@queuesense.demo',
    allowedTabs: ['sanitation_tasks']
  },
  {
    id: 'staff-maintenance-shiva',
    name: 'G. Shiva',
    role: 'maintenance_worker',
    title: 'Senior Clinical Engineering & Facility Technician',
    department: 'Biomedical & Infrastructure Engineering',
    badgeId: 'TIMS-MNT-405',
    avatar: '🔧',
    email: 'maintenance@queuesense.demo',
    allowedTabs: ['maintenance_tasks']
  },
  {
    id: 'staff-grievance-meenakshi',
    name: 'K. Meenakshi',
    role: 'grievance_officer',
    title: 'CivicCare & Public Grievance Redressal Officer',
    department: 'Patient Welfare & CivicCare Bureau',
    badgeId: 'TIMS-GRV-014',
    avatar: '⚖️',
    email: 'grievance@queuesense.demo',
    allowedTabs: ['civiccare', 'audit']
  }
];

export const INITIAL_OPERATIONAL_TASKS: OperationalTask[] = [
  {
    id: 'task-att-01',
    category: 'transport',
    title: 'Wheelchair Transfer: Elderly patient to Cardiology Room 104',
    location: 'Main OPD Gate 1 Entry Bay',
    priority: 'urgent',
    status: 'pending',
    assignedToName: 'M. Venkatesh',
    assignedToRole: 'attendant',
    createdAt: '10:45 AM',
    notes: 'Patient requires wheelchair assistance due to severe knee osteoarthritis.'
  },
  {
    id: 'task-att-02',
    category: 'transport',
    title: 'Stretcher Transfer: Casualty Arrival to ICU Bed #12',
    location: '108 Ambulance Triage Bay',
    priority: 'stat',
    status: 'in_progress',
    assignedToName: 'M. Venkatesh',
    assignedToRole: 'attendant',
    createdAt: '10:52 AM',
    notes: 'Acute cardiac stabilization case admitted from Rajendranagar 108 dispatch.'
  },
  {
    id: 'task-att-03',
    category: 'transport',
    title: 'Blood Sample Transit: ICU Ward 3 to Central Biochemistry Lab',
    location: 'Inpatient Block A, 2nd Floor',
    priority: 'routine',
    status: 'completed',
    assignedToName: 'M. Venkatesh',
    assignedToRole: 'attendant',
    createdAt: '09:30 AM',
    completedAt: '09:48 AM',
    notes: '6 urgent morning fasting lipid & troponin samples delivered.'
  },
  {
    id: 'task-san-01',
    category: 'sanitation',
    title: 'Liquid Spill Disinfection: OPD Bay B Corridor',
    location: 'OPD Waiting Bay B (Near Room 104)',
    priority: 'urgent',
    status: 'in_progress',
    assignedToName: 'P. Mallesh',
    assignedToRole: 'sanitation_worker',
    createdAt: '10:35 AM',
    notes: 'Drinking water leak overflow reported via CivicCare #CC-TS-8492. Anti-slip safety cones deployed.'
  },
  {
    id: 'task-san-02',
    category: 'sanitation',
    title: 'Biomedical Waste Bin Exchange: Minor Procedure Room 2',
    location: 'Ground Floor Minor OT',
    priority: 'routine',
    status: 'pending',
    assignedToName: 'P. Mallesh',
    assignedToRole: 'sanitation_worker',
    createdAt: '10:40 AM',
    notes: 'Yellow and red biohazard bin capacity at 75%.'
  },
  {
    id: 'task-san-03',
    category: 'sanitation',
    title: 'Morning Sanitization Round: Emergency Casualty Triage',
    location: '108 Casualty & Trauma Receiving',
    priority: 'routine',
    status: 'completed',
    assignedToName: 'P. Mallesh',
    assignedToRole: 'sanitation_worker',
    createdAt: '08:00 AM',
    completedAt: '08:45 AM',
    notes: 'High-touch surfaces, stretchers, and vitals monitors sanitized with disinfectant.'
  },
  {
    id: 'task-mnt-01',
    category: 'maintenance',
    title: 'Oxygen Pipeline Regulator Pressure Check',
    location: 'Emergency Resuscitation Bay 1',
    priority: 'stat',
    status: 'in_progress',
    assignedToName: 'G. Shiva',
    assignedToRole: 'maintenance_worker',
    createdAt: '10:20 AM',
    notes: 'Secondary manifold low-pressure warning calibrated. Verifying 4.2 bar baseline.'
  },
  {
    id: 'task-mnt-02',
    category: 'maintenance',
    title: 'Water Dispenser Sensor & Drain Repair',
    location: 'OPD Waiting Bay B',
    priority: 'urgent',
    status: 'pending',
    assignedToName: 'G. Shiva',
    assignedToRole: 'maintenance_worker',
    createdAt: '10:38 AM',
    notes: 'Linked to CivicCare #CC-TS-8492. Replacement solenoid valve retrieved from central store.'
  },
  {
    id: 'task-mnt-03',
    category: 'maintenance',
    title: 'Stretcher Castor Wheel Alignment & Lubrication',
    location: 'Wheelchair & Stretcher Bay, Gate 2',
    priority: 'routine',
    status: 'completed',
    assignedToName: 'G. Shiva',
    assignedToRole: 'maintenance_worker',
    createdAt: '08:30 AM',
    completedAt: '09:15 AM',
    notes: '4 transport stretchers serviced and tagged operational.'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'log-101',
    timestamp: '10:32:15 AM',
    actorName: 'Dr. Arvind Rao',
    role: 'doctor',
    action: 'Called Token A-102 into Consultation Room 204',
    details: 'Patient M. Narayana Reddy (UHID: TIMS-2026-7241)',
    severity: 'info'
  },
  {
    id: 'log-102',
    timestamp: '10:28:40 AM',
    actorName: 'Nurse Sandhya K.',
    role: 'triage_nurse',
    action: 'Dispatched 108 Emergency Beacon',
    details: 'Trauma dispatch TS-108-EMG-44 to Nanakramguda ORR',
    severity: 'alert'
  },
  {
    id: 'log-103',
    timestamp: '10:19:02 AM',
    actorName: 'Rajesh Varma',
    role: 'bed_manager',
    action: 'Discharged Inpatient & Released Bed ICU-04',
    details: 'ICU Bed 04 sanitized and returned to available inventory',
    severity: 'info'
  },
  {
    id: 'log-104',
    timestamp: '10:05:11 AM',
    actorName: 'S. Ananth Kumar',
    role: 'admin',
    action: 'CivicCare Grievance Status Updated',
    details: 'Ticket CC-TS-8492 updated to Action Taken (Sanitation)',
    severity: 'info'
  }
];

export const DEMO_DEFAULT_PATIENT: PatientProfile = {
  id: 'pat-venkat',
  name: 'Rahul Kumar',
  age: 34,
  gender: 'Male',
  phone: '+91 98490 12345',
  abhaId: '91-4920-8831-2940',
  uhid: 'TIMS-2026-8812',
  district: 'Rangareddy',
  mandal: 'Serilingampally',
  village: 'Gachibowli',
  bloodGroup: 'O+',
  emergencyContact: '+91 98490 99887 (Wife)',
  caregivers: [
    {
      id: 'cg-father',
      name: 'M. Narayana Reddy',
      relationship: 'Father',
      age: 68,
      gender: 'Male',
      phone: '+91 94401 56789',
      abhaId: '91-3812-7740-9921',
      uhid: 'TIMS-2026-7241',
      conditionNotes: 'Hypertension & Type 2 Diabetes'
    },
    {
      id: 'cg-daughter',
      name: 'Ananya Santhu',
      relationship: 'Daughter',
      age: 6,
      gender: 'Female',
      phone: '+91 98490 12345',
      abhaId: '91-5501-1029-3388',
      uhid: 'TIMS-2026-9402',
      conditionNotes: 'Allergic Rhinitis'
    }
  ]
};
