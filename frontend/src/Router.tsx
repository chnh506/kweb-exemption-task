import { Navigate, Route, Routes } from "react-router-dom";
import LogInPage from "./pages/LogInPage";
import JoinPage from "./pages/JoinPage";
import StudentMainPage from "./pages/StudentMainPage";
import InstructorMainPage from "./pages/InstructorMainPage";

function Router() {
  const loggedInUserRole: string = "";

  return (
    <Routes>
      {/* 회원가입 및 로그인 라우트 */}
      <Route path="/join" element={<JoinPage />} />
      <Route path="/login" element={<LogInPage />} />

      {/* 학생 메인 페이지 */}
      <Route path="/student/main" element={<StudentMainPage />} />

      {/* 교수자 메인 페이지 */}
      <Route path="/instructor/main" element={<InstructorMainPage />} />

      {/* 로그인한 사용자의 역할에 따라 리다이렉트 */}
      <Route
        path="/"
        element={
          loggedInUserRole === "student" ? (
            <Navigate to="/student/main" />
          ) : loggedInUserRole === "instructor" ? (
            <Navigate to="/instructor/main" />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
}

export default Router;
