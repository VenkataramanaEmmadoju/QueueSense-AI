import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthPortal } from './components/auth/AuthPortal';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { PWAInstallBanner } from './components/common/PWAInstallBanner';
import { OfflineBanner } from './components/common/OfflineBanner';
import { PatientHome } from './components/patient/PatientHome';
import { HospitalDiscoveryView } from './components/patient/HospitalDiscoveryView';
import { MyAppointmentsView } from './components/patient/MyAppointmentsView';
import { FamilyProfilesView } from './components/patient/FamilyProfilesView';
import { AppointmentBookingFlow } from './components/patient/AppointmentBookingFlow';
import { LiveQueueTracker } from './components/patient/LiveQueueTracker';
import { BedAvailabilityView } from './components/patient/BedAvailabilityView';
import { EmergencySOSFlow } from './components/patient/EmergencySOSFlow';
import { CivicCareFlow } from './components/patient/CivicCareFlow';
import { PatientProfile } from './components/patient/PatientProfile';
import { DoctorLayout } from './components/doctor/DoctorLayout';
import { StaffLayout } from './components/staff/StaffLayout';

const MainContent: React.FC = () => {
  const { isAuthenticated, userRole, patientTab } = useApp();

  // 1. UNIFIED LOGIN SCREEN: If not authenticated, always display the unified AuthPortal
  if (!isAuthenticated || !userRole) {
    return (
      <div className="min-h-screen bg-navy-50">
        <OfflineBanner />
        <AuthPortal />
      </div>
    );
  }

  // 2. DOCTOR APPLICATION: Dedicated clinical consultation console (/doctor/*)
  if (userRole === 'doctor') {
    return (
      <div className="min-h-screen bg-slate-100">
        <OfflineBanner />
        <DoctorLayout />
      </div>
    );
  }

  // 3. HOSPITAL STAFF APPLICATION: Dedicated operations console (/staff/*)
  if (userRole === 'staff') {
    return (
      <div className="min-h-screen bg-navy-50">
        <OfflineBanner />
        <StaffLayout />
      </div>
    );
  }

  // 4. PATIENT APPLICATION: Mobile-First PWA with Responsive Desktop Layout (/patient/*)
  return (
    <div className="min-h-screen bg-navy-50 flex flex-col">
      <PWAInstallBanner />
      <OfflineBanner />
      <Header />

      {/* Main Patient Content Viewport with Responsive Desktop Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 pt-4 pb-20 md:pb-8">
        {patientTab === 'home' && <PatientHome />}
        {patientTab === 'hospitals' && <HospitalDiscoveryView />}
        {patientTab === 'appointments' && <MyAppointmentsView />}
        {patientTab === 'family' && <FamilyProfilesView />}
        {patientTab === 'booking' && (
          <div className="max-w-2xl mx-auto">
            <AppointmentBookingFlow />
          </div>
        )}
        {patientTab === 'tokens' && (
          <div className="max-w-2xl mx-auto">
            <LiveQueueTracker />
          </div>
        )}
        {patientTab === 'beds' && <BedAvailabilityView />}
        {patientTab === 'civiccare' && (
          <div className="max-w-2xl mx-auto">
            <CivicCareFlow />
          </div>
        )}
        {patientTab === 'profile' && (
          <div className="max-w-2xl mx-auto">
            <PatientProfile />
          </div>
        )}
        {patientTab === 'emergency' && (
          <div className="max-w-2xl mx-auto">
            <EmergencySOSFlow />
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export function App() {
  return (
    <LanguageProvider>
      <AppProvider>
        <MainContent />
      </AppProvider>
    </LanguageProvider>
  );
}

export default App;
