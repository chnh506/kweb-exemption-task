import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 2rem;
`;

const CoursesContainer = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CourseItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-size: 1.2rem;
  color: #333;
  border: 1px solid #ddd;
`;

const CourseName = styled.div`
  font-weight: bold;
`;

const ViewPostsButton = styled(Link)`
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const AddCourseButton = styled(Link)`
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

interface ICourse {
  _id: string;
  instructorId: string;
  courseName: string;
  __v: number;
}

const InstructorCoursesPage: React.FC = () => {
  const userName = localStorage.getItem("userName");
  const [courses, setCourses] = useState<ICourse[]>([]);

  useEffect(() => {
    // 현재 교수자의 강의 목록을 가져오는 API 요청
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8080/instructor/courses",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCourses(response.data.courses); // 서버에서 받아온 강의 목록 저장
      } catch (error) {
        console.error("강의 목록을 가져오는데 실패했습니다:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <Container>
      <Title>{userName} 님의 강의 목록</Title>
      <CoursesContainer>
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <CourseItem key={index}>
              <CourseName>{course.courseName}</CourseName>
              <ViewPostsButton
                to={`/instructor/courses/${course._id}/posts`}
                state={{ course }}
              >
                강의 게시물 관리
              </ViewPostsButton>
            </CourseItem>
          ))
        ) : (
          <p>등록된 강의가 없습니다.</p>
        )}
      </CoursesContainer>

      <AddCourseButton to="/instructor/add-course">
        새 강의 등록
      </AddCourseButton>
    </Container>
  );
};

export default InstructorCoursesPage;
