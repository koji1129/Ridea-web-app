import { BrowserRouter, Route, Routes } from "react-router-dom";
import DriverRegisterPage from "./pages/driver/register/DriverRegisterPage";
import DriverGuidePage from "./pages/auth/DriverGuidePage";
import DriverRegisterConfirmPage from "./pages/driver/register/DriverRegisterConfirmPage";
import DriverRegisterCompletePage from "./pages/driver/register/DriverRegisterCompletePage";
import DriverReviewPendingPage from "./pages/driver/register/DriverReviewPendingPage";
import DriverReviewApprovedPage from "./pages/driver/register/DriverReviewApprovedPage";
import DriverReviewRejectedPage from "./pages/driver/register/DriverReviewRejectedPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/driver/register"
          element={<DriverRegisterPage />}
        />
        <Route
          path="/driver/guide"
          element={<DriverGuidePage />}
        />
        <Route
          path="/driver/register/confirm"
          element={<DriverRegisterConfirmPage />}
        />
        <Route
          path="/driver/register/complete"
          element={<DriverRegisterCompletePage />}
        />
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;