import React, { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

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

const PostContainer = styled.div`
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

const AddPostButton = styled(Link)`
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

const InstructorCoursePostsPage: React.FC = () => {
  const { courseId } = useParams();
  const location = useLocation();
  const { course } = location.state;
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    // 서버에서 해당 강의의 게시물 목록 가져오기
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8080/instructor/courses/${courseId}/posts`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPosts(response.data.posts); // 서버에서 받아온 게시물 목록 저장
      } catch (error) {
        console.error("게시물을 가져오는 데 실패했습니다:", error);
      }
    };

    fetchPosts();
  }, [courseId]);

  return (
    <Container>
      <Title>{course.courseName} - 게시물 목록</Title>

      <PostContainer>
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <PostItem key={index}>
              <PostTitle>{post.title}</PostTitle>
              <PostContent>{post.content}</PostContent>
            </PostItem>
          ))
        ) : (
          <NoPostsMessage>등록된 게시물이 없습니다.</NoPostsMessage>
        )}
      </PostContainer>

      <AddPostButton
        to={`/instructor/courses/${courseId}/add-post`}
        state={{ course }}
      >
        게시물 작성
      </AddPostButton>
    </Container>
  );
};

export default InstructorCoursePostsPage;
