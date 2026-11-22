-- ==============================================================================
-- QueueSense AI — Migration 03: Synthetic Reference Seed Data (Audited & Safe)
-- Fictional Reference Model for Telangana Public Healthcare System Evaluation
-- Contains ZERO real-world patient records, NO live government links, and NO fabricated auth users.
-- ==============================================================================

DO $$
DECLARE
    v_hospital_id UUID;
    v_dept_gen UUID;
    v_dept_car UUID;
    v_dept_ped UUID;
    v_dept_ort UUID;
    v_dept_obg UUID;
    v_dept_pul UUID;
    v_dept_oph UUID;
    v_dept_emg UUID;

    v_doc_arvind UUID;
    v_doc_srinivas UUID;
    v_doc_sunitha UUID;

    v_ward_gen_m UUID;
    v_ward_gen_f UUID;
    v_ward_oxy UUID;
    v_ward_icu UUID;
    v_ward_nicu UUID;
    v_ward_emg UUID;

    i INT;
BEGIN

    -- --------------------------------------------------------------------------
    -- 1. SEED STAFF ROLES CATALOG
    -- --------------------------------------------------------------------------
    INSERT INTO staff_roles (role_name, title, description, allowed_modules) VALUES
    ('admin', 'Hospital Administrator', 'Full administrative authority across beds, tokens, triage, staff roles and audit logs.', ARRAY['overview', 'tokens', 'registration', 'beds', 'emergency', 'civiccare', 'analytics', 'departments', 'attendant_tasks', 'sanitation_tasks', 'maintenance_tasks', 'audit']),
    ('receptionist', 'Registration Desk Staff', 'Patient intake, walk-in token generation and appointment verification.', ARRAY['overview', 'tokens', 'registration', 'analytics']),
    ('nurse', 'Triage & Clinical Nurse', 'Vital triage assessment, queue call-in and doctor coordination.', ARRAY['overview', 'tokens', 'beds', 'emergency', 'analytics']),
    ('bed_manager', 'Bed & Ward Manager', 'Real-time bed allocation, occupancy census and patient transfers.', ARRAY['overview', 'beds', 'analytics']),
    ('emergency_staff', 'Emergency Response Staff', 'Simulated 108/112 intake, casualty bay triage and critical trauma dispatch.', ARRAY['overview', 'emergency', 'beds', 'analytics']),
    ('attendant', 'Patient Ward Attendant', 'Wheelchair transit, sample conveyance and bed turnaround support.', ARRAY['overview', 'attendant_tasks']),
    ('sanitation_worker', 'Sanitation & Hygiene Worker', 'Terminal cleaning, spill disinfection and ward sanitation compliance.', ARRAY['overview', 'sanitation_tasks']),
    ('maintenance_worker', 'Facility Maintenance Technician', 'Biomedical repair, oxygen line checking and electrical/plumbing upkeep.', ARRAY['overview', 'maintenance_tasks']),
    ('grievance_officer', 'CivicCare Grievance Officer', 'Citizen complaint investigation, SLA escalation and resolution reporting.', ARRAY['overview', 'civiccare', 'analytics'])
    ON CONFLICT (role_name) DO UPDATE SET
        title = EXCLUDED.title,
        description = EXCLUDED.description,
        allowed_modules = EXCLUDED.allowed_modules;

    -- --------------------------------------------------------------------------
    -- 2. SEED SYNTHETIC REFERENCE HOSPITALS (Clearly Marked as Fictional Models)
    -- --------------------------------------------------------------------------
    INSERT INTO hospitals (
        name, code, category, district, mandal, village, address, emergency_helpline,
        total_beds, available_beds, ambulances_count, live_wait_minutes, rating, distance_km,
        is_ayushman_bharat, is_aarogyasri, is_operational_demo
    ) VALUES (
        'Telangana Model Academic Medical Center (Synthetic TIMS-Gachibowli Unit)',
        'TIMS-SYN-01',
        'Government Teaching Hospital',
        'Rangareddy',
        'Serilingampally',
        'Gachibowli',
        'Synthetic Health Corridor, Gachibowli Area, Serilingampally, Rangareddy 500032',
        '040-0000-0001 (Synthetic Prototype Helpline - Not Active Emergency)',
        850, 124, 6, 24, 4.6, 2.4,
        true, true, true
    )
    ON CONFLICT (code) DO UPDATE SET 
        name = EXCLUDED.name,
        is_operational_demo = true,
        updated_at = now()
    RETURNING id INTO v_hospital_id;

    -- Additional regional synthetic benchmarks
    INSERT INTO hospitals (name, code, category, district, mandal, village, address, emergency_helpline, total_beds, available_beds, ambulances_count, live_wait_minutes, rating, distance_km, is_ayushman_bharat, is_aarogyasri, is_operational_demo)
    VALUES 
    (
        'Telangana Regional Referral Hospital (Synthetic Metro Teaching Unit)',
        'TRRH-SYN-02',
        'Government Teaching Hospital',
        'Hyderabad',
        'Charminar',
        'Afzal Gunj Synthetic',
        'Synthetic Medical Road, Hyderabad 500012',
        '040-0000-0002 (Synthetic Prototype Helpline)',
        1100, 82, 4, 48, 4.3, 14.8, true, true, true
    ),
    (
        'Telangana District Model Hospital (Synthetic Northern Unit)',
        'TDMH-SYN-03',
        'District Hospital',
        'Karimnagar',
        'Karimnagar Urban',
        'Collectorate Synthetic Camp',
        'Synthetic District Center Road, Karimnagar 505001',
        '0878-000-0003 (Synthetic Prototype Helpline)',
        450, 68, 3, 18, 4.4, 165.0, true, true, true
    )
    ON CONFLICT (code) DO UPDATE SET is_operational_demo = true;

    -- --------------------------------------------------------------------------
    -- 3. SEED DEPARTMENTS FOR PRIMARY REFERENCE HOSPITAL
    -- --------------------------------------------------------------------------
    INSERT INTO departments (hospital_id, name, short_code, head_doctor_name, room_number, current_queue_length, avg_wait_mins, active_doctors, status)
    VALUES (v_hospital_id, 'General Medicine & Fevers', 'GEN', 'Dr. K. Srinivas Rao, MD (Synthetic)', 'OPD Room 101-103', 14, 22, 3, 'smooth')
    ON CONFLICT (hospital_id, short_code) DO UPDATE SET name = EXCLUDED.name RETURNING id INTO v_dept_gen;

    INSERT INTO departments (hospital_id, name, short_code, head_doctor_name, room_number, current_queue_length, avg_wait_mins, active_doctors, status)
    VALUES (v_hospital_id, 'Cardiology & Hypertension', 'CAR', 'Dr. Arvind Rao, DM (Synthetic)', 'OPD Room 204', 8, 35, 2, 'moderate')
    ON CONFLICT (hospital_id, short_code) DO UPDATE SET name = EXCLUDED.name RETURNING id INTO v_dept_car;

    INSERT INTO departments (hospital_id, name, short_code, head_doctor_name, room_number, current_queue_length, avg_wait_mins, active_doctors, status)
    VALUES (v_hospital_id, 'Pediatrics & Child Care', 'PED', 'Dr. M. Sunitha, MD (Synthetic)', 'OPD Room 108', 6, 15, 2, 'smooth')
    ON CONFLICT (hospital_id, short_code) DO UPDATE SET name = EXCLUDED.name RETURNING id INTO v_dept_ped;

    INSERT INTO departments (hospital_id, name, short_code, head_doctor_name, room_number, current_queue_length, avg_wait_mins, active_doctors, status)
    VALUES (v_hospital_id, 'Orthopedics & Joint Care', 'ORT', 'Dr. T. Venkat Reddy, MS (Synthetic)', 'OPD Room 210', 11, 28, 2, 'smooth')
    ON CONFLICT (hospital_id, short_code) DO UPDATE SET name = EXCLUDED.name RETURNING id INTO v_dept_ort;

    INSERT INTO departments (hospital_id, name, short_code, head_doctor_name, room_number, current_queue_length, avg_wait_mins, active_doctors, status)
    VALUES (v_hospital_id, 'Obstetrics & Gynecology (OBGYN)', 'OBG', 'Dr. G. Lakshmi Prasanna, MS (Synthetic)', 'Maternal Block M-04', 9, 20, 2, 'smooth')
    ON CONFLICT (hospital_id, short_code) DO UPDATE SET name = EXCLUDED.name RETURNING id INTO v_dept_obg;

    INSERT INTO departments (hospital_id, name, short_code, head_doctor_name, room_number, current_queue_length, avg_wait_mins, active_doctors, status)
    VALUES (v_hospital_id, 'Pulmonology & Respiratory Care', 'PUL', 'Dr. N. Vikram, MD (Synthetic)', 'OPD Room 114', 5, 18, 1, 'smooth')
    ON CONFLICT (hospital_id, short_code) DO UPDATE SET name = EXCLUDED.name RETURNING id INTO v_dept_pul;

    INSERT INTO departments (hospital_id, name, short_code, head_doctor_name, room_number, current_queue_length, avg_wait_mins, active_doctors, status)
    VALUES (v_hospital_id, 'Ophthalmology (Eye Clinic)', 'OPH', 'Dr. Radhika Devi, MS (Synthetic)', 'OPD Room 302', 7, 16, 2, 'smooth')
    ON CONFLICT (hospital_id, short_code) DO UPDATE SET name = EXCLUDED.name RETURNING id INTO v_dept_oph;

    INSERT INTO departments (hospital_id, name, short_code, head_doctor_name, room_number, current_queue_length, avg_wait_mins, active_doctors, status)
    VALUES (v_hospital_id, 'Emergency Trauma & Casualty', 'EMG', 'Dr. S. R. Chary, MD (Synthetic)', 'Ground Floor Bay 1-4', 4, 6, 4, 'smooth')
    ON CONFLICT (hospital_id, short_code) DO UPDATE SET name = EXCLUDED.name RETURNING id INTO v_dept_emg;

    -- --------------------------------------------------------------------------
    -- 4. SEED CLINICAL DOCTORS (user_id IS NULL: zero fake auth users created)
    -- --------------------------------------------------------------------------
    INSERT INTO doctors (
        id, user_id, hospital_id, department_id, name, specialty,
        registration_number, room_number, badge_id, avatar, on_duty,
        scheduled_today, completed_today, waiting_now, avg_consult_mins
    ) VALUES (
        '11111111-1111-4111-a111-111111111111',
        NULL, -- Unlinked until actual doctor registers/links in auth
        v_hospital_id, v_dept_car,
        'Dr. Arvind Rao (Synthetic)', 'Cardiology & Hypertension',
        'SYN-TSMC-44021', 'Room 204', 'SYN-DOC-409', '👨‍⚕️', true,
        24, 11, 4, 14
    ) ON CONFLICT (hospital_id, registration_number) DO UPDATE SET on_duty = true
    RETURNING id INTO v_doc_arvind;

    INSERT INTO doctors (
        id, user_id, hospital_id, department_id, name, specialty,
        registration_number, room_number, badge_id, avatar, on_duty,
        scheduled_today, completed_today, waiting_now, avg_consult_mins
    ) VALUES (
        '11111111-1111-4111-a111-222222222222',
        NULL,
        v_hospital_id, v_dept_gen,
        'Dr. K. Srinivas Rao (Synthetic)', 'General Medicine & Fevers',
        'SYN-TSMC-38102', 'Room 101', 'SYN-DOC-102', '👨‍⚕️', true,
        32, 18, 6, 10
    ) ON CONFLICT (hospital_id, registration_number) DO UPDATE SET on_duty = true
    RETURNING id INTO v_doc_srinivas;

    INSERT INTO doctors (
        id, user_id, hospital_id, department_id, name, specialty,
        registration_number, room_number, badge_id, avatar, on_duty,
        scheduled_today, completed_today, waiting_now, avg_consult_mins
    ) VALUES (
        '11111111-1111-4111-a111-333333333333',
        NULL,
        v_hospital_id, v_dept_ped,
        'Dr. M. Sunitha (Synthetic)', 'Pediatrics & Neonatal Care',
        'SYN-TSMC-51209', 'Room 108', 'SYN-DOC-108', '👩‍⚕️', true,
        18, 9, 3, 12
    ) ON CONFLICT (hospital_id, registration_number) DO UPDATE SET on_duty = true
    RETURNING id INTO v_doc_sunitha;

    -- --------------------------------------------------------------------------
    -- 5. SEED APPOINTMENT SLOTS (Next 3 Days for Doctor Consultations)
    -- --------------------------------------------------------------------------
    FOR i IN 0..2 LOOP
        INSERT INTO appointment_slots (hospital_id, department_id, doctor_id, slot_date, start_time, end_time, max_capacity, booked_count, is_available)
        VALUES 
        (v_hospital_id, v_dept_car, v_doc_arvind, CURRENT_DATE + i, '09:00:00', '09:30:00', 3, 2, true),
        (v_hospital_id, v_dept_car, v_doc_arvind, CURRENT_DATE + i, '09:30:00', '10:00:00', 3, 1, true),
        (v_hospital_id, v_dept_car, v_doc_arvind, CURRENT_DATE + i, '10:00:00', '10:30:00', 3, 3, false),
        (v_hospital_id, v_dept_car, v_doc_arvind, CURRENT_DATE + i, '10:30:00', '11:00:00', 3, 1, true),
        (v_hospital_id, v_dept_car, v_doc_arvind, CURRENT_DATE + i, '11:00:00', '11:30:00', 3, 0, true)
        ON CONFLICT (doctor_id, slot_date, start_time) DO NOTHING;
    END LOOP;

    -- --------------------------------------------------------------------------
    -- 6. SEED WARDS & BEDS (Capacity & Occupancy Simulation)
    -- --------------------------------------------------------------------------
    INSERT INTO wards (hospital_id, name, floor, block, category, total_beds, occupied_beds, available_beds, reserved_emergency, turnaround_avg_hours)
    VALUES (v_hospital_id, 'General Medical Ward (Male)', '1st Floor', 'Wing A', 'General Ward', 120, 92, 28, 6, 5.0)
    RETURNING id INTO v_ward_gen_m;

    INSERT INTO wards (hospital_id, name, floor, block, category, total_beds, occupied_beds, available_beds, reserved_emergency, turnaround_avg_hours)
    VALUES (v_hospital_id, 'General Medical Ward (Female)', '1st Floor', 'Wing B', 'General Ward', 120, 98, 22, 6, 4.8)
    RETURNING id INTO v_ward_gen_f;

    INSERT INTO wards (hospital_id, name, floor, block, category, total_beds, occupied_beds, available_beds, reserved_emergency, turnaround_avg_hours)
    VALUES (v_hospital_id, 'Cardio-Pulmonary Oxygen Bay', '2nd Floor', 'Wing C', 'Oxygen Supported Ward', 80, 61, 19, 8, 4.0)
    RETURNING id INTO v_ward_oxy;

    INSERT INTO wards (hospital_id, name, floor, block, category, total_beds, occupied_beds, available_beds, reserved_emergency, turnaround_avg_hours)
    VALUES (v_hospital_id, 'Intensive Medical Care Unit (MICU)', '3rd Floor', 'Critical Care Block', 'Intensive Care Unit (ICU)', 45, 38, 7, 5, 2.5)
    RETURNING id INTO v_ward_icu;

    INSERT INTO wards (hospital_id, name, floor, block, category, total_beds, occupied_beds, available_beds, reserved_emergency, turnaround_avg_hours)
    VALUES (v_hospital_id, 'Neonatal Intensive Care Unit (NICU)', '2nd Floor', 'Maternal Wing', 'Neonatal ICU (NICU)', 30, 24, 6, 4, 3.2)
    RETURNING id INTO v_ward_nicu;

    INSERT INTO wards (hospital_id, name, floor, block, category, total_beds, occupied_beds, available_beds, reserved_emergency, turnaround_avg_hours)
    VALUES (v_hospital_id, 'Casualty & Rapid Trauma Bay', 'Ground Floor', 'Casualty Block', 'Emergency / Casualty Bay', 25, 14, 11, 10, 1.5)
    RETURNING id INTO v_ward_emg;

    -- Seed sample beds under ICU respecting occupancy constraint
    FOR i IN 1..10 LOOP
        INSERT INTO beds (ward_id, hospital_id, bed_number, status, current_patient_uhid, current_patient_name, assigned_at)
        VALUES (
            v_ward_icu, v_hospital_id, 'ICU-B0' || i,
            CASE WHEN i <= 7 THEN 'occupied'::TEXT WHEN i = 8 THEN 'cleaning'::TEXT ELSE 'available'::TEXT END,
            CASE WHEN i <= 7 THEN 'SYN-UHID-ICU-00' || i ELSE NULL END,
            CASE WHEN i <= 7 THEN 'Synthetic Inpatient ' || i ELSE NULL END,
            CASE WHEN i <= 7 THEN now() - (i || ' hours')::INTERVAL ELSE NULL END
        )
        ON CONFLICT (ward_id, bed_number) DO NOTHING;
    END LOOP;

    -- --------------------------------------------------------------------------
    -- 7. SEED LIVE OPD QUEUE TOKENS (Synthetic Patients, user_id IS NULL)
    -- --------------------------------------------------------------------------
    INSERT INTO tokens (
        token_number, hospital_id, department_id, doctor_id, user_id, booking_date,
        patient_name, patient_age, patient_gender, patient_phone, uhid,
        slot_time, room_number, status, queue_position, people_ahead,
        estimated_consult_time, qr_code_data, priority, journey_steps,
        ai_advice, triage_score, bp, pulse, spo2, temp
    ) VALUES 
    (
        'A-101', v_hospital_id, v_dept_car, v_doc_arvind, NULL, CURRENT_DATE,
        'Synthetic Patient Farooq', 58, 'Male', '9849000001', 'SYN-UHID-4412',
        '10:00 AM', 'Room 204', 'completed', 0, 0,
        '10:00 AM', 'SYN-TOKEN-A101-TIMS', 'normal',
        '[{"step": "Registration", "station": "Desk 1", "status": "completed", "time": "09:40 AM"}, {"step": "Triage Vitals", "station": "Booth 2", "status": "completed", "time": "09:50 AM"}, {"step": "Doctor Consultation", "station": "Room 204", "status": "completed", "time": "10:15 AM"}]'::jsonb,
        'Consultation completed. Routine medication prescribed.', 3, '138/88', 76, 98, 98.4
    ),
    (
        'A-102', v_hospital_id, v_dept_car, v_doc_arvind, NULL, CURRENT_DATE,
        'Synthetic Patient Sujatha', 49, 'Female', '9849000002', 'SYN-UHID-4413',
        '10:15 AM', 'Room 204', 'serving', 1, 0,
        '10:15 AM', 'SYN-TOKEN-A102-TIMS', 'normal',
        '[{"step": "Registration", "station": "Desk 1", "status": "completed", "time": "09:55 AM"}, {"step": "Triage Vitals", "station": "Booth 2", "status": "completed", "time": "10:05 AM"}, {"step": "Doctor Consultation", "station": "Room 204", "status": "in_progress", "time": "Now"}]'::jsonb,
        'Currently in consultation with Dr. Arvind Rao.', 3, '142/90', 82, 97, 98.6
    ),
    (
        'A-103', v_hospital_id, v_dept_car, v_doc_arvind, NULL, CURRENT_DATE,
        'Synthetic Patient Ramulu', 64, 'Male', '9849000003', 'SYN-UHID-4414',
        '10:30 AM', 'Room 204', 'in-triage', 2, 1,
        '10:35 AM', 'SYN-TOKEN-A103-TIMS', 'priority',
        '[{"step": "Registration", "station": "Desk 1", "status": "completed", "time": "10:10 AM"}, {"step": "Triage Vitals", "station": "Booth 2", "status": "in_progress", "time": "Now"}, {"step": "Doctor Consultation", "station": "Room 204", "status": "upcoming", "time": "10:35 AM"}]'::jsonb,
        'Senior citizen priority lane applied. ECG requested.', 2, '156/94', 88, 96, 98.8
    ),
    (
        'A-104', v_hospital_id, v_dept_car, v_doc_arvind, NULL, CURRENT_DATE,
        'Synthetic Patient Venkat', 34, 'Male', '9849000004', 'SYN-UHID-8812',
        '10:45 AM', 'Room 204', 'waiting', 3, 2,
        '10:48 AM', 'SYN-TOKEN-A104-TIMS', 'normal',
        '[{"step": "Registration", "station": "Mobile App", "status": "completed", "time": "10:20 AM"}, {"step": "Triage Vitals", "station": "Booth 2", "status": "upcoming", "time": "10:38 AM"}, {"step": "Doctor Consultation", "station": "Room 204", "status": "upcoming", "time": "10:48 AM"}]'::jsonb,
        'Current pace is steady. Proceed to Triage Booth 2 before 10:40 AM.', 3, '120/80', 72, 99, 98.6
    )
    ON CONFLICT (hospital_id, department_id, token_number, booking_date) DO NOTHING;

    -- --------------------------------------------------------------------------
    -- 8. SEED CIVICCARE CITIZEN GRIEVANCES (reporter_id IS NULL: synthetic records)
    -- --------------------------------------------------------------------------
    INSERT INTO complaints (
        tracking_code, hospital_id, category, title, description, hospital_name,
        ward_or_dept, is_anonymous, reporter_id, reporter_name, reporter_phone,
        status, urgency, resolution_summary, filed_at
    ) VALUES
    (
        'CC-TS-8492', v_hospital_id, 'sanitation',
        'Spill in 2nd Floor Corridor near Lift Bay 3',
        'Water leak puddle causing slipping hazard near cardiology waiting lounge.',
        'Telangana Model Academic Medical Center (Synthetic)',
        '2nd Floor Cardio Waiting', false, NULL, 'Synthetic Citizen A', '9849000010',
        'action_taken', 'urgent', 'Attendant and sanitation crew dispatched with caution board.',
        now() - INTERVAL '45 minutes'
    ),
    (
        'CC-TS-8493', v_hospital_id, 'queue_delay',
        'Digital OPD Calling Display offline in Orthopedics Room 210',
        'The overhead token monitor is turned off, patients unable to verify if their number was called.',
        'Telangana Model Academic Medical Center (Synthetic)',
        'OPD Room 210 Waiting Hall', false, NULL, 'Synthetic Citizen B', '9849000020',
        'under_review', 'routine', 'Biomedical technician notified to restart HDMI feed.',
        now() - INTERVAL '2 hours'
    ),
    (
        'CC-TS-8494', v_hospital_id, 'medicine',
        'Pharmacy Counter 4 out of stock for Metformin 500mg',
        'Free generic medicine counter directed patients to external medical shop.',
        'Telangana Model Academic Medical Center (Synthetic)',
        'Ground Floor Pharmacy Counter 4', true, NULL, NULL, NULL,
        'assigned', 'urgent', 'Escalated to Chief Pharmacist for sub-store transfer batch.',
        now() - INTERVAL '4 hours'
    ),
    (
        'CC-TS-8495', v_hospital_id, 'infrastructure',
        'Wheelchair ramp handrail loose near Casualty Gate 2',
        'Support railing wobbling when senior citizens lean for support.',
        'Telangana Model Academic Medical Center (Synthetic)',
        'Emergency Casualty Gate 2', false, NULL, 'Synthetic Citizen C', '9849000030',
        'resolved', 'routine', 'Civil engineering team re-anchored steel fasteners. Inspected and approved.',
        now() - INTERVAL '1 day'
    )
    ON CONFLICT (tracking_code) DO NOTHING;

    -- --------------------------------------------------------------------------
    -- 9. SEED OPERATIONAL TASKS (assigned_to IS NULL: zero fake auth users)
    -- --------------------------------------------------------------------------
    INSERT INTO operational_tasks (hospital_id, category, title, location, priority, status, assigned_to, assigned_to_name, assigned_role, notes)
    VALUES
    (v_hospital_id, 'transport', 'Transfer post-op patient to General Male Ward Bed 14', 'Post-Op Bay 2 -> Ward 104', 'urgent', 'in_progress', NULL, 'Rajesh K. (Synthetic Attendant)', 'attendant', 'Patient stable, IV pole transfer required.'),
    (v_hospital_id, 'sanitation', 'Terminal sterilization of Bed ICU-B08 after patient discharge', '3rd Floor MICU Bay 8', 'urgent', 'pending', NULL, 'Laxmi B. (Synthetic Sanitation)', 'sanitation_worker', 'Follow standard biohazard protocols.'),
    (v_hospital_id, 'maintenance', 'Inspect oxygen wall port pressure at Cardio Stepdown Bed 12', '2nd Floor Oxygen Ward', 'stat', 'in_progress', NULL, 'M. Ahmed (Synthetic Biomedical Tech)', 'maintenance_worker', 'Flowmeter gauge replacement pending.')
    ON CONFLICT DO NOTHING;

    -- --------------------------------------------------------------------------
    -- 10. SEED INITIAL AUDIT TRAIL ENTRY
    -- --------------------------------------------------------------------------
    INSERT INTO audit_logs (hospital_id, actor_name, role, action, details, severity)
    VALUES (
        v_hospital_id, 'System Provisioner', 'system', 'HOSPITAL_SCHEMA_INITIALIZED',
        'QueueSense AI Phase 1A synthetic seed data populated for TIMS Gachibowli reference hospital.',
        'info'
    );

END $$;
