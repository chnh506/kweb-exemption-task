import { Navigate, Route, Routes } from "react-router-dom";
import LogInPage from "./pages/LogInPage";
import JoinPage from "./pages/JoinPage";

import StudentMainPage from "./pages/StudentMainPage";
import StudentLectureApplicationPage from "./pages/StudentLectureApplicationPage";
import StudentViewOwnLecturePage from "./pages/StudentViewOwnLecturePage";
import StudentViewOwnLecturePostPage from "./pages/StudentViewOwnLecturePostPage";

import InstructorMainPage from "./pages/InstructorMainPage";
import InstructorAddLecturePage from "./pages/InstructorAddLecturePage";
import InstructorAddLecturePostPage from "./pages/InstructorAddLecturePostPage";
import InstructorViewLecturePage from "./pages/InstructorViewLecturePage";

function Router() {
  const loggedInUserRole: string = "";

  return (
    <Routes>
      {/* 회원가입 및 로그인 라우트 */}
      <Route path="/join" element={<JoinPage />} />
      <Route path="/login" element={<LogInPage />} />
      {/* 학생 대상 페이지 라우트 */}
      <Route path="/student/main" element={<StudentMainPage />} />
      <Route
        path="/student/application"
        element={<StudentLectureApplicationPage />}
      />
      <Route path="/student/lectures" element={<StudentViewOwnLecturePage />} />
      {/** 학생 번호(아이디)를 변수로 하는 url */}
      <Route
        path="/student/lectures/posts"
        element={<StudentViewOwnLecturePostPage />}
      />

      {/* 교수자 관련 페이지 라우트 */}
      <Route path="/instructor/main" element={<InstructorMainPage />} />
      <Route
        path="/instructor/add-lecture"
        element={<InstructorAddLecturePage />}
      />
      <Route
        path="/instructor/add-lecture-post"
        element={<InstructorAddLecturePostPage />}
      />
      <Route
        path="/instructor/view-lectures"
        element={<InstructorViewLecturePage />}
      />

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
