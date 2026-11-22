-- ==============================================================================
-- QueueSense AI — Migration 01: Initial Core Schema (Audited & Hardened)
-- Database schema for Predictive Patient Flow, Hospital Resource Intelligence,
-- and CivicCare Accountability.
-- ==============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Reusable timestamp trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ------------------------------------------------------------------------------
-- 1. USERS & HOSPITAL STRUCTURE
-- ------------------------------------------------------------------------------

-- User profiles (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    phone TEXT,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'patient' CHECK (role IN ('patient', 'doctor', 'staff')),
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Hospitals directory (Synthetic Public Health reference institutions)
CREATE TABLE IF NOT EXISTS hospitals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    code TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL CHECK (category IN (
        'Government Teaching Hospital', 
        'District Hospital', 
        'Area Hospital', 
        'Community Health Centre (CHC)', 
        'Primary Health Centre (PHC)'
    )),
    district TEXT NOT NULL,
    mandal TEXT NOT NULL,
    village TEXT,
    address TEXT NOT NULL,
    emergency_helpline TEXT,
    total_beds INT NOT NULL DEFAULT 0 CHECK (total_beds >= 0),
    available_beds INT NOT NULL DEFAULT 0 CHECK (available_beds >= 0),
    ambulances_count INT NOT NULL DEFAULT 0 CHECK (ambulances_count >= 0),
    live_wait_minutes INT NOT NULL DEFAULT 15 CHECK (live_wait_minutes >= 0),
    rating NUMERIC(3,2) DEFAULT 4.5,
    distance_km NUMERIC(5,2) DEFAULT 0.0,
    is_ayushman_bharat BOOLEAN NOT NULL DEFAULT true,
    is_aarogyasri BOOLEAN NOT NULL DEFAULT true,
    is_operational_demo BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER update_hospitals_updated_at
    BEFORE UPDATE ON hospitals
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Hospital departments
CREATE TABLE IF NOT EXISTS departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hospital_id UUID NOT NULL REFERENCES hospitals(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    short_code TEXT NOT NULL,
    head_doctor_name TEXT,
    room_number TEXT,
    current_queue_length INT NOT NULL DEFAULT 0 CHECK (current_queue_length >= 0),
    avg_wait_mins INT NOT NULL DEFAULT 15 CHECK (avg_wait_mins >= 0),
    active_doctors INT NOT NULL DEFAULT 1 CHECK (active_doctors >= 0),
    status TEXT NOT NULL DEFAULT 'smooth' CHECK (status IN ('smooth', 'moderate', 'congested')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(hospital_id, short_code)
);

CREATE TRIGGER update_departments_updated_at
    BEFORE UPDATE ON departments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Standardized staff roles reference table
CREATE TABLE IF NOT EXISTS staff_roles (
    role_name TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    allowed_modules TEXT[] NOT NULL DEFAULT '{}'
);

-- Hospital memberships (links profiles to hospital roles)
CREATE TABLE IF NOT EXISTS hospital_memberships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    hospital_id UUID NOT NULL REFERENCES hospitals(id) ON DELETE CASCADE,
    role TEXT NOT NULL REFERENCES staff_roles(role_name) ON UPDATE CASCADE,
    department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
    badge_id TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(user_id, hospital_id, role)
);

CREATE TRIGGER update_hospital_memberships_updated_at
    BEFORE UPDATE ON hospital_memberships
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Doctors clinical registry (user_id is nullable to allow pre-provisioning)
CREATE TABLE IF NOT EXISTS doctors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    hospital_id UUID NOT NULL REFERENCES hospitals(id) ON DELETE CASCADE,
    department_id UUID NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    specialty TEXT NOT NULL,
    registration_number TEXT NOT NULL,
    room_number TEXT NOT NULL,
    badge_id TEXT NOT NULL,
    avatar TEXT,
    on_duty BOOLEAN NOT NULL DEFAULT false,
    scheduled_today INT NOT NULL DEFAULT 0 CHECK (scheduled_today >= 0),
    completed_today INT NOT NULL DEFAULT 0 CHECK (completed_today >= 0),
    waiting_now INT NOT NULL DEFAULT 0 CHECK (waiting_now >= 0),
    avg_consult_mins INT NOT NULL DEFAULT 12 CHECK (avg_consult_mins > 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(hospital_id, registration_number)
);

CREATE TRIGGER update_doctors_updated_at
    BEFORE UPDATE ON doctors
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ------------------------------------------------------------------------------
-- 2. PATIENT MANAGEMENT & APPOINTMENTS
-- ------------------------------------------------------------------------------

-- Patient medical profiles
CREATE TABLE IF NOT EXISTS patient_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
    name TEXT NOT NULL,
    age INT NOT NULL CHECK (age >= 0 AND age <= 130),
    gender TEXT CHECK (gender IN ('Male', 'Female', 'Other')),
    phone TEXT NOT NULL,
    email TEXT,
    abha_id TEXT,
    uhid TEXT UNIQUE NOT NULL,
    district TEXT,
    mandal TEXT,
    village TEXT,
    blood_group TEXT,
    emergency_contact TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER update_patient_profiles_updated_at
    BEFORE UPDATE ON patient_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Family members and dependents managed by patient
CREATE TABLE IF NOT EXISTS family_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_profile_id UUID NOT NULL REFERENCES patient_profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    relation TEXT NOT NULL CHECK (relation IN (
        'Self', 'Father', 'Mother', 'Spouse', 'Son', 'Daughter', 
        'Brother', 'Sister', 'Grandfather', 'Grandmother', 'Other'
    )),
    age INT NOT NULL CHECK (age >= 0 AND age <= 130),
    gender TEXT CHECK (gender IN ('Male', 'Female', 'Other')),
    phone TEXT,
    abha_id TEXT,
    uhid TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER update_family_members_updated_at
    BEFORE UPDATE ON family_members
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Doctor appointment slots with capacity cap
CREATE TABLE IF NOT EXISTS appointment_slots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hospital_id UUID NOT NULL REFERENCES hospitals(id) ON DELETE CASCADE,
    department_id UUID NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
    doctor_id UUID REFERENCES doctors(id) ON DELETE CASCADE,
    slot_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    max_capacity INT NOT NULL DEFAULT 1 CHECK (max_capacity >= 1),
    booked_count INT NOT NULL DEFAULT 0 CHECK (booked_count >= 0),
    is_available BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_slot_capacity CHECK (booked_count <= max_capacity),
    UNIQUE(doctor_id, slot_date, start_time)
);

CREATE TRIGGER update_appointment_slots_updated_at
    BEFORE UPDATE ON appointment_slots
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Outpatient appointments with immutable beneficiary snapshots
CREATE TABLE IF NOT EXISTS appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    appointment_code TEXT NOT NULL UNIQUE,
    token_number TEXT,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    hospital_id UUID NOT NULL REFERENCES hospitals(id) ON DELETE CASCADE,
    department_id UUID NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
    doctor_id UUID REFERENCES doctors(id) ON DELETE SET NULL,
    slot_id UUID REFERENCES appointment_slots(id) ON DELETE SET NULL,
    beneficiary_type TEXT NOT NULL DEFAULT 'self' CHECK (beneficiary_type IN ('self', 'family_member')),
    beneficiary_id UUID REFERENCES family_members(id) ON DELETE SET NULL,
    beneficiary_name TEXT NOT NULL,
    beneficiary_relation TEXT NOT NULL DEFAULT 'Self',
    beneficiary_age INT CHECK (beneficiary_age >= 0 AND beneficiary_age <= 130),
    beneficiary_gender TEXT CHECK (beneficiary_gender IN ('Male', 'Female', 'Other')),
    beneficiary_phone TEXT,
    beneficiary_uhid TEXT,
    hospital_name TEXT NOT NULL,
    department_name TEXT NOT NULL,
    doctor_name TEXT NOT NULL,
    room_number TEXT NOT NULL,
    appointment_date DATE NOT NULL,
    time_slot TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'completed', 'cancelled')),
    triage_status TEXT,
    estimated_wait_mins INT DEFAULT 20,
    cancellation_reason TEXT,
    booked_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER update_appointments_updated_at
    BEFORE UPDATE ON appointments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ------------------------------------------------------------------------------
-- 3. OPD QUEUE & TOKENS
-- ------------------------------------------------------------------------------

-- Digital OPD Queue Tokens with daily scope and double-issuance protection
CREATE TABLE IF NOT EXISTS tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    token_number TEXT NOT NULL,
    hospital_id UUID NOT NULL REFERENCES hospitals(id) ON DELETE CASCADE,
    department_id UUID NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
    doctor_id UUID REFERENCES doctors(id) ON DELETE SET NULL,
    appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    booking_date DATE NOT NULL DEFAULT CURRENT_DATE,
    patient_name TEXT NOT NULL,
    patient_age INT NOT NULL CHECK (patient_age >= 0 AND patient_age <= 130),
    patient_gender TEXT,
    patient_phone TEXT NOT NULL,
    abha_id TEXT,
    uhid TEXT,
    is_caregiver_booking BOOLEAN NOT NULL DEFAULT false,
    booked_for_name TEXT,
    slot_time TEXT NOT NULL,
    room_number TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'waiting' CHECK (status IN (
        'waiting', 'in-triage', 'serving', 'completed', 'hold', 'transferred'
    )),
    queue_position INT NOT NULL DEFAULT 1 CHECK (queue_position >= 0),
    people_ahead INT NOT NULL DEFAULT 0 CHECK (people_ahead >= 0),
    estimated_consult_time TEXT,
    qr_code_data TEXT NOT NULL,
    priority TEXT NOT NULL DEFAULT 'normal' CHECK (priority IN ('normal', 'priority', 'emergency')),
    journey_steps JSONB NOT NULL DEFAULT '[]'::jsonb,
    ai_advice TEXT,
    triage_score INT CHECK (triage_score BETWEEN 1 AND 5),
    bp TEXT,
    pulse INT,
    spo2 INT,
    temp NUMERIC(4,1),
    booking_timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
    called_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(hospital_id, department_id, token_number, booking_date)
);

CREATE TRIGGER update_tokens_updated_at
    BEFORE UPDATE ON tokens
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Queue audit trail and milestone events
CREATE TABLE IF NOT EXISTS queue_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    token_id UUID NOT NULL REFERENCES tokens(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL CHECK (event_type IN (
        'generated', 'triage_checked', 'called', 'started_consultation', 
        'held', 'transferred', 'completed', 'cancelled'
    )),
    station TEXT NOT NULL,
    actor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    actor_name TEXT NOT NULL,
    note TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Doctor room and shift assignments
CREATE TABLE IF NOT EXISTS doctor_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    doctor_id UUID NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
    hospital_id UUID NOT NULL REFERENCES hospitals(id) ON DELETE CASCADE,
    department_id UUID NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
    room_number TEXT NOT NULL,
    shift_date DATE NOT NULL DEFAULT CURRENT_DATE,
    shift_start TIME NOT NULL,
    shift_end TIME NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER update_doctor_assignments_updated_at
    BEFORE UPDATE ON doctor_assignments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ------------------------------------------------------------------------------
-- 4. HOSPITAL RESOURCES (WARDS & BEDS)
-- ------------------------------------------------------------------------------

-- Hospital wards
CREATE TABLE IF NOT EXISTS wards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hospital_id UUID NOT NULL REFERENCES hospitals(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    floor TEXT,
    block TEXT,
    category TEXT NOT NULL CHECK (category IN (
        'General Ward', 
        'Oxygen Supported Ward', 
        'Intensive Care Unit (ICU)', 
        'Neonatal ICU (NICU)', 
        'Emergency / Casualty Bay', 
        'Post-Operative Recovery',
        'Pediatric Ward'
    )),
    total_beds INT NOT NULL DEFAULT 0 CHECK (total_beds >= 0),
    occupied_beds INT NOT NULL DEFAULT 0 CHECK (occupied_beds >= 0),
    available_beds INT NOT NULL DEFAULT 0 CHECK (available_beds >= 0),
    reserved_emergency INT NOT NULL DEFAULT 0 CHECK (reserved_emergency >= 0),
    turnaround_avg_hours NUMERIC(4,1) DEFAULT 4.5 CHECK (turnaround_avg_hours >= 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_ward_capacity CHECK (occupied_beds + available_beds <= total_beds)
);

CREATE TRIGGER update_wards_updated_at
    BEFORE UPDATE ON wards
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Individual hospital beds with strict occupancy consistency constraint
CREATE TABLE IF NOT EXISTS beds (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ward_id UUID NOT NULL REFERENCES wards(id) ON DELETE CASCADE,
    hospital_id UUID NOT NULL REFERENCES hospitals(id) ON DELETE CASCADE,
    bed_number TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'available' CHECK (status IN (
        'available', 'occupied', 'cleaning', 'maintenance', 'reserved'
    )),
    current_patient_uhid TEXT,
    current_patient_name TEXT,
    assigned_at TIMESTAMPTZ,
    turnaround_estimate_hours NUMERIC(4,1),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_bed_occupancy_integrity CHECK (
        (status IN ('available', 'cleaning', 'maintenance') AND current_patient_uhid IS NULL AND current_patient_name IS NULL)
        OR
        (status IN ('occupied', 'reserved'))
    ),
    UNIQUE(ward_id, bed_number)
);

CREATE TRIGGER update_beds_updated_at
    BEFORE UPDATE ON beds
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Bed assignment and sanitation audit events
CREATE TABLE IF NOT EXISTS bed_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    bed_id UUID NOT NULL REFERENCES beds(id) ON DELETE CASCADE,
    hospital_id UUID NOT NULL REFERENCES hospitals(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL CHECK (event_type IN (
        'admitted', 'discharged', 'transferred', 'cleaning_started', 
        'cleaning_completed', 'maintenance_flagged', 'maintenance_cleared', 
        'emergency_reserved'
    )),
    patient_uhid TEXT,
    performed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ------------------------------------------------------------------------------
-- 5. EMERGENCY SERVICES & CASUALTY DISPATCH
-- ------------------------------------------------------------------------------

-- Emergency requests (108/112 synthetic simulation beacon)
CREATE TABLE IF NOT EXISTS emergency_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hospital_id UUID REFERENCES hospitals(id) ON DELETE SET NULL,
    patient_name TEXT NOT NULL,
    contact_phone TEXT NOT NULL,
    location TEXT NOT NULL,
    mandal TEXT NOT NULL,
    condition TEXT NOT NULL,
    severity TEXT NOT NULL CHECK (severity IN ('critical', 'severe', 'moderate')),
    status TEXT NOT NULL DEFAULT 'dispatch_requested' CHECK (status IN (
        'dispatch_requested', 'ambulance_en_route', 'arrived_at_triage', 
        'admitted', 'resolved', 'cancelled'
    )),
    ambulance_id TEXT,
    eta_minutes INT NOT NULL DEFAULT 10 CHECK (eta_minutes >= 0),
    assigned_triage_bay TEXT,
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    request_timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER update_emergency_requests_updated_at
    BEFORE UPDATE ON emergency_requests
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Emergency lifecycle events
CREATE TABLE IF NOT EXISTS emergency_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_id UUID NOT NULL REFERENCES emergency_requests(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL,
    note TEXT NOT NULL,
    actor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ------------------------------------------------------------------------------
-- 6. CIVICCARE (CITIZEN GRIEVANCES & ACCOUNTABILITY)
-- ------------------------------------------------------------------------------

-- CivicCare Complaints
CREATE TABLE IF NOT EXISTS complaints (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tracking_code TEXT NOT NULL UNIQUE,
    hospital_id UUID NOT NULL REFERENCES hospitals(id) ON DELETE CASCADE,
    category TEXT NOT NULL CHECK (category IN (
        'sanitation', 'billing', 'medicine', 'staff_conduct', 'infrastructure', 'queue_delay'
    )),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    hospital_name TEXT NOT NULL,
    ward_or_dept TEXT NOT NULL,
    is_anonymous BOOLEAN NOT NULL DEFAULT false,
    reporter_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    reporter_name TEXT,
    reporter_phone TEXT,
    status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN (
        'submitted', 'under_review', 'assigned', 'action_taken', 'resolved', 'reopened'
    )),
    urgency TEXT NOT NULL DEFAULT 'routine' CHECK (urgency IN ('routine', 'urgent', 'critical')),
    officer_assigned_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    officer_assigned_name TEXT,
    resolution_summary TEXT,
    filed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    resolved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER update_complaints_updated_at
    BEFORE UPDATE ON complaints
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Complaint staff assignments
CREATE TABLE IF NOT EXISTS complaint_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    complaint_id UUID NOT NULL REFERENCES complaints(id) ON DELETE CASCADE,
    assigned_to UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    assigned_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Complaint audit timeline events
CREATE TABLE IF NOT EXISTS complaint_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    complaint_id UUID NOT NULL REFERENCES complaints(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL,
    note TEXT NOT NULL,
    performed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ------------------------------------------------------------------------------
-- 7. SYSTEM, OPERATIONAL TASKS & AUDIT LOGS
-- ------------------------------------------------------------------------------

-- Operational tasks (Attendants, Sanitation, Maintenance)
CREATE TABLE IF NOT EXISTS operational_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hospital_id UUID NOT NULL REFERENCES hospitals(id) ON DELETE CASCADE,
    category TEXT NOT NULL CHECK (category IN ('transport', 'sanitation', 'maintenance')),
    title TEXT NOT NULL,
    location TEXT NOT NULL,
    priority TEXT NOT NULL DEFAULT 'routine' CHECK (priority IN ('routine', 'urgent', 'stat')),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
    assigned_to UUID REFERENCES profiles(id) ON DELETE SET NULL,
    assigned_to_name TEXT,
    assigned_role TEXT,
    notes TEXT,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER update_operational_tasks_updated_at
    BEFORE UPDATE ON operational_tasks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- User notifications
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('appointment', 'queue', 'emergency', 'complaint', 'system')),
    read BOOLEAN NOT NULL DEFAULT false,
    action_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- System audit trail
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hospital_id UUID REFERENCES hospitals(id) ON DELETE SET NULL,
    actor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    actor_name TEXT NOT NULL,
    role TEXT NOT NULL,
    action TEXT NOT NULL,
    details TEXT NOT NULL,
    severity TEXT NOT NULL DEFAULT 'info' CHECK (severity IN ('info', 'warning', 'alert')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ------------------------------------------------------------------------------
-- 8. PERFORMANCE INDEXES
-- ------------------------------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_hospitals_district ON hospitals(district, mandal);
CREATE INDEX IF NOT EXISTS idx_departments_hospital ON departments(hospital_id);
CREATE INDEX IF NOT EXISTS idx_memberships_user ON hospital_memberships(user_id, hospital_id);
CREATE INDEX IF NOT EXISTS idx_doctors_hospital_dept ON doctors(hospital_id, department_id);
CREATE INDEX IF NOT EXISTS idx_doctors_user ON doctors(user_id);

CREATE INDEX IF NOT EXISTS idx_patient_profiles_user ON patient_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_patient_profiles_uhid ON patient_profiles(uhid);
CREATE INDEX IF NOT EXISTS idx_patient_profiles_phone ON patient_profiles(phone);
CREATE INDEX IF NOT EXISTS idx_family_members_patient ON family_members(patient_profile_id);

CREATE INDEX IF NOT EXISTS idx_slots_doctor_date ON appointment_slots(doctor_id, slot_date);
CREATE INDEX IF NOT EXISTS idx_appointments_user ON appointments(user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_hospital_date ON appointments(hospital_id, appointment_date, status);
CREATE INDEX IF NOT EXISTS idx_appointments_code ON appointments(appointment_code);

CREATE INDEX IF NOT EXISTS idx_tokens_hospital_dept ON tokens(hospital_id, department_id, status);
CREATE INDEX IF NOT EXISTS idx_tokens_user ON tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_tokens_number ON tokens(token_number);
CREATE INDEX IF NOT EXISTS idx_tokens_uhid ON tokens(uhid);
CREATE INDEX IF NOT EXISTS idx_tokens_date ON tokens(booking_date);
CREATE INDEX IF NOT EXISTS idx_queue_events_token ON queue_events(token_id);

CREATE INDEX IF NOT EXISTS idx_wards_hospital ON wards(hospital_id, category);
CREATE INDEX IF NOT EXISTS idx_beds_ward ON beds(ward_id, status);
CREATE INDEX IF NOT EXISTS idx_beds_hospital ON beds(hospital_id, status);
CREATE INDEX IF NOT EXISTS idx_bed_events_bed ON bed_events(bed_id);

CREATE INDEX IF NOT EXISTS idx_emergency_hospital_status ON emergency_requests(hospital_id, status);
CREATE INDEX IF NOT EXISTS idx_emergency_created_by ON emergency_requests(created_by);

CREATE INDEX IF NOT EXISTS idx_complaints_hospital ON complaints(hospital_id, status);
CREATE INDEX IF NOT EXISTS idx_complaints_reporter ON complaints(reporter_id);
CREATE INDEX IF NOT EXISTS idx_complaints_code ON complaints(tracking_code);

CREATE INDEX IF NOT EXISTS idx_operational_tasks_hospital ON operational_tasks(hospital_id, category, status);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id, read);
CREATE INDEX IF NOT EXISTS idx_audit_logs_hospital ON audit_logs(hospital_id, created_at);
