import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

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

const PostsContainer = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PostItem = styled.div`
  padding: 15px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #ddd;
`;

const PostTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 10px;
`;

const PostContent = styled.p`
  font-size: 1.1rem;
  color: #555;
`;

const NoPostsMessage = styled.p`
  font-size: 1.2rem;
  color: #777;
  text-align: center;
`;

interface CoursePost {
  _id: string;
  title: string;
  content: string;
  courseId: string;
}

const StudentViewOwnCoursePostsPage: React.FC = () => {
  const location = useLocation();
  const { courseName } = location.state;
  const { courseId } = useParams();
  const [coursePosts, setCoursePosts] = useState<CoursePost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `http://localhost:8080/student/own-courses/${courseId}/posts`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCoursePosts(response.data.coursePosts); // 서버에서 받아온 게시물 목록 저장
      } catch (error) {
        console.error("게시물 목록을 가져오는 데 실패했습니다:", error);
      }
    };

    fetchPosts();
  }, [courseId]);

  return (
    <Container>
      <Title>{courseName} - 게시물 목록</Title>
      <PostsContainer>
        {coursePosts.length > 0 ? (
          coursePosts.map((post) => (
            <PostItem key={post._id}>
              <PostTitle>{post.title}</PostTitle>
              <PostContent>{post.content}</PostContent>
            </PostItem>
          ))
        ) : (
          <NoPostsMessage>등록된 게시물이 없습니다.</NoPostsMessage>
        )}
      </PostsContainer>
    </Container>
  );
};

export default StudentViewOwnCoursePostsPage;
