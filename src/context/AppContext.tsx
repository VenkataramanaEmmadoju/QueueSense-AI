import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  AppRole, 
  AppMode,
  PatientTab,
  DoctorTab,
  StaffTab,
  StaffSubrole,
  Hospital, 
  DepartmentInfo, 
  BedCategory, 
  OPDToken, 
  EmergencyRequest, 
  CivicCareGrievance, 
  StaffUser, 
  DoctorUser,
  AuditLogItem, 
  PatientProfile, 
  CaregiverProfile,
  FamilyMember,
  StoredAppointment,
  OperationalTask
} from '../types';
import { 
  PRIMARY_DEMO_HOSPITAL, 
  ALL_DEMO_HOSPITALS, 
  INITIAL_DEPARTMENTS, 
  INITIAL_BED_CATEGORIES, 
  INITIAL_TOKENS, 
  INITIAL_EMERGENCY_ALERTS, 
  INITIAL_CIVICCARE_GRIEVANCES, 
  DEMO_STAFF_USERS, 
  PRIMARY_DEMO_DOCTOR,
  INITIAL_OPERATIONAL_TASKS,
  INITIAL_AUDIT_LOGS, 
  DEMO_DEFAULT_PATIENT 
} from '../data/syntheticData';
import { TELANGANA_ALL_33_DISTRICTS, DistrictData } from '../data/telanganaDirectory';
import { VERIFIED_GOVERNMENT_HOSPITALS, GovernmentHospital, PRIMARY_OPERATIONAL_HOSPITAL } from '../data/hospitalsDirectory';
import { 
  StorageService, 
  AuthSession, 
  StoredUser, 
  DEFAULT_DEMO_PATIENT 
} from '../services/storageService';
import { AuthService } from '../services/authService';

export type { PatientTab, DoctorTab, StaffTab, AppRole, AppMode };

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'token' | 'emergency' | 'civic' | 'system';
}

interface AppContextType {
  // Authentication & Session
  authSession: AuthSession;
  isAuthenticated: boolean;
  userRole: AppRole | null;
  currentUser: StoredUser | null;
  currentDoctorUser: DoctorUser;
  currentStaffUser: StaffUser;
  loginPatient: (id: string, pass: string) => { success: boolean; error?: string };
  registerPatient: (data: { fullName: string; mobile: string; email?: string; age: number; gender?: string; password: string }) => { success: boolean; error?: string };
  loginDoctor: (id: string, pass: string) => { success: boolean; error?: string };
  loginStaff: (id: string, pass: string) => { success: boolean; error?: string };
  logout: () => void;

  // Routing & Route Guards
  currentPath: string;
  navigate: (path: string) => void;

  // Mode & Tabs
  appMode: AppMode;
  patientTab: PatientTab;
  setPatientTab: (tab: PatientTab) => void;
  doctorTab: DoctorTab;
  setDoctorTab: (tab: DoctorTab) => void;
  staffTab: StaffTab;
  setStaffTab: (tab: StaffTab) => void;

  // Family Management
  familyMembers: FamilyMember[];
  addFamilyMember: (member: Omit<FamilyMember, 'id' | 'createdAt'>) => FamilyMember;
  updateFamilyMember: (id: string, updates: Partial<FamilyMember>) => void;
  removeFamilyMember: (id: string) => void;

  // Appointments Management
  appointments: StoredAppointment[];
  bookAppointment: (bookingData: {
    beneficiaryId: string;
    beneficiaryName: string;
    beneficiaryRelation: string;
    beneficiaryAge: number;
    hospitalId: string;
    hospitalName: string;
    department: string;
    doctorName: string;
    roomNumber: string;
    appointmentDate: string;
    timeSlot: string;
  }) => StoredAppointment;
  cancelAppointment: (id: string, reason?: string) => void;

  // Location & Hospital
  allDistricts: DistrictData[];
  selectedDistrict: string;
  setSelectedDistrict: (district: string) => void;
  selectedMandal: string;
  setSelectedMandal: (mandal: string) => void;
  selectedVillage: string;
  setSelectedVillage: (village: string) => void;
  selectedHospital: Hospital;
  setSelectedHospital: (hosp: Hospital) => void;
  hospitals: Hospital[];
  verifiedGovernmentHospitals: GovernmentHospital[];

  // Patient / Caregiver
  patientProfile: PatientProfile;
  activePatientIdentity: 'self' | CaregiverProfile;
  setActivePatientIdentity: (identity: 'self' | CaregiverProfile) => void;
  updatePatientProfile: (updated: Partial<PatientProfile>) => void;
  addCaregiverMember: (member: Omit<CaregiverProfile, 'id'>) => void;

  // OPD Tokens & Journey
  tokens: OPDToken[];
  activePatientToken: OPDToken | undefined;
  bookOPDToken: (bookingData: {
    department: string;
    doctorName: string;
    slotTime: string;
    roomNumber: string;
    isCaregiverBooking: boolean;
    bookedForName?: string;
  }) => OPDToken;
  callNextToken: (departmentName: string) => void;
  updateTokenStatus: (tokenId: string, status: OPDToken['status']) => void;
  addTriageVitals: (tokenId: string, vitals: NonNullable<OPDToken['vitals']>, triageScore: number) => void;

  // Doctor Workflows
  doctorQueueTokens: OPDToken[];
  activeConsultationToken: OPDToken | null;
  setActiveConsultationToken: (token: OPDToken | null) => void;
  callNextDoctorToken: () => OPDToken | null;
  startDoctorConsultation: (token: OPDToken) => void;
  completeDoctorConsultation: (tokenId: string, notes: string, referralDept?: string, followUpDays?: number) => void;

  // Operational Tasks (Attendant, Sanitation, Maintenance)
  operationalTasks: OperationalTask[];
  updateOperationalTaskStatus: (taskId: string, status: OperationalTask['status'], notes?: string) => void;

  // Beds Management
  bedCategories: BedCategory[];
  updateBedCount: (bedId: string, action: 'occupy' | 'release' | 'reserve') => void;

  // Emergency SOS
  emergencyAlerts: EmergencyRequest[];
  submitEmergencySOS: (data: { location: string; condition: string; mandal: string }) => EmergencyRequest;
  updateEmergencyStatus: (id: string, status: EmergencyRequest['status']) => void;

  // CivicCare Grievances
  grievances: CivicCareGrievance[];
  submitCivicGrievance: (grievance: Omit<CivicCareGrievance, 'id' | 'trackingCode' | 'filedAt' | 'status'>) => CivicCareGrievance;
  updateGrievanceStatus: (id: string, status: CivicCareGrievance['status'], notes?: string) => void;

  // Staff Administration
  staffUsers: StaffUser[];

  // Departments & Audit
  departments: DepartmentInfo[];
  auditLogs: AuditLogItem[];
  addAuditLog: (action: string, details: string, severity?: AuditLogItem['severity']) => void;

  // Notifications
  notifications: AppNotification[];
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;
  addToast: (title: string, message: string, type?: AppNotification['type']) => void;

  // PWA / Offline
  isOnline: boolean;
  canInstallPWA: boolean;
  installPWA: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Session handling
  const [authSession, setAuthSession] = useState<AuthSession>(() => StorageService.getSession());
  const [currentUser, setCurrentUser] = useState<StoredUser | null>(() => {
    const s = StorageService.getSession();
    if (s.isAuthenticated && s.role === 'patient') {
      const user = s.user as StoredUser;
      if (user && user.name === 'Venkataramana Santhu') {
        user.name = 'Rahul Kumar';
      }
      return user;
    }
    return null;
  });

  const [currentDoctorUser, setCurrentDoctorUser] = useState<DoctorUser>(() => {
    const s = StorageService.getSession();
    return s.isAuthenticated && s.role === 'doctor' ? (s.user as DoctorUser) : PRIMARY_DEMO_DOCTOR;
  });

  const [currentStaffUser, setCurrentStaffUser] = useState<StaffUser>(() => {
    const s = StorageService.getSession();
    return s.isAuthenticated && s.role === 'staff' ? (s.user as StaffUser) : DEMO_STAFF_USERS[0];
  });

  // Routing State
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const p = window.location.pathname;
      if (p.startsWith('/patient') || p.startsWith('/doctor') || p.startsWith('/staff') || p === '/login') {
        return p;
      }
    }
    return authSession.isAuthenticated 
      ? (authSession.role === 'patient' ? '/patient' : authSession.role === 'doctor' ? '/doctor' : '/staff')
      : '/login';
  });

  const navigate = (path: string) => {
    setCurrentPath(path);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync route guards whenever session or path changes
  useEffect(() => {
    if (!authSession.isAuthenticated) {
      if (currentPath !== '/login') {
        navigate('/login');
      }
    } else {
      if (authSession.role === 'patient') {
        if (!currentPath.startsWith('/patient')) {
          navigate('/patient');
        }
      } else if (authSession.role === 'doctor') {
        if (!currentPath.startsWith('/doctor')) {
          navigate('/doctor');
        }
      } else if (authSession.role === 'staff') {
        if (!currentPath.startsWith('/staff')) {
          navigate('/staff');
        }
      }
    }
  }, [authSession.isAuthenticated, authSession.role, currentPath]);

  // Active Tabs for each application
  const [patientTab, setPatientTab] = useState<PatientTab>('home');
  const [doctorTab, setDoctorTab] = useState<DoctorTab>('overview');
  const [staffTab, setStaffTab] = useState<StaffTab>(() => {
    return currentStaffUser.allowedTabs[0] || 'overview';
  });

  // Ensure staffTab is always valid for the logged-in staff role
  useEffect(() => {
    if (currentStaffUser.allowedTabs && !currentStaffUser.allowedTabs.includes(staffTab)) {
      setStaffTab(currentStaffUser.allowedTabs[0] || 'overview');
    }
  }, [currentStaffUser]);

  // Mode derived from authSession.role
  const appMode: AppMode = (authSession.role as AppMode) || 'patient';

  // Telangana Location States
  const allDistricts = TELANGANA_ALL_33_DISTRICTS;
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Rangareddy');
  const [selectedMandal, setSelectedMandal] = useState<string>('Serilingampally');
  const [selectedVillage, setSelectedVillage] = useState<string>('Gachibowli');
  
  // Hospital Directories
  const [hospitals] = useState<Hospital[]>(ALL_DEMO_HOSPITALS);
  const [verifiedGovernmentHospitals] = useState<GovernmentHospital[]>(VERIFIED_GOVERNMENT_HOSPITALS);
  const [selectedHospital, setSelectedHospital] = useState<Hospital>(PRIMARY_DEMO_HOSPITAL);

  // Patient Profile & Caregiver
  const [patientProfile, setPatientProfile] = useState<PatientProfile>(() => {
    const initial = { ...DEMO_DEFAULT_PATIENT };
    if (initial.name === 'Venkataramana Santhu') {
      initial.name = 'Rahul Kumar';
    }
    return initial;
  });
  const [activePatientIdentity, setActivePatientIdentity] = useState<'self' | CaregiverProfile>('self');

  // Family Members from Storage
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(() => 
    StorageService.getFamilyMembers(currentUser?.id || DEFAULT_DEMO_PATIENT.id)
  );

  // Appointments from Storage
  const [appointments, setAppointments] = useState<StoredAppointment[]>(() => 
    StorageService.getAppointments(currentUser?.id || DEFAULT_DEMO_PATIENT.id)
  );

  // Data collections
  const [tokens, setTokens] = useState<OPDToken[]>(INITIAL_TOKENS);
  const [bedCategories, setBedCategories] = useState<BedCategory[]>(INITIAL_BED_CATEGORIES);
  const [emergencyAlerts, setEmergencyAlerts] = useState<EmergencyRequest[]>(INITIAL_EMERGENCY_ALERTS);
  const [grievances, setGrievances] = useState<CivicCareGrievance[]>(INITIAL_CIVICCARE_GRIEVANCES);
  const [departments, setDepartments] = useState<DepartmentInfo[]>(INITIAL_DEPARTMENTS);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(INITIAL_AUDIT_LOGS);
  const [operationalTasks, setOperationalTasks] = useState<OperationalTask[]>(INITIAL_OPERATIONAL_TASKS);

  // Doctor Specific Active Consultation
  const [activeConsultationToken, setActiveConsultationToken] = useState<OPDToken | null>(null);

  // Notifications
  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: 'notif-1',
      title: 'Token A-104 Alert',
      message: 'Consultation with Dr. Arvind Rao estimated in approx 13 minutes.',
      time: '10:35 AM',
      read: false,
      type: 'token'
    },
    {
      id: 'notif-2',
      title: 'CivicCare Update #8492',
      message: 'OPD Bay B water leak reported has been resolved by maintenance team.',
      time: '10:15 AM',
      read: false,
      type: 'civic'
    }
  ]);

  // Network & PWA Install
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [canInstallPWA, setCanInstallPWA] = useState<boolean>(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstallPWA(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  // Update family & appointments when currentUser changes
  useEffect(() => {
    const uid = currentUser?.id || DEFAULT_DEMO_PATIENT.id;
    setFamilyMembers(StorageService.getFamilyMembers(uid));
    setAppointments(StorageService.getAppointments(uid));
  }, [currentUser]);

  // Toast / Notifications helper
  const addToast = (title: string, message: string, type: AppNotification['type'] = 'system') => {
    const newNotif: AppNotification = {
      id: 'notif-' + Date.now(),
      title,
      message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false,
      type
    };
    setNotifications(prev => [newNotif, ...prev.slice(0, 19)]);
  };

  const addAuditLog = (action: string, details: string, severity: AuditLogItem['severity'] = 'info') => {
    const newLog: AuditLogItem = {
      id: 'log-' + Date.now(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      actorName: authSession.role === 'doctor' 
        ? currentDoctorUser.name 
        : authSession.role === 'staff' 
        ? currentStaffUser.name 
        : (currentUser?.name || patientProfile.name),
      role: authSession.role || 'system',
      action,
      details,
      severity
    };
    setAuditLogs(prev => [newLog, ...prev.slice(0, 49)]);
  };

  // Auth Functions
  const loginPatient = (id: string, pass: string) => {
    const res = AuthService.loginPatient(id, pass);
    if (res.success && res.user) {
      const session: AuthSession = {
        isAuthenticated: true,
        role: 'patient',
        user: res.user
      };
      setAuthSession(session);
      setCurrentUser(res.user);
      setPatientTab('home');
      navigate('/patient');
      addToast('Welcome Back', `Signed in as ${res.user.name}`, 'system');
      return { success: true };
    }
    return { success: false, error: res.error || 'Authentication failed' };
  };

  const registerPatient = (data: {
    fullName: string;
    mobile: string;
    email?: string;
    age: number;
    gender?: string;
    password: string;
  }) => {
    const res = AuthService.registerPatient(data);
    if (res.success && res.user) {
      const session: AuthSession = {
        isAuthenticated: true,
        role: 'patient',
        user: res.user
      };
      setAuthSession(session);
      setCurrentUser(res.user);
      setPatientTab('home');
      navigate('/patient');
      addToast('Account Created', `Welcome to QueueSense AI, ${res.user.name}!`, 'system');
      return { success: true };
    }
    return { success: false, error: res.error || 'Registration failed' };
  };

  const loginDoctor = (id: string, pass: string) => {
    const res = AuthService.loginDoctor(id, pass);
    if (res.success && res.doctorUser) {
      const session: AuthSession = {
        isAuthenticated: true,
        role: 'doctor',
        user: res.doctorUser
      };
      setAuthSession(session);
      setCurrentDoctorUser(res.doctorUser);
      setDoctorTab('overview');
      navigate('/doctor');
      addToast('Doctor Authenticated', `Welcome ${res.doctorUser.name} (${res.doctorUser.department})`, 'system');
      addAuditLog('Doctor Logged In', `Doctor: ${res.doctorUser.name}, Room: ${res.doctorUser.roomNumber}`);
      return { success: true };
    }
    return { success: false, error: res.error || 'Doctor authentication failed' };
  };

  const loginStaff = (id: string, pass: string) => {
    const res = AuthService.loginStaff(id, pass);
    if (res.success && res.staffUser) {
      const session: AuthSession = {
        isAuthenticated: true,
        role: 'staff',
        user: res.staffUser
      };
      setAuthSession(session);
      setCurrentStaffUser(res.staffUser);
      setStaffTab(res.staffUser.allowedTabs[0] || 'overview');
      navigate('/staff');
      addToast('Staff Session Active', `Authenticated as ${res.staffUser.name} (${res.staffUser.title})`, 'system');
      addAuditLog('Staff Logged In', `Staff: ${res.staffUser.name}, Role: ${res.staffUser.role}`);
      return { success: true };
    }
    return { success: false, error: res.error || 'Staff authentication failed' };
  };

  const logout = () => {
    AuthService.logout();
    setAuthSession({
      isAuthenticated: false,
      role: null,
      user: null
    });
    setCurrentUser(null);
    setActiveConsultationToken(null);
    navigate('/login');
    addToast('Signed Out', 'You have been safely logged out of QueueSense', 'system');
  };

  // Family Management Functions
  const addFamilyMember = (member: Omit<FamilyMember, 'id' | 'createdAt'>) => {
    const uid = currentUser?.id || DEFAULT_DEMO_PATIENT.id;
    const newMember = StorageService.addFamilyMember(uid, member);
    setFamilyMembers(prev => [newMember, ...prev]);
    addToast('Family Member Added', `${member.name} registered under your account`, 'system');
    return newMember;
  };

  const updateFamilyMember = (id: string, updates: Partial<FamilyMember>) => {
    const uid = currentUser?.id || DEFAULT_DEMO_PATIENT.id;
    StorageService.updateFamilyMember(uid, id, updates);
    setFamilyMembers(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));
    addToast('Profile Updated', 'Family member information updated successfully', 'system');
  };

  const removeFamilyMember = (id: string) => {
    const uid = currentUser?.id || DEFAULT_DEMO_PATIENT.id;
    StorageService.removeFamilyMember(uid, id);
    setFamilyMembers(prev => prev.filter(m => m.id !== id));
    addToast('Profile Removed', 'Family member profile removed. Historical appointment records preserved.', 'system');
  };

  // Appointment Booking Functions
  const bookAppointment = (data: {
    beneficiaryId: string;
    beneficiaryName: string;
    beneficiaryRelation: string;
    beneficiaryAge: number;
    hospitalId: string;
    hospitalName: string;
    department: string;
    doctorName: string;
    roomNumber: string;
    appointmentDate: string;
    timeSlot: string;
  }): StoredAppointment => {
    const uid = currentUser?.id || DEFAULT_DEMO_PATIENT.id;
    const randomNum = Math.floor(100 + Math.random() * 899);
    const prefix = data.department.includes('Cardio') ? 'C' : data.department.includes('Ped') ? 'P' : 'A';
    const tokenNo = `${prefix}-${randomNum}`;

    const newApt = StorageService.addAppointment(uid, {
      ...data,
      tokenNumber: tokenNo,
      userId: uid,
      triageStatus: 'Confirmed',
      estimatedWaitMins: 18
    });

    setAppointments(prev => [newApt, ...prev]);

    // Also register an active OPD Token so Live Queue tracker picks it up
    const deptInfo = departments.find(d => d.name === data.department);
    const currentQueue = deptInfo ? deptInfo.currentQueueLength + 1 : 4;
    const estWait = currentQueue * 6;
    const consultTimeObj = new Date(Date.now() + estWait * 60000);
    const estTimeStr = consultTimeObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newToken: OPDToken = {
      id: 'tok-' + Date.now(),
      tokenNumber: tokenNo,
      patientName: data.beneficiaryName,
      patientAge: data.beneficiaryAge,
      patientGender: 'Not Specified',
      patientPhone: currentUser?.phone || patientProfile.phone,
      abhaId: currentUser?.abhaDemoNumber || patientProfile.abhaId,
      uhid: currentUser?.uhidDemoNumber || patientProfile.uhid,
      isCaregiverBooking: data.beneficiaryRelation !== 'Self',
      bookedForName: data.beneficiaryRelation !== 'Self' ? data.beneficiaryName : undefined,
      hospitalId: data.hospitalId,
      hospitalName: data.hospitalName,
      department: data.department,
      doctorName: data.doctorName,
      slotTime: data.timeSlot,
      roomNumber: data.roomNumber,
      status: 'waiting',
      queuePosition: currentQueue,
      peopleAhead: currentQueue - 1,
      estimatedConsultTime: estTimeStr,
      bookingTimestamp: new Date().toISOString(),
      qrCodeData: `QUEUESENSE:${tokenNo}:${data.hospitalId}:${data.department}`,
      priority: 'normal',
      aiAdvice: `Expected consultation pace ~6m/patient. Report to ${data.roomNumber} when token is within 2 slots.`,
      journeySteps: [
        { step: 'Registration & Check-In', station: 'Digital Kiosk / Counter 1', status: 'completed', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), note: 'Token Generated via PWA' },
        { step: 'Triage & Vital Signs', station: 'Nursing Triage Bay', status: 'upcoming', time: 'In ~5 mins', note: 'Standard vitals recording' },
        { step: 'Doctor Consultation', station: data.roomNumber, status: 'upcoming', time: estTimeStr, note: data.doctorName },
        { step: 'Pharmacy / Diagnostics Dispatch', station: 'Ground Floor Central Dispensary', status: 'upcoming', time: 'Post-consult', note: 'Free medicine dispensation' }
      ]
    };

    setTokens(prev => [newToken, ...prev]);
    addToast('OPD Token Booked', `Token #${tokenNo} issued for ${data.beneficiaryName}`, 'token');
    addAuditLog(`Issued OPD Token ${tokenNo}`, `Beneficiary: ${data.beneficiaryName}, Department: ${data.department}`);

    setDepartments(prev => prev.map(d => 
      d.name === data.department 
        ? { ...d, currentQueueLength: d.currentQueueLength + 1 }
        : d
    ));

    return newApt;
  };

  const cancelAppointment = (id: string, reason?: string) => {
    const uid = currentUser?.id || DEFAULT_DEMO_PATIENT.id;
    StorageService.cancelAppointment(uid, id, reason);
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'cancelled', cancellationReason: reason } : a));
    addToast('Appointment Cancelled', 'Appointment cancelled successfully. Slot freed for other patients.', 'system');
    addAuditLog(`Cancelled Appointment`, `ID: ${id}, Reason: ${reason || 'Not specified'}`);
  };

  // Active Patient OPD Token
  const activePatientToken = tokens.find(t => 
    (t.patientName === (currentUser?.name || patientProfile.name) || 
     familyMembers.some(f => f.name === t.patientName)) &&
    t.status !== 'completed'
  );

  const bookOPDToken = (bookingData: {
    department: string;
    doctorName: string;
    slotTime: string;
    roomNumber: string;
    isCaregiverBooking: boolean;
    bookedForName?: string;
  }): OPDToken => {
    const randomNum = Math.floor(100 + Math.random() * 899);
    const prefix = bookingData.department.includes('Cardio') ? 'C' : bookingData.department.includes('Ped') ? 'P' : 'A';
    const tokenNo = `${prefix}-${randomNum}`;
    
    const name = bookingData.isCaregiverBooking && bookingData.bookedForName 
      ? bookingData.bookedForName 
      : (currentUser?.name || patientProfile.name);

    const deptInfo = departments.find(d => d.name === bookingData.department);
    const currentQueue = deptInfo ? deptInfo.currentQueueLength + 1 : 5;
    const estWait = currentQueue * 6;
    const consultTimeObj = new Date(Date.now() + estWait * 60000);
    const estTimeStr = consultTimeObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newToken: OPDToken = {
      id: 'tok-' + Date.now(),
      tokenNumber: tokenNo,
      patientName: name,
      patientAge: 32,
      patientGender: 'Not Specified',
      patientPhone: currentUser?.phone || patientProfile.phone,
      abhaId: currentUser?.abhaDemoNumber || patientProfile.abhaId,
      uhid: currentUser?.uhidDemoNumber || patientProfile.uhid,
      isCaregiverBooking: bookingData.isCaregiverBooking,
      bookedForName: bookingData.bookedForName,
      hospitalId: selectedHospital.id,
      hospitalName: selectedHospital.name,
      department: bookingData.department,
      doctorName: bookingData.doctorName,
      slotTime: bookingData.slotTime,
      roomNumber: bookingData.roomNumber,
      status: 'waiting',
      queuePosition: currentQueue,
      peopleAhead: currentQueue - 1,
      estimatedConsultTime: estTimeStr,
      bookingTimestamp: new Date().toISOString(),
      qrCodeData: `QUEUESENSE:${tokenNo}:${selectedHospital.id}:${bookingData.department}`,
      priority: 'normal',
      aiAdvice: `Predicted queue throughput: ~6 min/patient. Report to ${bookingData.roomNumber} when token is within 2 positions.`,
      journeySteps: [
        { step: 'Registration & Check-In', station: 'Digital Kiosk / Counter 1', status: 'completed', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), note: 'Token Generated via PWA' },
        { step: 'Triage & Vital Signs', station: 'Nursing Triage Bay', status: 'upcoming', time: 'In ~5 mins', note: 'Standard vitals recording' },
        { step: 'Doctor Consultation', station: bookingData.roomNumber, status: 'upcoming', time: estTimeStr, note: bookingData.doctorName },
        { step: 'Pharmacy / Diagnostics Dispatch', station: 'Ground Floor Central Dispensary', status: 'upcoming', time: 'Post-consult', note: 'Free medicine dispensation' }
      ]
    };

    setTokens(prev => [newToken, ...prev]);
    addToast('OPD Token Booked', `Token #${tokenNo} issued for ${bookingData.department}`, 'token');
    addAuditLog(`Issued OPD Token ${tokenNo}`, `Patient: ${name}, Department: ${bookingData.department}`);

    setDepartments(prev => prev.map(d => 
      d.name === bookingData.department 
        ? { ...d, currentQueueLength: d.currentQueueLength + 1 }
        : d
    ));

    return newToken;
  };

  const callNextToken = (departmentName: string) => {
    setTokens(prev => {
      const targetIndex = prev.findIndex(t => t.department.includes(departmentName) && t.status === 'waiting');
      if (targetIndex === -1) return prev;

      const updated = [...prev];
      updated.forEach(t => {
        if (t.department.includes(departmentName) && t.status === 'serving') {
          t.status = 'completed';
        }
      });

      const target = { ...updated[targetIndex] };
      target.status = 'serving';
      target.peopleAhead = 0;
      target.journeySteps = target.journeySteps.map(step => 
        step.step.includes('Doctor') ? { ...step, status: 'in_progress', note: 'Doctor is examining patient now' } : step
      );
      updated[targetIndex] = target;

      addToast(`Token ${target.tokenNumber} Called`, `Now entering consultation room`, 'token');
      addAuditLog(`Called Next Patient: Token ${target.tokenNumber}`, `Dept: ${departmentName}`);
      return updated;
    });
  };

  const updateTokenStatus = (tokenId: string, status: OPDToken['status']) => {
    setTokens(prev => prev.map(t => {
      if (t.id === tokenId) {
        addAuditLog(`Updated Token ${t.tokenNumber} Status`, `New status: ${status}`);
        return { ...t, status };
      }
      return t;
    }));
  };

  const addTriageVitals = (tokenId: string, vitals: NonNullable<OPDToken['vitals']>, triageScore: number) => {
    setTokens(prev => prev.map(t => {
      if (t.id === tokenId) {
        return {
          ...t,
          vitals,
          triageScore,
          status: 'waiting',
          priority: triageScore <= 2 ? 'emergency' : triageScore === 3 ? 'priority' : 'normal',
          journeySteps: t.journeySteps.map(s => 
            s.step.includes('Triage') 
              ? { ...s, status: 'completed', note: `Recorded: BP ${vitals.bp}, SpO2 ${vitals.spo2}%, Pulse ${vitals.pulse}` } 
              : s
          )
        };
      }
      return t;
    }));
    addToast('Triage Vitals Saved', 'Vitals and ESI Score recorded successfully', 'token');
    addAuditLog('Recorded Triage Vitals', `Token: ${tokenId}, Score: ESI-${triageScore}`);
  };

  // DOCTOR WORKFLOWS
  const doctorQueueTokens = tokens.filter(t => 
    t.department.toLowerCase().includes('cardio') || 
    t.doctorName.toLowerCase().includes('arvind') ||
    t.roomNumber.includes('104')
  );

  const callNextDoctorToken = (): OPDToken | null => {
    const nextWaiting = doctorQueueTokens.find(t => t.status === 'waiting');
    if (!nextWaiting) {
      addToast('Queue Empty', 'No more patients currently waiting in Cardiology OPD', 'system');
      return null;
    }

    setTokens(prev => prev.map(t => {
      if (t.id === nextWaiting.id) {
        return { ...t, status: 'serving', peopleAhead: 0 };
      }
      if (t.status === 'serving' && t.department.toLowerCase().includes('cardio')) {
        return { ...t, status: 'completed' };
      }
      return t;
    }));

    setActiveConsultationToken({ ...nextWaiting, status: 'serving', peopleAhead: 0 });
    addToast(`Called Patient ${nextWaiting.tokenNumber}`, `${nextWaiting.patientName} invited into Room 104`, 'token');
    addAuditLog(`Dr. Arvind Rao Called Patient`, `Token: ${nextWaiting.tokenNumber}, Patient: ${nextWaiting.patientName}`);
    return nextWaiting;
  };

  const startDoctorConsultation = (token: OPDToken) => {
    setActiveConsultationToken(token);
    setDoctorTab('consultation');
    updateTokenStatus(token.id, 'serving');
    addToast('Consultation Started', `Now consulting with ${token.patientName}`, 'token');
  };

  const completeDoctorConsultation = (tokenId: string, notes: string, referralDept?: string, followUpDays?: number) => {
    setTokens(prev => prev.map(t => {
      if (t.id === tokenId) {
        return {
          ...t,
          status: 'completed',
          journeySteps: t.journeySteps.map(s => 
            s.step.includes('Doctor') 
              ? { ...s, status: 'completed', note: `Consultation completed. ${notes.slice(0, 40)}...` }
              : s
          )
        };
      }
      return t;
    }));

    setActiveConsultationToken(null);
    setCurrentDoctorUser(prev => ({
      ...prev,
      consultationStats: {
        ...prev.consultationStats,
        completedToday: prev.consultationStats.completedToday + 1,
        waitingNow: Math.max(0, prev.consultationStats.waitingNow - 1)
      }
    }));

    addToast('Consultation Completed', `Workflow recorded. Queue advanced.`, 'token');
    addAuditLog('Doctor Completed Consultation', `Token ID: ${tokenId}, Referral: ${referralDept || 'None'}, Follow-up: ${followUpDays || 'None'}d`);
  };

  // Operational Tasks Management (Attendant, Sanitation, Maintenance)
  const updateOperationalTaskStatus = (taskId: string, status: OperationalTask['status'], notes?: string) => {
    setOperationalTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          status,
          completedAt: status === 'completed' ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : task.completedAt,
          notes: notes || task.notes
        };
      }
      return task;
    }));

    addToast('Task Status Updated', `Task set to ${status.replace('_', ' ')}`, 'system');
    addAuditLog('Operational Task Updated', `Task: ${taskId}, Status: ${status}`);
  };

  // Beds Management
  const updateBedCount = (bedId: string, action: 'occupy' | 'release' | 'reserve') => {
    setBedCategories(prev => prev.map(cat => {
      if (cat.id === bedId) {
        let occupied = cat.occupied;
        let available = cat.available;
        let reserved = cat.reservedEmergency;

        if (action === 'occupy' && available > 0) {
          occupied += 1;
          available -= 1;
        } else if (action === 'release' && occupied > 0) {
          occupied -= 1;
          available += 1;
        } else if (action === 'reserve' && available > 0) {
          available -= 1;
          reserved += 1;
        }

        return {
          ...cat,
          occupied,
          available,
          reservedEmergency: reserved,
          lastUpdated: 'Just now'
        };
      }
      return cat;
    }));
    addToast('Ward Updated', `Bed availability adjusted (${action})`, 'system');
    addAuditLog(`Bed Inventory Changed`, `Ward: ${bedId}, Action: ${action}`);
  };

  // Emergency SOS
  const submitEmergencySOS = (data: { location: string; condition: string; mandal: string }): EmergencyRequest => {
    const newEmergency: EmergencyRequest = {
      id: 'emg-' + Date.now(),
      patientName: currentUser?.name || patientProfile.name,
      contactPhone: currentUser?.phone || patientProfile.phone,
      location: data.location,
      mandal: data.mandal,
      condition: data.condition,
      severity: 'critical',
      status: 'ambulance_en_route',
      ambulanceId: 'TS-108-EMG-09',
      etaMinutes: 8,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setEmergencyAlerts(prev => [newEmergency, ...prev]);
    addToast('🚨 108 Emergency Dispatched', `Ambulance TS-108-EMG-09 en route. ETA: 8 mins`, 'emergency');
    addAuditLog('SOS Emergency Triggered', `Patient: ${currentUser?.name || patientProfile.name}, Location: ${newEmergency.location}`, 'alert');
    return newEmergency;
  };

  const updateEmergencyStatus = (id: string, status: EmergencyRequest['status']) => {
    setEmergencyAlerts(prev => prev.map(e => e.id === id ? { ...e, status } : e));
    addAuditLog('Emergency Status Updated', `Case ${id} -> ${status}`, 'alert');
  };

  // CivicCare Grievances
  const submitCivicGrievance = (grievance: Omit<CivicCareGrievance, 'id' | 'trackingCode' | 'filedAt' | 'status'>): CivicCareGrievance => {
    const code = `CC-TS-${Math.floor(1000 + Math.random() * 9000)}`;
    const newGrievance: CivicCareGrievance = {
      ...grievance,
      id: 'cc-' + Date.now(),
      trackingCode: code,
      filedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'submitted',
      officerAssigned: 'Assigned to Shift Hospital Officer'
    };

    setGrievances(prev => [newGrievance, ...prev]);
    addToast('CivicCare Grievance Filed', `Ticket #${code} registered with Hospital Administration`, 'civic');
    addAuditLog(`New CivicCare Ticket ${code}`, `Category: ${grievance.category}, Ward: ${grievance.wardOrDept}`);
    return newGrievance;
  };

  const updateGrievanceStatus = (id: string, status: CivicCareGrievance['status'], notes?: string) => {
    setGrievances(prev => prev.map(g => {
      if (g.id === id) {
        return {
          ...g,
          status,
          resolutionSummary: notes || g.resolutionSummary
        };
      }
      return g;
    }));
    addToast('Grievance Updated', `Ticket status set to ${status}`, 'civic');
    addAuditLog(`CivicCare Ticket Status Changed`, `ID: ${id}, Status: ${status}`);
  };

  const updatePatientProfile = (updated: Partial<PatientProfile>) => {
    setPatientProfile(prev => ({ ...prev, ...updated }));
  };

  const addCaregiverMember = (member: Omit<CaregiverProfile, 'id'>) => {
    const newMember: CaregiverProfile = {
      ...member,
      id: 'cg-' + Date.now()
    };
    setPatientProfile(prev => ({
      ...prev,
      caregivers: [...prev.caregivers, newMember]
    }));
    addToast('Family Member Added', `${member.name} registered under caregiver profile`, 'system');
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const installPWA = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          addToast('PWA Installed', 'QueueSense AI added to your home screen', 'system');
        }
        setDeferredPrompt(null);
        setCanInstallPWA(false);
      });
    }
  };

  return (
    <AppContext.Provider value={{
      // Auth
      authSession,
      isAuthenticated: authSession.isAuthenticated,
      userRole: authSession.role,
      currentUser,
      currentDoctorUser,
      currentStaffUser,
      loginPatient,
      registerPatient,
      loginDoctor,
      loginStaff,
      logout,

      // Navigation & Routes
      currentPath,
      navigate,
      appMode,
      patientTab, setPatientTab,
      doctorTab, setDoctorTab,
      staffTab, setStaffTab,

      // Family & Appointments
      familyMembers,
      addFamilyMember,
      updateFamilyMember,
      removeFamilyMember,
      appointments,
      bookAppointment,
      cancelAppointment,

      // Locations & Hospitals
      allDistricts,
      selectedDistrict, setSelectedDistrict,
      selectedMandal, setSelectedMandal,
      selectedVillage, setSelectedVillage,
      selectedHospital, setSelectedHospital,
      hospitals,
      verifiedGovernmentHospitals,

      // Patient / Caregiver
      patientProfile,
      activePatientIdentity, setActivePatientIdentity,
      updatePatientProfile,
      addCaregiverMember,

      // Tokens & Journey
      tokens,
      activePatientToken,
      bookOPDToken,
      callNextToken,
      updateTokenStatus,
      addTriageVitals,

      // Doctor Specific
      doctorQueueTokens,
      activeConsultationToken,
      setActiveConsultationToken,
      callNextDoctorToken,
      startDoctorConsultation,
      completeDoctorConsultation,

      // Operational Tasks
      operationalTasks,
      updateOperationalTaskStatus,

      // Beds
      bedCategories,
      updateBedCount,

      // Emergency
      emergencyAlerts,
      submitEmergencySOS,
      updateEmergencyStatus,

      // CivicCare
      grievances,
      submitCivicGrievance,
      updateGrievanceStatus,

      // Staff Administration
      staffUsers: DEMO_STAFF_USERS,

      // Departments & Audits
      departments,
      auditLogs,
      addAuditLog,

      // Notifications
      notifications,
      markNotificationAsRead,
      clearAllNotifications,
      addToast,

      // PWA / Offline
      isOnline,
      canInstallPWA,
      installPWA
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
