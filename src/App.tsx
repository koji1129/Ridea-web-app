import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import PasswordResetPage from "./pages/auth/PasswordResetPage";
import DriverGuidePage from "./pages/auth/DriverGuidePage";

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
import DriverRegisterPage from "./pages/driver/register/DriverRegisterPage";
import DriverRegisterConfirmPage from "./pages/driver/register/DriverRegisterConfirmPage";
import DriverRegisterCompletePage from "./pages/driver/register/DriverRegisterCompletePage";
import DriverReviewPendingPage from "./pages/driver/register/DriverReviewPendingPage";
import DriverReviewApprovedPage from "./pages/driver/register/DriverReviewApprovedPage";
import DriverReviewRejectedPage from "./pages/driver/register/DriverReviewRejectedPage";
import DriverSchedulePage from "./pages/driver/schedule/DriverSchedulePage";
import DriverOperationListPage from "./pages/driver/operation/DriverOperationListPage";
import DriverOperationDetailPage from "./pages/driver/operation/DriverOperationDetailPage";
import DriverActiveOperationPage from "./pages/driver/operation/DriverActiveOperationPage";
import DriverRevenuePage from "./pages/driver/revenue/DriverRevenuePage";
import DriverMyPage from "./pages/driver/mypage/DriverMyPage";
import DriverProfileEditPage from "./pages/driver/mypage/DriverProfileEditPage";
import DriverLicensePage from "./pages/driver/mypage/DriverLicensePage";
import DriverLicenseEditPage from "./pages/driver/mypage/DriverLicenseEditPage";
import DriverSettingsPage from "./pages/driver/settings/DriverSettingsPage";
import DriverNotificationsPage from "./pages/driver/notifications/DriverNotificationsPage";
import DriverNotificationDetailPage from "./pages/driver/notifications/DriverNotificationDetailPage";
import DriverHelpPage from "./pages/driver/help/DriverHelpPage";
import DriverTroublePage from "./pages/driver/trouble/DriverTroublePage";
import DriverUnavailablePage from "./pages/driver/trouble/DriverUnavailablePage";
import DriverPassengerAbsentPage from "./pages/driver/trouble/DriverPassengerAbsentPage";
import DriverContactTroublePage from "./pages/driver/trouble/DriverContactTroublePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 共通・利用者 */}
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset-password" element={<PasswordResetPage />} />

        <Route path="/user/home" element={<UserHomePage />} />
        <Route path="/user/pickup-today" element={<PickupTodayPage />} />
        <Route path="/user/reservation/pickup" element={<PickupSelectPage />} />
        <Route
          path="/user/reservation/destination"
          element={<DestinationSelectPage />}
        />
        <Route
          path="/user/reservation/datetime"
          element={<DateTimeSelectPage />}
        />
        <Route
          path="/user/reservation/confirm"
          element={<ReservationConfirmPage />}
        />
        <Route
          path="/user/reservation/complete"
          element={<ReservationCompletePage />}
        />

        <Route path="/user/reservations" element={<ReservationListPage />} />
        <Route
          path="/user/reservations/:id"
          element={<ReservationDetailPage />}
        />
        <Route
          path="/user/reservations/:id/matching"
          element={<ReservationMatchingPage />}
        />
        <Route
          path="/user/reservations/:id/confirmed"
          element={<ReservationConfirmedPage />}
        />
        <Route
          path="/user/reservations/:id/cancel"
          element={<CancelReservationPage />}
        />

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

        <Route path="/driver/guide" element={<DriverGuidePage />} />
        <Route path="/driver/register" element={<DriverRegisterPage />} />
        <Route
          path="/driver/register/confirm"
          element={<DriverRegisterConfirmPage />}
        />
        <Route
          path="/driver/register/complete"
          element={<DriverRegisterCompletePage />}
        />
        <Route path="/driver/review" element={<DriverReviewPendingPage />} />
        <Route
          path="/driver/review/approved"
          element={<DriverReviewApprovedPage />}
        />
        <Route
          path="/driver/review/rejected"
          element={<DriverReviewRejectedPage />}
        />

        {/* ドライバー */}
        <Route path="/driver" element={<DriverHomePage />} />
        <Route path="/driver/schedule" element={<DriverSchedulePage />} />

        <Route
          path="/driver/operations"
          element={<DriverOperationListPage />}
        />
        <Route
          path="/driver/operations/:id"
          element={<DriverOperationDetailPage />}
        />
        <Route
          path="/driver/operations/:id/active"
          element={<DriverActiveOperationPage />}
        />

        <Route path="/driver/revenue" element={<DriverRevenuePage />} />

        <Route path="/driver/mypage" element={<DriverMyPage />} />
        <Route
          path="/driver/mypage/profile"
          element={<DriverProfileEditPage />}
        />
        <Route path="/driver/mypage/license" element={<DriverLicensePage />} />
        <Route
          path="/driver/mypage/license/edit"
          element={<DriverLicenseEditPage />}
        />

        <Route path="/driver/settings" element={<DriverSettingsPage />} />

        <Route
          path="/driver/notifications"
          element={<DriverNotificationsPage />}
        />
        <Route
          path="/driver/notifications/:id"
          element={<DriverNotificationDetailPage />}
        />

        <Route path="/driver/help" element={<DriverHelpPage />} />

        <Route path="/driver/trouble" element={<DriverTroublePage />} />
        <Route
          path="/driver/trouble/unavailable"
          element={<DriverUnavailablePage />}
        />
        <Route
          path="/driver/trouble/passenger-absent"
          element={<DriverPassengerAbsentPage />}
        />
        <Route
          path="/driver/trouble/contact"
          element={<DriverContactTroublePage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;