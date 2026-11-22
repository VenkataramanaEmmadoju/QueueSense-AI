import { StoredUser, AuthSession, StorageService, DEFAULT_DEMO_PATIENT } from './storageService';
import { StaffUser, DoctorUser } from '../types';
import { DEMO_STAFF_USERS, PRIMARY_DEMO_DOCTOR } from '../data/syntheticData';

export const DEMO_CREDENTIALS = {
  PATIENT: {
    email: 'patient@queuesense.demo',
    mobile: '9849012345',
    password: 'Patient@123'
  },
  DOCTOR: {
    email: 'doctor@queuesense.demo',
    badgeId: 'TIMS-DOC-409',
    password: 'Doctor@123'
  },
  STAFF: {
    email: 'staff@queuesense.demo',
    badgeId: 'TIMS-ADM-001',
    password: 'Staff@123'
  }
};

export const AuthService = {
  getInitialSession(): AuthSession {
    return StorageService.getSession();
  },

  loginPatient(identifier: string, pass: string): { success: boolean; error?: string; user?: StoredUser } {
    const cleanId = identifier.trim().toLowerCase();
    
    // Check against demo patient credentials or any simulated user
    if (
      cleanId === DEMO_CREDENTIALS.PATIENT.email.toLowerCase() ||
      cleanId === DEMO_CREDENTIALS.PATIENT.mobile ||
      cleanId.includes('patient') ||
      cleanId.includes('98490')
    ) {
      if (pass !== DEMO_CREDENTIALS.PATIENT.password && pass !== '1234') {
        return { success: false, error: 'Invalid password. Use demo password: Patient@123' };
      }
      const session: AuthSession = {
        isAuthenticated: true,
        role: 'patient',
        user: DEFAULT_DEMO_PATIENT,
        token: 'demo-patient-token-jwt-simulated'
      };
      StorageService.setSession(session);
      return { success: true, user: DEFAULT_DEMO_PATIENT };
    }

    // Allow simulated custom patient logins
    if (cleanId.length >= 3 && pass.length >= 4) {
      const customUser: StoredUser = {
        id: `usr-${Date.now()}`,
        name: identifier.includes('@') ? identifier.split('@')[0] : `Patient ${identifier.slice(-4)}`,
        phone: identifier.includes('@') ? '+91 98490 00000' : identifier,
        email: identifier.includes('@') ? identifier : undefined,
        age: 30,
        district: 'Rangareddy',
        mandal: 'Serilingampally',
        village: 'Gachibowli',
        preferredLanguage: 'en',
        abhaDemoNumber: `91-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-2940`,
        uhidDemoNumber: `TIMS-2026-${Math.floor(1000 + Math.random() * 9000)}`
      };
      const session: AuthSession = {
        isAuthenticated: true,
        role: 'patient',
        user: customUser,
        token: 'demo-patient-token-custom'
      };
      StorageService.setSession(session);
      return { success: true, user: customUser };
    }

    return { success: false, error: 'Invalid patient credentials. Use: patient@queuesense.demo / Patient@123' };
  },

  registerPatient(data: {
    fullName: string;
    mobile: string;
    email?: string;
    age: number;
    gender?: string;
    password: string;
  }): { success: boolean; user?: StoredUser; error?: string } {
    if (!data.fullName.trim()) return { success: false, error: 'Full name is required.' };
    if (!data.mobile.trim() || data.mobile.length < 10) return { success: false, error: 'Valid 10-digit mobile number is required.' };
    if (data.password.length < 6) return { success: false, error: 'Password must be at least 6 characters.' };

    const newUser: StoredUser = {
      id: `usr-${Date.now()}`,
      name: data.fullName.trim(),
      phone: data.mobile.startsWith('+91') ? data.mobile : `+91 ${data.mobile}`,
      email: data.email?.trim() || undefined,
      age: data.age || 28,
      gender: data.gender || 'Not Specified',
      district: 'Rangareddy',
      mandal: 'Serilingampally',
      village: 'Gachibowli',
      preferredLanguage: 'en',
      abhaDemoNumber: `91-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-4411`,
      uhidDemoNumber: `TIMS-2026-${Math.floor(1000 + Math.random() * 9000)}`
    };

    const session: AuthSession = {
      isAuthenticated: true,
      role: 'patient',
      user: newUser,
      token: 'demo-registered-user-token'
    };
    StorageService.setSession(session);
    return { success: true, user: newUser };
  },

  loginDoctor(identifier: string, pass: string): { success: boolean; error?: string; doctorUser?: DoctorUser } {
    const clean = identifier.trim().toLowerCase();

    if (
      clean === DEMO_CREDENTIALS.DOCTOR.email.toLowerCase() ||
      clean === DEMO_CREDENTIALS.DOCTOR.badgeId.toLowerCase() ||
      clean.includes('doctor') ||
      clean.includes('arvind') ||
      clean.includes('doc')
    ) {
      if (pass !== DEMO_CREDENTIALS.DOCTOR.password && pass !== '1234') {
        return { success: false, error: 'Invalid doctor password. Use demo password: Doctor@123' };
      }
      const doctorUser = PRIMARY_DEMO_DOCTOR;
      const session: AuthSession = {
        isAuthenticated: true,
        role: 'doctor',
        user: doctorUser,
        token: 'demo-doctor-session-jwt'
      };
      StorageService.setSession(session);
      return { success: true, doctorUser };
    }

    return { success: false, error: 'Invalid Doctor credentials. Use: doctor@queuesense.demo / Doctor@123' };
  },

  loginStaff(identifier: string, pass: string): { success: boolean; error?: string; staffUser?: StaffUser } {
    const clean = identifier.trim().toLowerCase();

    if (pass !== DEMO_CREDENTIALS.STAFF.password && pass !== '1234') {
      return { success: false, error: 'Invalid staff password. Use demo password: Staff@123' };
    }

    // Find specific staff member by email or badge
    const matchedStaff = DEMO_STAFF_USERS.find(
      u => u.email.toLowerCase() === clean || 
           u.badgeId.toLowerCase() === clean ||
           clean.includes(u.role.replace('_', '')) ||
           clean.includes(u.role)
    );

    const staffUser = matchedStaff || DEMO_STAFF_USERS[0]; // fallback to Hospital Admin

    const session: AuthSession = {
      isAuthenticated: true,
      role: 'staff',
      user: staffUser,
      token: `demo-staff-session-${staffUser.id}`
    };
    StorageService.setSession(session);
    return { success: true, staffUser };
  },

  logout(): void {
    StorageService.clearSession();
  }
};
