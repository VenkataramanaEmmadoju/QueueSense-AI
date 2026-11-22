export type AppRole = 'patient' | 'doctor' | 'staff';
export type AppMode = 'patient' | 'doctor' | 'staff';

export type Language = 'en' | 'te' | 'hi';

export type PatientTab = 
  | 'home' 
  | 'hospitals' 
  | 'appointments' 
  | 'family' 
  | 'civiccare' 
  | 'profile' 
  | 'tokens' 
  | 'beds' 
  | 'booking' 
  | 'emergency';

export type DoctorTab =
  | 'overview'
  | 'queue'
  | 'consultation'
  | 'appointments'
  | 'referrals'
  | 'schedule'
  | 'insights'
  | 'profile';

export type StaffSubrole = 
  | 'admin' 
  | 'receptionist' 
  | 'nurse' 
  | 'bed_manager' 
  | 'emergency_staff' 
  | 'attendant' 
  | 'sanitation_worker' 
  | 'maintenance_worker' 
  | 'grievance_officer';

export type StaffRole = StaffSubrole;

export type StaffTab = 
  | 'overview'
  | 'tokens' 
  | 'registration' 
  | 'beds' 
  | 'emergency' 
  | 'civiccare' 
  | 'analytics' 
  | 'departments'
  | 'attendant_tasks'
  | 'sanitation_tasks'
  | 'maintenance_tasks' 
  | 'audit';

export type FamilyRelationship = 
  | 'Self' 
  | 'Father' 
  | 'Mother' 
  | 'Spouse' 
  | 'Son' 
  | 'Daughter' 
  | 'Brother' 
  | 'Sister' 
  | 'Grandfather' 
  | 'Grandmother' 
  | 'Other';

export interface FamilyMember {
  id: string;
  name: string;
  relation: FamilyRelationship;
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
  timeSlot: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  bookedAt: string;
  cancellationReason?: string;
  triageStatus?: string;
  estimatedWaitMins?: number;
}

export interface PatientProfile {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  email?: string;
  abhaId: string;
  uhid: string;
  district: string;
  mandal: string;
  village: string;
  bloodGroup: string;
  emergencyContact: string;
  caregivers: CaregiverProfile[];
}

export interface CaregiverProfile {
  id: string;
  name: string;
  relationship: string;
  age: number;
  gender: string;
  phone: string;
  abhaId: string;
  uhid: string;
  conditionNotes?: string;
}

export interface MandalInfo {
  id: string;
  name: string;
  villages: string[];
}

export interface TelanganaDistrict {
  id: string;
  name: string;
  code: string;
  mandals: MandalInfo[];
}

export interface Hospital {
  id: string;
  name: string;
  district: string;
  mandal: string;
  village: string;
  address: string;
  category: 'Government Teaching Hospital' | 'District Hospital' | 'Area Hospital' | 'Community Health Centre (CHC)' | 'Primary Health Centre (PHC)';
  distanceKm: number;
  rating: number;
  totalBeds: number;
  availableBeds: number;
  departments: string[];
  emergencyHelpline: string;
  ambulanceAvailable: number;
  liveWaitMinutes: number;
  isAyushmanBharat: boolean;
  isAarogyasri: boolean;
  isOperationalDemo?: boolean;
}

export interface DepartmentInfo {
  id: string;
  name: string;
  shortCode: string;
  headDoctor: string;
  roomNumber: string;
  currentQueueLength: number;
  avgWaitMins: number;
  activeDoctors: number;
  status: 'smooth' | 'moderate' | 'congested';
}

export interface OPDSlot {
  id: string;
  time: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  room: string;
  available: boolean;
  estimatedWaitMinutes: number;
}

export interface JourneyStep {
  step: string;
  station: string;
  status: 'completed' | 'in_progress' | 'upcoming';
  time: string;
  note: string;
}

export interface OPDToken {
  id: string;
  tokenNumber: string; // e.g. "A-104"
  patientName: string;
  patientAge: number;
  patientGender: string;
  patientPhone: string;
  abhaId?: string;
  uhid?: string;
  isCaregiverBooking: boolean;
  bookedForName?: string;
  hospitalId: string;
  hospitalName: string;
  department: string;
  doctorName: string;
  slotTime: string;
  roomNumber: string;
  status: 'waiting' | 'in-triage' | 'serving' | 'completed' | 'hold' | 'transferred';
  queuePosition: number;
  peopleAhead: number;
  estimatedConsultTime: string;
  bookingTimestamp: string;
  qrCodeData: string;
  priority: 'normal' | 'priority' | 'emergency';
  journeySteps: JourneyStep[];
  aiAdvice: string;
  triageScore?: number; // ESI 1-5
  vitals?: {
    bp: string;
    pulse: number;
    spo2: number;
    temp: number;
  };
}

export interface BedCategory {
  id: string;
  name: string;
  total: number;
  occupied: number;
  available: number;
  reservedEmergency: number;
  turnaroundAvgHours: number;
  lastUpdated: string;
}

export interface EmergencyRequest {
  id: string;
  patientName: string;
  contactPhone: string;
  location: string;
  mandal: string;
  condition: string;
  severity: 'critical' | 'severe' | 'moderate';
  status: 'dispatch_requested' | 'ambulance_en_route' | 'arrived_at_triage' | 'admitted';
  ambulanceId?: string;
  etaMinutes: number;
  timestamp: string;
}

export interface CivicCareGrievance {
  id: string;
  trackingCode: string; // e.g. "CC-TS-8492"
  category: 'sanitation' | 'billing' | 'medicine' | 'staff_conduct' | 'infrastructure' | 'queue_delay';
  title: string;
  description: string;
  hospitalName: string;
  wardOrDept: string;
  isAnonymous: boolean;
  reporterName?: string;
  reporterPhone?: string;
  status: 'submitted' | 'under_review' | 'action_taken' | 'resolved' | 'assigned' | 'reopened';
  filedAt: string;
  officerAssigned?: string;
  resolutionSummary?: string;
  urgency: 'routine' | 'urgent' | 'critical';
}

export interface DoctorUser {
  id: string;
  name: string;
  department: string;
  roomNumber: string;
  specialty: string;
  email: string;
  badgeId: string;
  avatar: string;
  hospitalName: string;
  onDuty: boolean;
  registrationNumber: string;
  consultationStats: {
    scheduledToday: number;
    completedToday: number;
    waitingNow: number;
    avgConsultMins: number;
  };
}

export interface StaffUser {
  id: string;
  name: string;
  role: StaffSubrole;
  title: string;
  department: string;
  badgeId: string;
  avatar: string;
  email: string;
  allowedTabs: StaffTab[];
}

export interface OperationalTask {
  id: string;
  category: 'transport' | 'sanitation' | 'maintenance';
  title: string;
  location: string;
  priority: 'routine' | 'urgent' | 'stat';
  status: 'pending' | 'in_progress' | 'completed';
  assignedToName: string;
  assignedToRole: string;
  createdAt: string;
  completedAt?: string;
  notes?: string;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  actorName: string;
  role: string;
  action: string;
  details: string;
  severity: 'info' | 'warning' | 'alert';
}
