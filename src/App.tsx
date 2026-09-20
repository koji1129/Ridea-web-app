import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 最初にアクセスしたらログインへ */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        {/* ログイン */}
        <Route
          path="/login"
          element={<LoginPage />}
        />

        {/* 新規登録 */}
        <Route
          path="/register"
          element={<RegisterPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;