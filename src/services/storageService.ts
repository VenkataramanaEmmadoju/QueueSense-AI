export interface StoredUser {
  id: string;
  name: string;
  phone: string;
  email?: string;
  age: number;
  gender?: string;
  district: string;
  mandal: string;
  village: string;
  preferredLanguage: 'en' | 'te' | 'hi';
  abhaDemoNumber?: string;
  uhidDemoNumber?: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  relation: 'Self' | 'Father' | 'Mother' | 'Spouse' | 'Son' | 'Daughter' | 'Brother' | 'Sister' | 'Grandfather' | 'Grandmother' | 'Other';
  age: number;
  gender?: string;
  phone?: string;
  notes?: string;
  createdAt: string;
}

export interface StoredAppointment {
  id: string;
  appointmentCode: string; // e.g. "QS-2026-8912"
  tokenNumber: string; // e.g. "A-104"
  userId: string;
  beneficiaryId: string;
  beneficiaryName: string;
  beneficiaryRelation: string;
  beneficiaryAge: number;
  hospitalId: string;
  hospitalName: string;
  department: string;
  doctorName: string;
  roomNumber: string;
  appointmentDate: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "11:00 AM - 11:30 AM"
  status: 'upcoming' | 'completed' | 'cancelled';
  bookedAt: string;
  cancellationReason?: string;
  triageStatus?: string;
  estimatedWaitMins?: number;
}

export interface AuthSession {
  isAuthenticated: boolean;
  role: 'patient' | 'doctor' | 'staff' | null;
  user: any;
  token?: string;
}

const STORAGE_KEYS = {
  SESSION: 'queuesense_auth_session',
  USERS: 'queuesense_users',
  FAMILY_PREFIX: 'queuesense_family_',
  APPOINTMENTS_PREFIX: 'queuesense_appointments_',
  GRIEVANCES: 'queuesense_civiccare_grievances',
  LANG: 'queuesense_preferred_lang'
};

// Default Demo Patient
export const DEFAULT_DEMO_PATIENT: StoredUser = {
  id: 'usr-demo-patient-01',
  name: 'Venkataramana Santhu',
  phone: '+91 98490 12345',
  email: 'patient@queuesense.demo',
  age: 34,
  gender: 'Male',
  district: 'Rangareddy',
  mandal: 'Serilingampally',
  village: 'Gachibowli',
  preferredLanguage: 'en',
  abhaDemoNumber: '91-4920-8831-2940',
  uhidDemoNumber: 'TIMS-2026-8812'
};

// Initial family members for demo patient
export const INITIAL_DEMO_FAMILY: FamilyMember[] = [
  {
    id: 'fam-demo-01',
    name: 'M. Narayana Reddy',
    relation: 'Father',
    age: 68,
    gender: 'Male',
    phone: '+91 94401 56789',
    notes: 'Hypertension & Regular Cardiac Follow-up',
    createdAt: '2026-11-01T10:00:00.000Z'
  },
  {
    id: 'fam-demo-02',
    name: 'Ananya Santhu',
    relation: 'Daughter',
    age: 6,
    gender: 'Female',
    phone: '+91 98490 12345',
    notes: 'Seasonal Bronchitis / Pediatric Review',
    createdAt: '2026-11-10T14:30:00.000Z'
  },
  {
    id: 'fam-demo-03',
    name: 'Sravani Santhu',
    relation: 'Spouse',
    age: 31,
    gender: 'Female',
    phone: '+91 98490 99887',
    notes: 'Routine Health Checkup',
    createdAt: '2026-11-15T09:00:00.000Z'
  }
];

// Initial appointment records for demo patient
export const INITIAL_DEMO_APPOINTMENTS: StoredAppointment[] = [
  {
    id: 'apt-001',
    appointmentCode: 'QS-2026-8812',
    tokenNumber: 'A-104',
    userId: 'usr-demo-patient-01',
    beneficiaryId: 'usr-demo-patient-01',
    beneficiaryName: 'Venkataramana Santhu',
    beneficiaryRelation: 'Self',
    beneficiaryAge: 34,
    hospitalId: 'hosp-tims-gachibowli',
    hospitalName: 'Telangana Institute of Medical Sciences (TIMS)',
    department: 'Cardiology & Hypertension',
    doctorName: 'Dr. Arvind Rao, DM',
    roomNumber: 'OPD Room 204',
    appointmentDate: new Date().toISOString().split('T')[0],
    timeSlot: '10:30 AM - 11:00 AM',
    status: 'upcoming',
    bookedAt: new Date(Date.now() - 3600000).toISOString(),
    triageStatus: 'In Queue',
    estimatedWaitMins: 14
  },
  {
    id: 'apt-002',
    appointmentCode: 'QS-2026-7241',
    tokenNumber: 'C-209',
    userId: 'usr-demo-patient-01',
    beneficiaryId: 'fam-demo-01',
    beneficiaryName: 'M. Narayana Reddy',
    beneficiaryRelation: 'Father',
    beneficiaryAge: 68,
    hospitalId: 'hosp-tims-gachibowli',
    hospitalName: 'Telangana Institute of Medical Sciences (TIMS)',
    department: 'Cardiology & Hypertension',
    doctorName: 'Dr. Arvind Rao, DM',
    roomNumber: 'OPD Room 204',
    appointmentDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    timeSlot: '11:00 AM - 11:30 AM',
    status: 'upcoming',
    bookedAt: new Date(Date.now() - 7200000).toISOString(),
    triageStatus: 'Confirmed',
    estimatedWaitMins: 20
  },
  {
    id: 'apt-003',
    appointmentCode: 'QS-2026-5519',
    tokenNumber: 'P-112',
    userId: 'usr-demo-patient-01',
    beneficiaryId: 'fam-demo-02',
    beneficiaryName: 'Ananya Santhu',
    beneficiaryRelation: 'Daughter',
    beneficiaryAge: 6,
    hospitalId: 'hosp-tims-gachibowli',
    hospitalName: 'Telangana Institute of Medical Sciences (TIMS)',
    department: 'Pediatrics & Child Care',
    doctorName: 'Dr. M. Sunitha, MD',
    roomNumber: 'OPD Room 108',
    appointmentDate: '2026-11-12',
    timeSlot: '09:30 AM - 10:00 AM',
    status: 'completed',
    bookedAt: '2026-11-10T09:00:00.000Z',
    triageStatus: 'Completed',
    estimatedWaitMins: 0
  }
];

export const StorageService = {
  // Session
  getSession(): AuthSession {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SESSION);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Error reading session from localStorage', e);
    }
    // Default: Unauthenticated so user sees the premium login screen by default as requested in Phase 2
    return {
      isAuthenticated: false,
      role: null,
      user: null
    };
  },

  setSession(session: AuthSession): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
    } catch (e) {
      console.error('Failed to save session', e);
    }
  },

  clearSession(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.SESSION);
    } catch (e) {
      console.error('Failed to clear session', e);
    }
  },

  // Family Members
  getFamilyMembers(userId: string = DEFAULT_DEMO_PATIENT.id): FamilyMember[] {
    try {
      const key = `${STORAGE_KEYS.FAMILY_PREFIX}${userId}`;
      const data = localStorage.getItem(key);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Error reading family members', e);
    }
    // Initialize defaults if first time
    StorageService.saveFamilyMembers(userId, INITIAL_DEMO_FAMILY);
    return INITIAL_DEMO_FAMILY;
  },

  saveFamilyMembers(userId: string, members: FamilyMember[]): void {
    try {
      const key = `${STORAGE_KEYS.FAMILY_PREFIX}${userId}`;
      localStorage.setItem(key, JSON.stringify(members));
    } catch (e) {
      console.error('Error saving family members', e);
    }
  },

  addFamilyMember(userId: string, member: Omit<FamilyMember, 'id' | 'createdAt'>): FamilyMember {
    const members = StorageService.getFamilyMembers(userId);
    const newMember: FamilyMember = {
      ...member,
      id: `fam-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      createdAt: new Date().toISOString()
    };
    const updated = [newMember, ...members];
    StorageService.saveFamilyMembers(userId, updated);
    return newMember;
  },

  updateFamilyMember(userId: string, memberId: string, updates: Partial<FamilyMember>): void {
    const members = StorageService.getFamilyMembers(userId);
    const updated = members.map(m => m.id === memberId ? { ...m, ...updates } : m);
    StorageService.saveFamilyMembers(userId, updated);
  },

  removeFamilyMember(userId: string, memberId: string): void {
    const members = StorageService.getFamilyMembers(userId);
    const updated = members.filter(m => m.id !== memberId);
    StorageService.saveFamilyMembers(userId, updated);
  },

  // Appointments
  getAppointments(userId: string = DEFAULT_DEMO_PATIENT.id): StoredAppointment[] {
    try {
      const key = `${STORAGE_KEYS.APPOINTMENTS_PREFIX}${userId}`;
      const data = localStorage.getItem(key);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Error reading appointments', e);
    }
    // Initialize default appointments
    StorageService.saveAppointments(userId, INITIAL_DEMO_APPOINTMENTS);
    return INITIAL_DEMO_APPOINTMENTS;
  },

  saveAppointments(userId: string, appointments: StoredAppointment[]): void {
    try {
      const key = `${STORAGE_KEYS.APPOINTMENTS_PREFIX}${userId}`;
      localStorage.setItem(key, JSON.stringify(appointments));
    } catch (e) {
      console.error('Error saving appointments', e);
    }
  },

  addAppointment(userId: string, appointment: Omit<StoredAppointment, 'id' | 'appointmentCode' | 'bookedAt' | 'status'>): StoredAppointment {
    const appointments = StorageService.getAppointments(userId);
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newApt: StoredAppointment = {
      ...appointment,
      id: `apt-${Date.now()}`,
      appointmentCode: `QS-2026-${randomSuffix}`,
      bookedAt: new Date().toISOString(),
      status: 'upcoming'
    };
    const updated = [newApt, ...appointments];
    StorageService.saveAppointments(userId, updated);
    return newApt;
  },

  cancelAppointment(userId: string, appointmentId: string, reason: string = 'Patient Requested'): void {
    const appointments = StorageService.getAppointments(userId);
    const updated = appointments.map(apt => 
      apt.id === appointmentId ? { ...apt, status: 'cancelled' as const, cancellationReason: reason } : apt
    );
    StorageService.saveAppointments(userId, updated);
  }
};
