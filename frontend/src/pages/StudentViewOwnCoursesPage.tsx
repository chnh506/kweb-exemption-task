import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

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

const ViewPostsButton = styled(Link)`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const NoCoursesMessage = styled.p`
  font-size: 1.2rem;
  color: #777;
  text-align: center;
`;

const StudentViewOwnCoursesPage: React.FC = () => {
  const location = useLocation();
  const { userName } = location.state;
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    // 서버에서 학생이 신청한 강의 목록 가져오기
    const fetchAppliedCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const studentId = localStorage.getItem("userId");

        const response = await axios.get(
          `http://localhost:8080/student/applied-courses/${studentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCourses(response.data.appliedCourses); // 수강 신청한 강의 목록 저장
      } catch (error) {
        console.error("강의 목록을 가져오는 데 실패했습니다:", error);
      }
    };

    fetchAppliedCourses();
  }, []);

  return (
    <Container>
      <Title>{userName} 님 - 수강신청된 강의 목록</Title>
      <CoursesContainer>
        {courses.length > 0 ? (
          courses.map((course) => (
            <CourseItem key={course._id}>
              <CourseName>{course.courseName}</CourseName>
              <ViewPostsButton to={`/student/courses/${course._id}/posts`}>
                게시물 보기
              </ViewPostsButton>
            </CourseItem>
          ))
        ) : (
          <NoCoursesMessage>수강신청한 강의가 없습니다.</NoCoursesMessage>
        )}
      </CoursesContainer>
    </Container>
  );
};

export default StudentViewOwnCoursesPage;
