import { Route, Routes } from "react-router-dom";
import LogInPage from "./pages/LogInPage";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<LogInPage />} />
    </Routes>
  );
}

export default Router;
