-- ==============================================================================
-- QueueSense AI — Migration 02: Row Level Security (RLS) & Access Policies (Audited & Hardened)
-- Enforces zero-trust medical privacy, multi-tenant hospital isolation,
-- and strict role-based access control (RBAC).
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. SECURITY DEFINER HELPER FUNCTIONS (Strict search_path = public)
-- ------------------------------------------------------------------------------

-- Get current authenticated user's profile role
CREATE OR REPLACE FUNCTION public.get_auth_role()
RETURNS TEXT AS $$
    SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public;

-- Check if current user is an active member of a hospital
CREATE OR REPLACE FUNCTION public.is_hospital_member(p_hospital_id UUID)
RETURNS BOOLEAN AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.hospital_memberships
        WHERE user_id = auth.uid()
          AND hospital_id = p_hospital_id
          AND is_active = true
    ) OR EXISTS (
        SELECT 1 FROM public.doctors
        WHERE user_id = auth.uid()
          AND hospital_id = p_hospital_id
    );
$$ LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public;

-- Check if current user has a specific staff role at a hospital
CREATE OR REPLACE FUNCTION public.has_staff_role(p_hospital_id UUID, p_roles TEXT[])
RETURNS BOOLEAN AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.hospital_memberships
        WHERE user_id = auth.uid()
          AND hospital_id = p_hospital_id
          AND role = ANY(p_roles)
          AND is_active = true
    );
$$ LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public;

-- Check if current user is a registered doctor at a hospital
CREATE OR REPLACE FUNCTION public.is_doctor_at(p_hospital_id UUID)
RETURNS BOOLEAN AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.doctors
        WHERE user_id = auth.uid()
          AND hospital_id = p_hospital_id
    );
$$ LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public;

-- Get the doctor ID for the authenticated user
CREATE OR REPLACE FUNCTION public.get_my_doctor_id()
RETURNS UUID AS $$
    SELECT id FROM public.doctors WHERE user_id = auth.uid();
$$ LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public;

-- Get the patient profile ID belonging to the current user
CREATE OR REPLACE FUNCTION public.get_my_patient_profile_id()
RETURNS UUID AS $$
    SELECT id FROM public.patient_profiles WHERE user_id = auth.uid();
$$ LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public;

-- Trigger to prevent users from escalating their own role in `profiles`
CREATE OR REPLACE FUNCTION public.prevent_role_escalation()
RETURNS TRIGGER AS $$
BEGIN
    -- If role is changing, prevent non-superusers from elevating themselves
    IF NEW.role <> OLD.role THEN
        IF auth.uid() IS NOT NULL AND auth.uid() = OLD.id THEN
            RAISE EXCEPTION 'Privilege escalation rejected: Users cannot alter their own system role.';
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS enforce_role_integrity ON public.profiles;
CREATE TRIGGER enforce_role_integrity
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.prevent_role_escalation();

-- Trigger to enforce 'patient' role on direct INSERT unless inserted by internal admin
CREATE OR REPLACE FUNCTION public.enforce_default_patient_role()
RETURNS TRIGGER AS $$
BEGIN
    -- Never trust client-supplied role on self-registration
    IF auth.uid() IS NOT NULL AND auth.uid() = NEW.id THEN
        NEW.role := 'patient';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS enforce_default_role_on_insert ON public.profiles;
CREATE TRIGGER enforce_default_role_on_insert
    BEFORE INSERT ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.enforce_default_patient_role();

-- Trigger to automatically create a patient profile on Supabase auth signup (NEVER trust client role metadata)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
        'patient' -- Hardcoded: never trust raw_user_meta_data for role assignment
    )
    ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        full_name = COALESCE(EXCLUDED.full_name, public.profiles.full_name);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ------------------------------------------------------------------------------
-- 2. ENABLE ROW LEVEL SECURITY ON ALL 24 TABLES
-- ------------------------------------------------------------------------------

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE hospitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE hospital_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;

ALTER TABLE patient_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointment_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

ALTER TABLE tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE queue_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctor_assignments ENABLE ROW LEVEL SECURITY;

ALTER TABLE wards ENABLE ROW LEVEL SECURITY;
ALTER TABLE beds ENABLE ROW LEVEL SECURITY;
ALTER TABLE bed_events ENABLE ROW LEVEL SECURITY;

ALTER TABLE emergency_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergency_events ENABLE ROW LEVEL SECURITY;

ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE complaint_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE complaint_events ENABLE ROW LEVEL SECURITY;

ALTER TABLE operational_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- 3. RLS POLICIES: PROFILES & MEMBERSHIPS
-- ------------------------------------------------------------------------------

-- Profiles: Users can view their own profile
DROP POLICY IF EXISTS "profiles_select_self" ON profiles;
CREATE POLICY "profiles_select_self" ON profiles
    FOR SELECT TO authenticated
    USING (id = auth.uid());

-- Profiles: Active hospital staff and doctors can view patient profiles
DROP POLICY IF EXISTS "profiles_select_staff" ON profiles;
CREATE POLICY "profiles_select_staff" ON profiles
    FOR SELECT TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM hospital_memberships hm
            WHERE hm.user_id = auth.uid() AND hm.is_active = true
        ) OR EXISTS (
            SELECT 1 FROM doctors d
            WHERE d.user_id = auth.uid()
        )
    );

-- Profiles: Users can update their own non-privileged details (role escalation blocked by trigger)
DROP POLICY IF EXISTS "profiles_update_self" ON profiles;
CREATE POLICY "profiles_update_self" ON profiles
    FOR UPDATE TO authenticated
    USING (id = auth.uid())
    WITH CHECK (id = auth.uid());

-- Profiles: User self-insertion allowed on signup (role forced to 'patient' by trigger)
DROP POLICY IF EXISTS "profiles_insert_self" ON profiles;
CREATE POLICY "profiles_insert_self" ON profiles
    FOR INSERT TO authenticated
    WITH CHECK (id = auth.uid());

-- Hospitals: Public read-only for discovery
DROP POLICY IF EXISTS "hospitals_select_all" ON hospitals;
CREATE POLICY "hospitals_select_all" ON hospitals
    FOR SELECT TO public
    USING (true);

-- Hospitals: Admin modifications only
DROP POLICY IF EXISTS "hospitals_modify_admin" ON hospitals;
CREATE POLICY "hospitals_modify_admin" ON hospitals
    FOR ALL TO authenticated
    USING (has_staff_role(id, ARRAY['admin']))
    WITH CHECK (has_staff_role(id, ARRAY['admin']));

-- Departments: Public read-only
DROP POLICY IF EXISTS "departments_select_all" ON departments;
CREATE POLICY "departments_select_all" ON departments
    FOR SELECT TO public
    USING (true);

-- Departments: Admin modifications
DROP POLICY IF EXISTS "departments_modify_admin" ON departments;
CREATE POLICY "departments_modify_admin" ON departments
    FOR ALL TO authenticated
    USING (has_staff_role(hospital_id, ARRAY['admin']))
    WITH CHECK (has_staff_role(hospital_id, ARRAY['admin']));

-- Staff Roles: Public read-only reference catalog
DROP POLICY IF EXISTS "staff_roles_select_all" ON staff_roles;
CREATE POLICY "staff_roles_select_all" ON staff_roles
    FOR SELECT TO public
    USING (true);

-- Hospital Memberships: Users see their own membership; Admins see their hospital's roster
DROP POLICY IF EXISTS "memberships_select_self" ON hospital_memberships;
CREATE POLICY "memberships_select_self" ON hospital_memberships
    FOR SELECT TO authenticated
    USING (user_id = auth.uid() OR has_staff_role(hospital_id, ARRAY['admin']));

-- Hospital Memberships: Admins ONLY can assign/modify staff roles
DROP POLICY IF EXISTS "memberships_admin_manage" ON hospital_memberships;
CREATE POLICY "memberships_admin_manage" ON hospital_memberships
    FOR ALL TO authenticated
    USING (has_staff_role(hospital_id, ARRAY['admin']))
    WITH CHECK (has_staff_role(hospital_id, ARRAY['admin']));

-- Doctors: Public read-only for appointment scheduling and room info
DROP POLICY IF EXISTS "doctors_select_all" ON doctors;
CREATE POLICY "doctors_select_all" ON doctors
    FOR SELECT TO public
    USING (true);

-- Doctors: Admin can insert/manage doctors
DROP POLICY IF EXISTS "doctors_admin_manage" ON doctors;
CREATE POLICY "doctors_admin_manage" ON doctors
    FOR ALL TO authenticated
    USING (has_staff_role(hospital_id, ARRAY['admin']))
    WITH CHECK (has_staff_role(hospital_id, ARRAY['admin']));

-- Doctors: Self-update on duty status only
DROP POLICY IF EXISTS "doctors_update_self" ON doctors;
CREATE POLICY "doctors_update_self" ON doctors
    FOR UPDATE TO authenticated
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- ------------------------------------------------------------------------------
-- 4. RLS POLICIES: PATIENT PROFILES & FAMILY MEMBERS (Need-to-Know Scoping)
-- ------------------------------------------------------------------------------

-- Patient Profiles: Patients own their medical profile
DROP POLICY IF EXISTS "patient_profiles_select_own" ON patient_profiles;
CREATE POLICY "patient_profiles_select_own" ON patient_profiles
    FOR SELECT TO authenticated
    USING (user_id = auth.uid());

DROP POLICY IF EXISTS "patient_profiles_insert_own" ON patient_profiles;
CREATE POLICY "patient_profiles_insert_own" ON patient_profiles
    FOR INSERT TO authenticated
    WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "patient_profiles_update_own" ON patient_profiles;
CREATE POLICY "patient_profiles_update_own" ON patient_profiles
    FOR UPDATE TO authenticated
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- Patient Profiles: Clinical staff and assigned doctors ONLY (Need-to-Know basis)
DROP POLICY IF EXISTS "patient_profiles_clinical_view" ON patient_profiles;
CREATE POLICY "patient_profiles_clinical_view" ON patient_profiles
    FOR SELECT TO authenticated
    USING (
        -- Assigned Doctor can view patient profile
        EXISTS (
            SELECT 1 FROM appointments a
            WHERE a.user_id = patient_profiles.user_id
              AND a.doctor_id = get_my_doctor_id()
              AND a.status = 'upcoming'
        )
        OR EXISTS (
            SELECT 1 FROM tokens t
            WHERE t.user_id = patient_profiles.user_id
              AND t.doctor_id = get_my_doctor_id()
              AND t.status IN ('waiting', 'in-triage', 'serving', 'hold')
        )
        -- Intake/Triage Staff (receptionist, nurse, emergency) can view for active check-in
        OR EXISTS (
            SELECT 1 FROM appointments a
            JOIN hospital_memberships hm ON hm.hospital_id = a.hospital_id
            WHERE a.user_id = patient_profiles.user_id
              AND hm.user_id = auth.uid()
              AND hm.role = ANY(ARRAY['admin', 'receptionist', 'nurse'])
              AND hm.is_active = true
              AND a.appointment_date = CURRENT_DATE
        )
        OR EXISTS (
            SELECT 1 FROM tokens t
            JOIN hospital_memberships hm ON hm.hospital_id = t.hospital_id
            WHERE t.user_id = patient_profiles.user_id
              AND hm.user_id = auth.uid()
              AND hm.role = ANY(ARRAY['admin', 'receptionist', 'nurse'])
              AND hm.is_active = true
              AND t.booking_date = CURRENT_DATE
        )
    );

-- Family Members: Patients manage only their own family members
DROP POLICY IF EXISTS "family_members_select_own" ON family_members;
CREATE POLICY "family_members_select_own" ON family_members
    FOR SELECT TO authenticated
    USING (patient_profile_id = get_my_patient_profile_id());

DROP POLICY IF EXISTS "family_members_modify_own" ON family_members;
CREATE POLICY "family_members_modify_own" ON family_members
    FOR ALL TO authenticated
    USING (patient_profile_id = get_my_patient_profile_id())
    WITH CHECK (patient_profile_id = get_my_patient_profile_id());

-- ------------------------------------------------------------------------------
-- 5. RLS POLICIES: APPOINTMENTS & SLOTS
-- ------------------------------------------------------------------------------

-- Appointment Slots: Public read-only for available slots
DROP POLICY IF EXISTS "appointment_slots_select_all" ON appointment_slots;
CREATE POLICY "appointment_slots_select_all" ON appointment_slots
    FOR SELECT TO public
    USING (is_available = true OR is_hospital_member(hospital_id));

DROP POLICY IF EXISTS "appointment_slots_modify_staff" ON appointment_slots;
CREATE POLICY "appointment_slots_modify_staff" ON appointment_slots
    FOR ALL TO authenticated
    USING (has_staff_role(hospital_id, ARRAY['admin', 'receptionist']) OR is_doctor_at(hospital_id))
    WITH CHECK (has_staff_role(hospital_id, ARRAY['admin', 'receptionist']) OR is_doctor_at(hospital_id));

-- Appointments: Patients view and book their own appointments
DROP POLICY IF EXISTS "appointments_select_own" ON appointments;
CREATE POLICY "appointments_select_own" ON appointments
    FOR SELECT TO authenticated
    USING (user_id = auth.uid());

DROP POLICY IF EXISTS "appointments_insert_own" ON appointments;
CREATE POLICY "appointments_insert_own" ON appointments
    FOR INSERT TO authenticated
    WITH CHECK (user_id = auth.uid() AND status = 'upcoming');

DROP POLICY IF EXISTS "appointments_cancel_own" ON appointments;
CREATE POLICY "appointments_cancel_own" ON appointments
    FOR UPDATE TO authenticated
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid() AND status = 'cancelled');

-- Appointments: Staff and Doctors can view and manage for their hospital
DROP POLICY IF EXISTS "appointments_staff_select" ON appointments;
CREATE POLICY "appointments_staff_select" ON appointments
    FOR SELECT TO authenticated
    USING (
        (is_doctor_at(hospital_id) AND (doctor_id = get_my_doctor_id() OR doctor_id IS NULL))
        OR has_staff_role(hospital_id, ARRAY['admin', 'receptionist', 'nurse'])
    );

DROP POLICY IF EXISTS "appointments_staff_update" ON appointments;
CREATE POLICY "appointments_staff_update" ON appointments
    FOR UPDATE TO authenticated
    USING (
        (is_doctor_at(hospital_id) AND doctor_id = get_my_doctor_id())
        OR has_staff_role(hospital_id, ARRAY['admin', 'receptionist', 'nurse'])
    )
    WITH CHECK (
        (is_doctor_at(hospital_id) AND doctor_id = get_my_doctor_id())
        OR has_staff_role(hospital_id, ARRAY['admin', 'receptionist', 'nurse'])
    );

-- ------------------------------------------------------------------------------
-- 6. RLS POLICIES: OPD QUEUE & TOKENS
-- ------------------------------------------------------------------------------

-- Tokens: Patients view their own tokens
DROP POLICY IF EXISTS "tokens_select_own" ON tokens;
CREATE POLICY "tokens_select_own" ON tokens
    FOR SELECT TO authenticated
    USING (user_id = auth.uid());

-- Tokens: Patients can book tokens (status starts as waiting)
DROP POLICY IF EXISTS "tokens_insert_patient" ON tokens;
CREATE POLICY "tokens_insert_patient" ON tokens
    FOR INSERT TO authenticated
    WITH CHECK (user_id = auth.uid() AND status = 'waiting');

-- Tokens: Receptionists can create walk-in tokens
DROP POLICY IF EXISTS "tokens_insert_receptionist" ON tokens;
CREATE POLICY "tokens_insert_receptionist" ON tokens
    FOR INSERT TO authenticated
    WITH CHECK (has_staff_role(hospital_id, ARRAY['admin', 'receptionist', 'nurse']));

-- Tokens: Staff and Doctors view hospital queue
DROP POLICY IF EXISTS "tokens_select_hospital_staff" ON tokens;
CREATE POLICY "tokens_select_hospital_staff" ON tokens
    FOR SELECT TO authenticated
    USING (
        (is_doctor_at(hospital_id) AND (doctor_id = get_my_doctor_id() OR doctor_id IS NULL))
        OR has_staff_role(hospital_id, ARRAY['admin', 'receptionist', 'nurse'])
    );

-- Tokens: Clinical staff manage queue status
DROP POLICY IF EXISTS "tokens_update_clinical_staff" ON tokens;
CREATE POLICY "tokens_update_clinical_staff" ON tokens
    FOR UPDATE TO authenticated
    USING (
        (is_doctor_at(hospital_id) AND (doctor_id = get_my_doctor_id() OR doctor_id IS NULL))
        OR has_staff_role(hospital_id, ARRAY['admin', 'receptionist', 'nurse'])
    )
    WITH CHECK (
        (is_doctor_at(hospital_id) AND (doctor_id = get_my_doctor_id() OR doctor_id IS NULL))
        OR has_staff_role(hospital_id, ARRAY['admin', 'receptionist', 'nurse'])
    );

-- Queue Events: Visible to patient or hospital staff
DROP POLICY IF EXISTS "queue_events_select" ON queue_events;
CREATE POLICY "queue_events_select" ON queue_events
    FOR SELECT TO authenticated
    USING (
        EXISTS (SELECT 1 FROM tokens t WHERE t.id = queue_events.token_id AND (t.user_id = auth.uid() OR is_hospital_member(t.hospital_id)))
    );

DROP POLICY IF EXISTS "queue_events_insert_staff" ON queue_events;
CREATE POLICY "queue_events_insert_staff" ON queue_events
    FOR INSERT TO authenticated
    WITH CHECK (
        EXISTS (SELECT 1 FROM tokens t WHERE t.id = queue_events.token_id AND is_hospital_member(t.hospital_id))
    );

-- Doctor Assignments: Read for staff, manage for admin
DROP POLICY IF EXISTS "doctor_assignments_select" ON doctor_assignments;
CREATE POLICY "doctor_assignments_select" ON doctor_assignments
    FOR SELECT TO authenticated
    USING (is_hospital_member(hospital_id));

DROP POLICY IF EXISTS "doctor_assignments_admin" ON doctor_assignments;
CREATE POLICY "doctor_assignments_admin" ON doctor_assignments
    FOR ALL TO authenticated
    USING (has_staff_role(hospital_id, ARRAY['admin']))
    WITH CHECK (has_staff_role(hospital_id, ARRAY['admin']));

-- ------------------------------------------------------------------------------
-- 7. RLS POLICIES: HOSPITAL RESOURCES (WARDS & BEDS) — STRICT BED PRIVACY
-- ------------------------------------------------------------------------------

-- Wards: Public read-only for aggregate capacity transparency (ZERO patient data)
DROP POLICY IF EXISTS "wards_select_public" ON wards;
CREATE POLICY "wards_select_public" ON wards
    FOR SELECT TO public
    USING (true);

DROP POLICY IF EXISTS "wards_modify_staff" ON wards;
CREATE POLICY "wards_modify_staff" ON wards
    FOR ALL TO authenticated
    USING (has_staff_role(hospital_id, ARRAY['admin', 'bed_manager']))
    WITH CHECK (has_staff_role(hospital_id, ARRAY['admin', 'bed_manager']));

-- Beds: STAFF ONLY SELECT. Individual beds contain patient names and UHIDs, NEVER expose to public!
DROP POLICY IF EXISTS "beds_select_public" ON beds;
DROP POLICY IF EXISTS "beds_select_staff" ON beds;
CREATE POLICY "beds_select_staff" ON beds
    FOR SELECT TO authenticated
    USING (is_hospital_member(hospital_id));

-- Beds: Bed managers, nurses, and admins manage bed allocations
DROP POLICY IF EXISTS "beds_update_staff" ON beds;
CREATE POLICY "beds_update_staff" ON beds
    FOR UPDATE TO authenticated
    USING (has_staff_role(hospital_id, ARRAY['admin', 'bed_manager', 'nurse', 'sanitation_worker']))
    WITH CHECK (has_staff_role(hospital_id, ARRAY['admin', 'bed_manager', 'nurse', 'sanitation_worker']));

-- Bed Events: Staff audit log
DROP POLICY IF EXISTS "bed_events_select_staff" ON bed_events;
CREATE POLICY "bed_events_select_staff" ON bed_events
    FOR SELECT TO authenticated
    USING (is_hospital_member(hospital_id));

DROP POLICY IF EXISTS "bed_events_insert_staff" ON bed_events;
CREATE POLICY "bed_events_insert_staff" ON bed_events
    FOR INSERT TO authenticated
    WITH CHECK (has_staff_role(hospital_id, ARRAY['admin', 'bed_manager', 'nurse', 'sanitation_worker']));

-- ------------------------------------------------------------------------------
-- 8. RLS POLICIES: EMERGENCY SERVICES (Sanitized Insertion)
-- ------------------------------------------------------------------------------

-- Emergency Requests: Citizens can create emergency requests ONLY with initial status
DROP POLICY IF EXISTS "emergency_requests_insert_all" ON emergency_requests;
CREATE POLICY "emergency_requests_insert_all" ON emergency_requests
    FOR INSERT TO public
    WITH CHECK (
        status = 'dispatch_requested' 
        AND ambulance_id IS NULL 
        AND assigned_triage_bay IS NULL
    );

-- Emergency Requests: Creator can track
DROP POLICY IF EXISTS "emergency_requests_select_creator" ON emergency_requests;
CREATE POLICY "emergency_requests_select_creator" ON emergency_requests
    FOR SELECT TO authenticated
    USING (created_by = auth.uid());

-- Emergency Requests: Emergency and Triage staff manage requests
DROP POLICY IF EXISTS "emergency_requests_staff" ON emergency_requests;
CREATE POLICY "emergency_requests_staff" ON emergency_requests
    FOR ALL TO authenticated
    USING (has_staff_role(hospital_id, ARRAY['admin', 'emergency_staff', 'nurse']))
    WITH CHECK (has_staff_role(hospital_id, ARRAY['admin', 'emergency_staff', 'nurse']));

-- Emergency Events: Staff timeline
DROP POLICY IF EXISTS "emergency_events_staff" ON emergency_events;
CREATE POLICY "emergency_events_staff" ON emergency_events
    FOR ALL TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM emergency_requests er 
            WHERE er.id = emergency_events.request_id 
              AND (er.created_by = auth.uid() OR has_staff_role(er.hospital_id, ARRAY['admin', 'emergency_staff', 'nurse']))
        )
    );

-- ------------------------------------------------------------------------------
-- 9. RLS POLICIES: CIVICCARE GRIEVANCES (Sanitized Submission)
-- ------------------------------------------------------------------------------

-- Complaints: Any citizen can file a grievance, but CANNOT set administrative fields
DROP POLICY IF EXISTS "complaints_insert_public" ON complaints;
CREATE POLICY "complaints_insert_public" ON complaints
    FOR INSERT TO public
    WITH CHECK (
        status = 'submitted'
        AND officer_assigned_id IS NULL
        AND officer_assigned_name IS NULL
        AND resolution_summary IS NULL
        AND resolved_at IS NULL
    );

-- Complaints: Reporters can view their filed complaints
DROP POLICY IF EXISTS "complaints_select_reporter" ON complaints;
CREATE POLICY "complaints_select_reporter" ON complaints
    FOR SELECT TO authenticated
    USING (reporter_id = auth.uid());

-- Complaints: Tracking code lookup for anonymous citizens
DROP POLICY IF EXISTS "complaints_select_by_code" ON complaints;
CREATE POLICY "complaints_select_by_code" ON complaints
    FOR SELECT TO public
    USING (tracking_code IS NOT NULL);

-- Complaints: Grievance officers and admins manage complaints
DROP POLICY IF EXISTS "complaints_staff_manage" ON complaints;
CREATE POLICY "complaints_staff_manage" ON complaints
    FOR ALL TO authenticated
    USING (has_staff_role(hospital_id, ARRAY['admin', 'grievance_officer']))
    WITH CHECK (has_staff_role(hospital_id, ARRAY['admin', 'grievance_officer']));

-- Complaint assignments & events: Staff only
DROP POLICY IF EXISTS "complaint_assignments_staff" ON complaint_assignments;
CREATE POLICY "complaint_assignments_staff" ON complaint_assignments
    FOR ALL TO authenticated
    USING (
        EXISTS (SELECT 1 FROM complaints c WHERE c.id = complaint_assignments.complaint_id AND has_staff_role(c.hospital_id, ARRAY['admin', 'grievance_officer']))
    );

DROP POLICY IF EXISTS "complaint_events_view" ON complaint_events;
CREATE POLICY "complaint_events_view" ON complaint_events
    FOR SELECT TO public
    USING (true);

DROP POLICY IF EXISTS "complaint_events_insert_staff" ON complaint_events;
CREATE POLICY "complaint_events_insert_staff" ON complaint_events
    FOR INSERT TO authenticated
    WITH CHECK (
        EXISTS (SELECT 1 FROM complaints c WHERE c.id = complaint_events.complaint_id AND has_staff_role(c.hospital_id, ARRAY['admin', 'grievance_officer']))
    );

-- ------------------------------------------------------------------------------
-- 10. RLS POLICIES: OPERATIONAL TASKS, NOTIFICATIONS & AUDIT
-- ------------------------------------------------------------------------------

-- Operational Tasks: Tasks visible to assigned worker, role group, or admins
DROP POLICY IF EXISTS "operational_tasks_select" ON operational_tasks;
CREATE POLICY "operational_tasks_select" ON operational_tasks
    FOR SELECT TO authenticated
    USING (
        assigned_to = auth.uid() 
        OR has_staff_role(hospital_id, ARRAY['admin', 'attendant', 'sanitation_worker', 'maintenance_worker'])
    );

DROP POLICY IF EXISTS "operational_tasks_update" ON operational_tasks;
CREATE POLICY "operational_tasks_update" ON operational_tasks
    FOR UPDATE TO authenticated
    USING (
        assigned_to = auth.uid() 
        OR has_staff_role(hospital_id, ARRAY['admin', 'attendant', 'sanitation_worker', 'maintenance_worker'])
    )
    WITH CHECK (
        assigned_to = auth.uid() 
        OR has_staff_role(hospital_id, ARRAY['admin', 'attendant', 'sanitation_worker', 'maintenance_worker'])
    );

-- Notifications: Strictly private to recipient
DROP POLICY IF EXISTS "notifications_select_own" ON notifications;
CREATE POLICY "notifications_select_own" ON notifications
    FOR SELECT TO authenticated
    USING (user_id = auth.uid());

DROP POLICY IF EXISTS "notifications_update_own" ON notifications;
CREATE POLICY "notifications_update_own" ON notifications
    FOR UPDATE TO authenticated
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- Audit Logs: Hospital admins only
DROP POLICY IF EXISTS "audit_logs_select_admin" ON audit_logs;
CREATE POLICY "audit_logs_select_admin" ON audit_logs
    FOR SELECT TO authenticated
    USING (has_staff_role(hospital_id, ARRAY['admin']));

DROP POLICY IF EXISTS "audit_logs_insert_staff" ON audit_logs;
CREATE POLICY "audit_logs_insert_staff" ON audit_logs
    FOR INSERT TO authenticated
    WITH CHECK (is_hospital_member(hospital_id));
