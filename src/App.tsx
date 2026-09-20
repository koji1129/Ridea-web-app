import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import DriverHomePage from "./pages/driver/DriverHomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/driver" replace />}
        />

        <Route
          path="/driver"
          element={<DriverHomePage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;