import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  padding: 20px;
  background-color: #f9f9f9;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1.5rem;
`;

const CoursesContainer = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CourseItem = styled.div`
  padding: 15px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CourseName = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
`;

const ApplyButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: gray;
    cursor: not-allowed;
  }
`;

const StudentCourseApplicationPage: React.FC = () => {
  const location = useLocation();
  const { userName } = location.state; // 로그인된 학생의 이름을 state로 받아옴
  const [courses, setCourses] = useState<any[]>([]);
  const [appliedCourses, setAppliedCourses] = useState<string[]>([]);

  useEffect(() => {
    const fetchCoursesAndApplications = async () => {
      try {
        const token = localStorage.getItem("token");
        const studentId = localStorage.getItem("userId");

        // 모든 강의 목록 가져오기
        const coursesResponse = await axios.get(
          "http://localhost:8080/courses",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // 학생이 신청한 강의 목록 가져오기
        const appliedCoursesResponse = await axios.get(
          `http://localhost:8080/student/applied-courses/${studentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCourses(coursesResponse.data.courses);
        setAppliedCourses(appliedCoursesResponse.data.appliedCourseIds); // 신청한 강의 ID 목록을 저장
      } catch (error) {
        console.error("데이터를 가져오는 데 실패했습니다.", error);
      }
    };

    fetchCoursesAndApplications();
  }, []);

  const handleApply = async (courseId: string) => {
    try {
      const token = localStorage.getItem("token");
      const studentId = localStorage.getItem("userId");
      const response = await axios.post(
        "http://localhost:8080/student/course-application",
        { courseId, studentId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        alert("수강 신청이 완료되었습니다.");
        setAppliedCourses((prev) => [...prev, courseId]); // 신청한 강의를 상태로 저장
      }
    } catch (error) {
      console.error("수강 신청 실패:", error);
      alert("수강 신청에 실패했습니다.");
    }
  };

  return (
    <Container>
      <Title>{userName} 님 - 수강신청 페이지</Title>
      <CoursesContainer>
        {courses.length > 0 ? (
          courses.map((course) => (
            <CourseItem key={course._id}>
              <CourseName>{course.courseName}</CourseName>
              <ApplyButton
                onClick={() => handleApply(course._id)}
                disabled={appliedCourses.includes(course._id)}
              >
                {appliedCourses.includes(course._id)
                  ? "신청 완료"
                  : "수강 신청"}
              </ApplyButton>
            </CourseItem>
          ))
        ) : (
          <p>등록된 강의가 없습니다.</p>
        )}
      </CoursesContainer>
    </Container>
  );
};

export default StudentCourseApplicationPage;
