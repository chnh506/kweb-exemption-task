import { Route, Routes } from "react-router-dom";
import LogInPage from "./pages/LogInPage";
import JoinPage from "./pages/JoinPage";

function Router() {
  return (
    <Routes>
      <Route path="/login" element={<LogInPage />} />
      <Route path="/join" element={<JoinPage />} />
    </Routes>
  );
}

export default Router;
