import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import DriverGuidePage from "./pages/auth/DriverGuidePage";

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
        {/* ドライバー登録 */}
        <Route
          path="/driver/guide"
          element={<DriverGuidePage />}
        />

        <Route
          path="/driver/register"
          element={<DriverRegisterPage />}
        />

        <Route
          path="/driver/register/confirm"
          element={<DriverRegisterConfirmPage />}
        />

        <Route
          path="/driver/register/complete"
          element={<DriverRegisterCompletePage />}
        />

        {/* ドライバー審査 */}
        <Route
          path="/driver/review"
          element={<DriverReviewPendingPage />}
        />

        <Route
          path="/driver/review/approved"
          element={<DriverReviewApprovedPage />}
        />

        <Route
          path="/driver/review/rejected"
          element={<DriverReviewRejectedPage />}
        />

        {/* ドライバーホーム */}
        <Route
          path="/driver"
          element={<DriverHomePage />}
        />

        {/* シフト */}
        <Route
          path="/driver/schedule"
          element={<DriverSchedulePage />}
        />

        {/* 運行 */}
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

        {/* 収益 */}
        <Route
          path="/driver/revenue"
          element={<DriverRevenuePage />}
        />

        {/* マイページ */}
        <Route
          path="/driver/mypage"
          element={<DriverMyPage />}
        />

        <Route
          path="/driver/mypage/profile"
          element={<DriverProfileEditPage />}
        />

        <Route
          path="/driver/mypage/license"
          element={<DriverLicensePage />}
        />

        <Route
          path="/driver/mypage/license/edit"
          element={<DriverLicenseEditPage />}
        />

        {/* 設定 */}
        <Route
          path="/driver/settings"
          element={<DriverSettingsPage />}
        />

        {/* 通知 */}
        <Route
          path="/driver/notifications"
          element={<DriverNotificationsPage />}
        />

        <Route
          path="/driver/notifications/:id"
          element={<DriverNotificationDetailPage />}
        />

        {/* ヘルプ */}
        <Route
          path="/driver/help"
          element={<DriverHelpPage />}
        />

        {/* トラブル対応 */}
        <Route
          path="/driver/trouble"
          element={<DriverTroublePage />}
        />

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