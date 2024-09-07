import React, { useState } from "react";
import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  width: 150px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const InstructorAddLecturePostPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    // 게시물 작성 로직 추가
    console.log("게시물이 작성되었습니다:", { title, content });
  };

  return (
    <Container>
      <Title>게시물 작성</Title>
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="게시물 제목"
      />
      <ReactQuill theme="snow" value={content} onChange={setContent} />
      <Button onClick={handleSubmit}>작성</Button>
    </Container>
  );
};

export default InstructorAddLecturePostPage;
