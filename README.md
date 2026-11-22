# 🏥 QueueSense AI
### Smart Hospital Queues, Better Care

**A multilingual smart hospital queue and patient-flow management platform designed to reduce uncertainty, improve operational coordination, and make public healthcare more accessible.**

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://queue-sense-ai.vercel.app/)
[![React](https://img.shields.io/badge/React-TypeScript-149ECA?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-Frontend-646CFF?style=for-the-badge&logo=vite)](https://vite.dev/)
[![Status](https://img.shields.io/badge/Status-Hackathon_Prototype-blue?style=for-the-badge)](https://github.com/VenkataramanaEmmadoju/QueueSense-AI)

**🌐 Live Application:** https://queue-sense-ai.vercel.app/

**💻 Source Code:** https://github.com/VenkataramanaEmmadoju/QueueSense-AI

---

## 📌 The Problem

For many patients, visiting a crowded public hospital involves much more than receiving medical care.

Patients may travel long distances, wait in unpredictable outpatient queues, struggle to obtain reliable information about available beds, and have limited visibility into the status of their complaints.

Hospital staff and doctors face a different set of challenges: coordinating patient flow, managing queues, monitoring resources, and communicating updates across multiple departments.

### The Core Pain Point

> **The problem is not just long waiting times. It is the lack of visibility, coordination, and accountability throughout the hospital experience.**

Traditional hospital workflows often involve:

- **Unpredictable waiting times:** Patients cannot easily estimate when their consultation will begin.
- **Manual queue management:** Physical queues and fragmented token systems create confusion.
- **Limited bed visibility:** Patients and attendants may struggle to obtain timely information about reported bed availability.
- **Disconnected hospital operations:** Doctors, patients, and administrative staff lack a unified operational view.
- **Poor grievance transparency:** Patients may have difficulty submitting and tracking complaints.
- **Language barriers:** Digital healthcare tools are not always accessible in regional languages.

These challenges can increase patient frustration and administrative workload.

---

## 💡 Our Solution

**QueueSense AI** is a unified digital platform that connects patients, doctors, and hospital staff through role-based interfaces.

The platform demonstrates how hospitals can manage outpatient appointments, digital tokens, queue progress, estimated waiting times, bed availability, and grievances within one accessible system.

Rather than treating appointment booking as an isolated feature, QueueSense AI focuses on the **complete patient journey**, from planning a hospital visit to receiving consultation updates and submitting feedback.

### Our Mission

**Make hospital visits more predictable for patients and hospital operations more manageable for healthcare teams.**

---

## ✨ Key Features

### 👤 Patient Portal

A patient-focused interface for navigating hospital services.

- Hospital and department discovery
- OPD appointment booking
- Digital token generation
- QR-based appointment tokens
- Queue progress tracking
- Estimated consultation waiting times
- Reported hospital bed availability
- CivicCare complaint submission and tracking
- Emergency workflow demonstration
- Multilingual interface

### 👨‍⚕️ Doctor Portal

A dedicated workspace for managing consultation queues.

- View assigned patient queues
- Access queued patient information
- Call the next patient
- Manage consultation progress
- Monitor daily queue activity

### 🏥 Hospital Staff Portal

An operational dashboard for hospital administration.

- Patient registration workflows
- OPD queue coordination
- Bed availability monitoring
- Triage and emergency workflow demonstration
- Hospital operational task management
- CivicCare grievance management
- Centralized visibility into hospital activities

### 🌐 Multilingual Accessibility

QueueSense AI supports three languages:

- **English**
- **తెలుగు — Telugu**
- **हिन्दी — Hindi**

The multilingual experience is designed to make essential healthcare workflows easier to navigate for users with different language preferences.

### 📱 Progressive Web App

QueueSense AI includes Progressive Web App (PWA) configuration, enabling a mobile-friendly experience and supporting installation on compatible devices and browsers.

*Installation behavior and offline capabilities depend on browser support and the deployed PWA configuration.*

---

## 🧠 Where AI Fits In

QueueSense AI is designed around the potential of intelligent hospital queue management.

### AI-Based Queue Forecasting — Planned Enhancement

A future prediction engine could analyze factors such as:

- Number of patients waiting
- Historical consultation durations
- Doctor availability
- Department workload
- Queue progression patterns
- Emergency interruptions

These inputs could support more accurate estimates of consultation waiting times and help hospital teams identify potential bottlenecks.

### Current Prototype Scope

The deployed hackathon prototype demonstrates queue estimates and patient-flow workflows using **synthetic data and simulated application behavior**.

It does **not** currently provide a production-trained AI prediction service or live integration with hospital information systems.

This distinction ensures the demonstration remains transparent about what is implemented and what is planned.

---

## 🏗️ System Architecture

```text
                    ┌─────────────────────┐
                    │      QueueSense AI  │
                    │   React + Vite PWA  │
                    └──────────┬──────────┘
                               │
                 ┌─────────────┼─────────────┐
                 │             │             │
          ┌──────▼──────┐ ┌────▼─────┐ ┌─────▼──────┐
          │   Patient   │ │  Doctor  │ │  Hospital  │
          │   Portal    │ │  Portal  │ │   Staff    │
          └──────┬──────┘ └────┬─────┘ └─────┬──────┘
                 │             │             │
                 └─────────────┼─────────────┘
                               │
                    ┌──────────▼──────────┐
                    │ Shared App Context  │
                    │ Role-Based Workflows│
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │ Synthetic Demo Data │
                    │ Browser LocalStorage│
                    └─────────────────────┘

              Future Integration Architecture
                    ┌─────────────────────┐
                    │ Backend + Database  │
                    │ Live Hospital APIs  │
                    │ AI Queue Prediction │
                    └─────────────────────┘
```

The current implementation is a frontend-driven demonstration. The backend, database, and AI components shown under future integration are not part of the live production workflow.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React |
| Programming Language | TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Application State | React Context |
| Demo Persistence | Browser LocalStorage |
| Mobile Experience | Progressive Web App |
| Deployment | Vercel |
| Version Control | Git and GitHub |
| Planned Backend | Supabase / Backend APIs |
| Planned Intelligence | AI-Based Queue Forecasting |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/VenkataramanaEmmadoju/QueueSense-AI.git
```

### 2. Navigate to the Project

```bash
cd QueueSense-AI
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

Open the local URL displayed in your terminal.

### 5. Create a Production Build

```bash
npm run build
```

### 6. Preview the Production Build

```bash
npm run preview
```

The demo uses local synthetic data and does not require connecting to a live hospital database.

---

## 🎬 Demo Walkthrough

The recommended demonstration follows three user journeys.

**1. Patient Experience**

Open the patient portal, explore hospitals and departments, create an OPD appointment, generate a digital token, and inspect the simulated queue and waiting-time information.

**2. Doctor Experience**

Switch to the doctor portal, inspect the assigned patient queue, and demonstrate how consultation progression can be managed digitally.

**3. Hospital Administration**

Open the staff portal, explore bed management, patient-flow coordination, and CivicCare grievance workflows.

Finish by demonstrating language switching between English, Telugu, and Hindi.

**Try the application:** https://queue-sense-ai.vercel.app/

---

## 🎯 Expected Impact

QueueSense AI aims to improve the hospital experience through better information and coordination.

| Stakeholder | Potential Benefit |
|---|---|
| Patients | Greater visibility into appointments and queue progress |
| Doctors | More structured consultation queue management |
| Hospital Staff | Centralized operational workflows |
| Administrators | Improved visibility into patient-flow bottlenecks |
| Healthcare System | Foundation for data-driven resource planning |

These are intended benefits. Real-world improvements in waiting times, throughput, and patient satisfaction would require hospital pilots and measured evaluation.

---

## 🔮 Future Roadmap

- [x] Patient, doctor, and hospital staff portals
- [x] Digital OPD appointment and token workflows
- [x] QR-based token demonstration
- [x] Simulated queue tracking and waiting-time estimates
- [x] Bed availability dashboard
- [x] CivicCare grievance workflows
- [x] English, Telugu, and Hindi support
- [x] Vercel-hosted frontend prototype
- [ ] Secure backend authentication and role-based access control
- [ ] Real-time database synchronization
- [ ] Integration with participating hospital systems
- [ ] Machine-learning-based waiting-time prediction
- [ ] Real-time notifications and queue alerts
- [ ] Analytics for hospital administrators
- [ ] Pilot deployment and evaluation with healthcare providers

---

## ⚠️ Prototype Disclaimer

QueueSense AI is a **hackathon demonstration and proof of concept**.

The application currently uses synthetic data, simulated workflows, and browser-based storage. Displayed appointments, patient information, bed counts, queue estimates, and emergency scenarios should not be interpreted as real hospital information.

The prototype is not intended for clinical decision-making, emergency dispatch, or operational use in a healthcare facility.

Real-world deployment would require secure authentication, privacy safeguards, reliable backend infrastructure, accessibility testing, integration validation, and appropriate healthcare-sector compliance.

---

## 👨‍💻 Project Developer

**Venkataramana Emmadoju**

Electronics and Communication Engineering | Full-Stack & AI Development

**GitHub:** https://github.com/VenkataramanaEmmadoju

---

## 🌟 Vision

We envision a healthcare experience where patients know what to expect, doctors can focus on consultations, and hospital teams have the information they need to coordinate care effectively.

**Less uncertainty. Better coordination. Smarter healthcare access.**

### QueueSense AI — Smart Hospital Queues, Better Care.

---

**If you find this project interesting, consider giving the repository a ⭐ on GitHub!**
