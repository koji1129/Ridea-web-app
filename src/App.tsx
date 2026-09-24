import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import PasswordResetPage from "./pages/auth/PasswordResetPage";
import UserHomePage from "./pages/user/UserHomePage";
import PickupTodayPage from "./pages/user/PickupTodayPage";
import PickupSelectPage from "./pages/user/PickupSelectPage";
import DestinationSelectPage from "./pages/user/DestinationSelectPage";
import DateTimeSelectPage from "./pages/user/DateTimeSelectPage";
import ReservationConfirmPage from "./pages/user/ReservationConfirmPage";
import ReservationCompletePage from "./pages/user/ReservationCompletePage";
import ReservationListPage from "./pages/user/ReservationListPage";
import ReservationDetailPage from "./pages/user/ReservationDetailPage";
import ReservationMatchingPage from "./pages/user/ReservationMatchingPage";
import ReservationConfirmedPage from "./pages/user/ReservationConfirmedPage";
import CancelReservationPage from "./pages/user/CancelReservationPage";
import DriverLocationPage from "./pages/user/DriverLocationPage";
import ArrivalCompletePage from "./pages/user/ArrivalCompletePage";
import RideCompletePage from "./pages/user/RideCompletePage";
import ReturnSelectPage from "./pages/user/ReturnSelectPage";
import ReturnMatchingPage from "./pages/user/ReturnMatchingPage";
import ReturnConfirmedPage from "./pages/user/ReturnConfirmedPage";
import TaxiSwitchPage from "./pages/user/TaxiSwitchPage";
import EmergencyPage from "./pages/user/EmergencyPage";
import SettingsPage from "./pages/user/SettingsPage";
import ProfileEditPage from "./pages/user/ProfileEditPage";
import TermsPage from "./pages/user/TermsPage";
import PrivacyPage from "./pages/user/PrivacyPage";
import DriverHomePage from "./pages/driver/DriverHomePage";
import DriverAvailabilityPage from "./pages/driver/DriverAvailabilityPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        <Route
          path="/reset-password"
          element={<PasswordResetPage />}
        />

        <Route path="/user/home" element={<UserHomePage />} />
        <Route path="/user/pickup-today" element={<PickupTodayPage />} />
        <Route path="/user/reservation/pickup" element={<PickupSelectPage />} />
        <Route path="/user/reservation/destination" element={<DestinationSelectPage />} />
        <Route path="/user/reservation/datetime" element={<DateTimeSelectPage />} />
        <Route path="/user/reservation/confirm" element={<ReservationConfirmPage />} />
        <Route path="/user/reservation/complete" element={<ReservationCompletePage />} />
        <Route path="/user/reservations" element={<ReservationListPage />} />
        <Route path="/user/reservations/:id" element={<ReservationDetailPage />} />
        <Route path="/user/reservations/:id/matching" element={<ReservationMatchingPage />} />
        <Route path="/user/reservations/:id/confirmed" element={<ReservationConfirmedPage />} />
        <Route path="/user/reservations/:id/cancel" element={<CancelReservationPage />} />
        <Route path="/user/driver-location" element={<DriverLocationPage />} />
        <Route path="/user/arrival-complete" element={<ArrivalCompletePage />} />
        <Route path="/user/ride-complete" element={<RideCompletePage />} />
        <Route path="/user/return" element={<ReturnSelectPage />} />
        <Route path="/user/return/matching" element={<ReturnMatchingPage />} />
        <Route path="/user/return/confirmed" element={<ReturnConfirmedPage />} />
        <Route path="/user/taxi-switch" element={<TaxiSwitchPage />} />
        <Route path="/user/emergency" element={<EmergencyPage />} />
        <Route path="/user/settings" element={<SettingsPage />} />
        <Route path="/user/settings/profile" element={<ProfileEditPage />} />
        <Route path="/user/terms" element={<TermsPage />} />
        <Route path="/user/privacy" element={<PrivacyPage />} />
        <Route path="/driver/home" element={<DriverHomePage />} />
        <Route path="/driver/availability" element={<DriverAvailabilityPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;