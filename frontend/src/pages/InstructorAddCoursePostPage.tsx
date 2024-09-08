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

const ReactQuillContainer = styled.div`
  .ql-editor {
    height: 400px;
    overflow-y: auto; // 에디터에 스크롤 추가
  }
  margin-bottom: 20px;
`;

const InstructorAddCoursePostPage: React.FC = () => {
  const { courseId } = useParams();
  const location = useLocation();
  const { course } = location.state;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "image", "formula"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];
  const reactQuillModules = {
    toolbar: toolbarOptions,
  };

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
        <ReactQuillContainer>
          <ReactQuill
            theme="snow"
            modules={reactQuillModules}
            value={content}
            onChange={setContent}
          />
        </ReactQuillContainer>

        <SubmitButton type="submit">게시물 등록</SubmitButton>
      </FormContainer>
    </Container>
  );
};

export default InstructorAddCoursePostPage;
