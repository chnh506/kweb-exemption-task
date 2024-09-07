import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
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
  text-align: center;
`;

const FormContainer = styled.form`
  width: 100%;
  max-width: 800px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 1rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1.2rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const InstructorAddCoursePostPage: React.FC = () => {
  const { courseId } = useParams();
  const location = useLocation();
  const { course } = location.state;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:8080/instructor/courses/${courseId}/add-post`,
        {
          title,
          content,
          course,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        alert("게시물이 성공적으로 등록되었습니다.");
        setTitle("");
        setContent("");
        navigate(`/instructor/courses/${courseId}/posts`, {
          state: { course },
        });
      }
    } catch (error) {
      console.error("게시물 등록 실패:", error);
      alert("게시물 등록에 실패했습니다.");
    }
  };

  return (
    <Container>
      <Title>{course.courseName} - 새 게시물 작성</Title>
      <FormContainer onSubmit={handleSubmit}>
        <Label htmlFor="title">게시물 제목</Label>
        <Input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="게시물 제목을 입력하세요"
          required
        />

        <Label htmlFor="content">게시물 내용</Label>
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          style={{ height: "200px", marginBottom: "20px" }}
        />

        <SubmitButton type="submit">게시물 등록</SubmitButton>
      </FormContainer>
    </Container>
  );
};

export default InstructorAddCoursePostPage;
