import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const PostItem = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const StudentViewOwnLecturePostPage: React.FC = () => {
  // 실제 게시물 목록은 서버에서 받아와야 함
  const posts = ["게시물 1", "게시물 2", "게시물 3"];

  return (
    <Container>
      <Title>게시물 목록</Title>
      {posts.map((post) => (
        <PostItem key={post}>{post}</PostItem>
      ))}
    </Container>
  );
};

export default StudentViewOwnLecturePostPage;
