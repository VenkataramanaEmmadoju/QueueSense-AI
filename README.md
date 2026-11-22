# QueueSense AI

QueueSense AI is a predictive patient flow, hospital resource intelligence, and civic accountability Progressive Web Application (PWA). The platform is designed for public healthcare facilities, focusing on outpatient queue management, bed tracking, and grievance redressal.

## Applications & Role Architecture

QueueSense AI includes three distinct role-based experiences accessible from a single login screen:

1. **Patient Web Application (`/patient`)**
   - Mobile-first interface optimized for touch devices (360px+).
   - Hospital discovery and selection covering Telangana districts, mandals, and villages.
   - OPD token booking with digital QR pass and live queue position radar.
   - Predictive patient journey milestones (Registration -> Triage -> Consultation -> Pharmacy).
   - Emergency assistance shortcuts (108/112) accessible without login.
   - Trilingual support for English, Telugu, and Hindi.
   - Profile management with caregiver mode and family member linking.

2. **Doctor Clinical Console (`/doctor`)**
   - Outpatient consultation workflow and queue call-in controls.
   - Real-time patient priority indicators and clinical review.
   - Room status toggle and consultation completion tracking.

3. **Hospital Staff Operations Desk (`/staff`)**
   - Role-specific modules for Hospital Admin, Triage Nurse, Bed Manager, Attendant, Sanitation, and Maintenance.
   - General, Oxygen, ICU, and Ventilator bed status tracking.
   - Emergency triage queue classification.
   - CivicCare grievance intake and escalation tracking.
   - Facility operation metrics and synthetic load analytics.

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Lucide React icons
- **Data Visualization**: Recharts
- **Internationalization**: react-i18next
- **Progressive Web App**: vite-plugin-pwa, Workbox offline caching
- **State Management**: React Context, browser localStorage for prototype session state

## Getting Started

### Prerequisites

- Node.js (version 18 or later)
- npm

### Installation & Run

```bash
# Clone the repository
git clone https://github.com/wenki/QueueSense-AI.git
cd QueueSense-AI

# Install dependencies
npm install

# Start development server
npm run dev
```

The application runs locally on `http://localhost:3000`.

### Build

```bash
# Production build
npm run build

# Preview build
npm run preview
```

## Prototype Credentials

The login portal allows quick testing using sample prototype credentials:

- **Patient**: `patient@queuesense.demo` / `Patient@123`
- **Doctor**: `doctor@queuesense.demo` / `Doctor@123`
- **Hospital Staff**: `staff@queuesense.demo` / `Staff@123`

*Note: In this frontend prototype phase, operational metrics, queue estimates, and bed counts are simulated synthetic data. Do not store real personal health information or production credentials.*

## Planned Backend Architecture

The planned production architecture includes:
- **API Services**: FastAPI (Python) asynchronous endpoints for queue orchestration and event notifications.
- **Database**: PostgreSQL with Row-Level Security for multi-tenant hospital data isolation.
- **Machine Learning**: Predictive queuing models trained on historical OPD volume and consultation durations.
- **Health Systems Integration**: Interoperability with ABDM / ABHA standards and emergency response channels.

## License

MIT
