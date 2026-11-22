# QueueSense AI — Supabase Database Architecture & Setup Guide (Audited Phase 1A)

This document provides the audited PostgreSQL database schema, Row Level Security (RLS) policies, execution steps, and verification procedures for **QueueSense AI Backend Phase 1A**.

---

## 1. Exact Database Table Inventory (24 Tables)

All 24 application tables use UUIDv4 primary keys (`gen_random_uuid()`), timestamp automation (`created_at`, `updated_at`), foreign keys with appropriate cascade rules, and check constraints matching the frontend TypeScript interfaces:

| # | Table Name | Purpose & Scope | Key Foreign Keys & Constraints |
| :---: | :--- | :--- | :--- |
| 1 | `profiles` | Extends `auth.users` with user details. | `id REFERENCES auth.users(id) ON DELETE CASCADE`. Role defaults to `'patient'`. |
| 2 | `hospitals` | Public health facility directory. | `code UNIQUE`. Categories validated against Telangana public hospital tiers. |
| 3 | `departments` | Clinical hospital departments. | `hospital_id REFERENCES hospitals(id)`. `UNIQUE(hospital_id, short_code)`. |
| 4 | `staff_roles` | Reference catalog of 9 staff roles. | `role_name PRIMARY KEY` (`admin`, `receptionist`, `nurse`, `bed_manager`, etc.). |
| 5 | `hospital_memberships` | Multi-tenant staff assignment. | `user_id REFERENCES profiles(id)`, `hospital_id REFERENCES hospitals(id)`. |
| 6 | `doctors` | Clinical doctor directory. | `user_id REFERENCES profiles(id) ON DELETE SET NULL`, `UNIQUE(hospital_id, registration_number)`. |
| 7 | `patient_profiles` | Patient medical demographics. | `user_id REFERENCES profiles(id) ON DELETE CASCADE UNIQUE`, `uhid UNIQUE`. |
| 8 | `family_members` | Dependents & caregiver profiles. | `patient_profile_id REFERENCES patient_profiles(id) ON DELETE CASCADE`. |
| 9 | `appointment_slots` | Doctor consultation slots. | `CHECK (booked_count <= max_capacity)`, `UNIQUE(doctor_id, slot_date, start_time)`. |
| 10 | `appointments` | Booked OPD appointments. | `appointment_code UNIQUE`. Contains immutable beneficiary snapshot. |
| 11 | `tokens` | Live digital OPD tokens. | `UNIQUE(hospital_id, department_id, token_number, booking_date)`. |
| 12 | `queue_events` | Immutable token journey events. | `token_id REFERENCES tokens(id) ON DELETE CASCADE`. |
| 13 | `doctor_assignments` | Doctor room and shift schedule. | `doctor_id REFERENCES doctors(id) ON DELETE CASCADE`. |
| 14 | `wards` | Hospital ward aggregates. | `CHECK (occupied_beds + available_beds <= total_beds)`. |
| 15 | `beds` | Individual hospital bed units. | `UNIQUE(ward_id, bed_number)`. `chk_bed_occupancy_integrity` prevents ghost patients. |
| 16 | `bed_events` | Bed admission/cleaning log. | `bed_id REFERENCES beds(id) ON DELETE CASCADE`. |
| 17 | `emergency_requests` | 108/112 casualty requests. | Sanitized insert policy prevents unauthenticated administrative escalation. |
| 18 | `emergency_events` | Emergency action timeline. | `request_id REFERENCES emergency_requests(id) ON DELETE CASCADE`. |
| 19 | `complaints` | CivicCare citizen grievances. | `tracking_code UNIQUE`. Sanitized insert policy prevents setting resolution on filing. |
| 20 | `complaint_assignments`| Grievance staff assignments. | `complaint_id REFERENCES complaints(id) ON DELETE CASCADE`. |
| 21 | `complaint_events` | Publicly verifiable SLA audit. | `complaint_id REFERENCES complaints(id) ON DELETE CASCADE`. |
| 22 | `operational_tasks` | Attendant/Sanitation task queue. | `hospital_id REFERENCES hospitals(id) ON DELETE CASCADE`. |
| 23 | `notifications` | Private user alerts. | `user_id REFERENCES profiles(id) ON DELETE CASCADE`. |
| 24 | `audit_logs` | Hospital-level security audit trail. | `hospital_id REFERENCES hospitals(id) ON DELETE SET NULL`. Admin-only read. |

---

## 2. Security Audit & Hardening Summary

During the pre-execution audit, the following security vulnerabilities were identified and resolved:

### A. Privilege Escalation Prevention
- **Issue**: Client-supplied metadata (`raw_user_meta_data->>'role'`) or direct client `INSERT`/`UPDATE` could allow a user to claim `admin` or `doctor` roles.
- **Resolution**:
  - `handle_new_user()` hardcodes `role = 'patient'`. Client metadata is never trusted for role assignment.
  - A `BEFORE INSERT` trigger on `profiles` enforces `role = 'patient'` on direct user registration.
  - A `BEFORE UPDATE` trigger on `profiles` rejects any attempt by a user to alter their own `role`.
  - `hospital_memberships` and `doctors` can only be modified by verified hospital administrators (`has_staff_role(hospital_id, ARRAY['admin'])`).

### B. Doctor Clinical Access Scoping (Need-to-Know)
- **Issue**: Previously, any doctor could view all patient profiles across their hospital.
- **Resolution**: `patient_profiles_clinical_view` policy was scoped so doctors can only view medical profiles of patients actively assigned to their care via an active appointment or queue token (`doctor_id = get_my_doctor_id()`).

### C. Patient Privacy on Beds
- **Issue**: The `beds` table previously had a public read policy that would have exposed `current_patient_name` and `current_patient_uhid`.
- **Resolution**: Public read on `beds` was removed entirely. Anonymous visitors and citizens view aggregate bed counts from `wards` (zero patient identifiable data). The `beds` table is restricted strictly to authenticated hospital staff (`is_hospital_member(hospital_id)`).

### D. Anonymous Submission Sanitization
- **Issue**: Anonymous `INSERT` policies on `emergency_requests` and `complaints` allowed clients to supply arbitrary administrative fields (e.g. setting status to `admitted` or `resolved`).
- **Resolution**: `WITH CHECK` clauses enforce that:
  - Emergency requests must have `status = 'dispatch_requested'`, `ambulance_id IS NULL`, and `assigned_triage_bay IS NULL`.
  - CivicCare complaints must have `status = 'submitted'`, `officer_assigned_id IS NULL`, and `resolution_summary IS NULL`.

### E. Zero Fabricated Auth Users & FK Integrity in Seed Data
- **Issue**: Hardcoding random UUIDs for `doctors.user_id` in migrations causes foreign key failures (`Key not present in table "profiles"`).
- **Resolution**: `doctors.user_id` is made nullable (`REFERENCES profiles(id) ON DELETE SET NULL`). Seed doctors and synthetic tokens use `user_id = NULL`, guaranteeing 100% foreign key validity on a clean Supabase project without creating fake auth users.

---

## 3. Manual SQL Migration Instructions

Apply the migrations in numerical order using the **Supabase Dashboard SQL Editor**:

```
Step 1: 20261122000001_initial_schema.sql       (Schema, Tables, Constraints, Indexes)
                     │
                     ▼
Step 2: 20261122000002_security_and_rls.sql      (Functions, Triggers, RLS Policies)
                     │
                     ▼
Step 3: 20261122000003_synthetic_demo_seed.sql   (Synthetic Telangana Reference Hospital)
```

### Execution Steps
1. Navigate to your Supabase Project: `https://supabase.com/dashboard/project/<YOUR_PROJECT_REF>/sql`
2. **Execute File 1**:
   - Open [supabase/migrations/20261122000001_initial_schema.sql](file:///C:/Users/Venkataramana%20Santhu/.gemini/antigravity/scratch/queuesense-ai/supabase/migrations/20261122000001_initial_schema.sql)
   - Paste the SQL into the editor and click **Run**.
3. **Execute File 2**:
   - Open [supabase/migrations/20261122000002_security_and_rls.sql](file:///C:/Users/Venkataramana%20Santhu/.gemini/antigravity/scratch/queuesense-ai/supabase/migrations/20261122000002_security_and_rls.sql)
   - Paste the SQL into the editor and click **Run**.
4. **Execute File 3**:
   - Open [supabase/migrations/20261122000003_synthetic_demo_seed.sql](file:///C:/Users/Venkataramana%20Santhu/.gemini/antigravity/scratch/queuesense-ai/supabase/migrations/20261122000003_synthetic_demo_seed.sql)
   - Paste the SQL into the editor and click **Run**.

---

## 4. Verification & Testing Queries

Run these verification queries in the Supabase SQL Editor after applying the migrations:

### Query 1: Verify All 24 Tables Have RLS Enabled
```sql
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
ORDER BY tablename;
```
*Expected Result*: All 24 tables return `rowsecurity = true`.

### Query 2: Test Public Anonymous Access
```sql
-- Simulate anonymous public visitor
SET LOCAL ROLE anon;

-- Allowed: Should return hospitals (discovery)
SELECT name, code, total_beds, available_beds FROM public.hospitals;

-- Allowed: Should return ward bed counts (zero patient data)
SELECT name, category, total_beds, available_beds FROM public.wards;

-- Blocked: Should return 0 rows (beds table is restricted to staff)
SELECT * FROM public.beds;

-- Blocked: Should return 0 rows (medical profiles are restricted)
SELECT * FROM public.patient_profiles;
```

### Query 3: Test Anonymous Submission Sanitization
```sql
SET LOCAL ROLE anon;

-- Blocked: Malicious attempt to set status to 'admitted' should fail RLS check
INSERT INTO public.emergency_requests (patient_name, contact_phone, location, mandal, condition, severity, status)
VALUES ('Attacker', '9999999999', 'Test Location', 'Serilingampally', 'Fever', 'moderate', 'admitted');
-- Expected: ERROR: new row violates row-level security policy for table "emergency_requests"

-- Allowed: Clean submission with default 'dispatch_requested'
INSERT INTO public.emergency_requests (patient_name, contact_phone, location, mandal, condition, severity)
VALUES ('Test Citizen', '9849000099', 'Hitec City Junction', 'Serilingampally', 'Respiratory distress', 'critical');
-- Expected: Success (1 row inserted)
```

---

## 5. Remaining Risks & Prerequisites for Production

1. **API Rate Limiting**: The public `INSERT` policies for emergency requests and CivicCare complaints are essential for citizen accessibility, but in production they require rate-limiting at the Edge/API layer (e.g. Cloudflare Turnstile or Supabase Edge Functions) to prevent denial-of-service spam.
2. **Auth Webhook Trigger**: The `handle_new_user()` function is created in `public`. In production, bind it to `auth.users` via Supabase Dashboard -> Database -> Webhooks or Triggers so that profile creation occurs automatically upon signup.
