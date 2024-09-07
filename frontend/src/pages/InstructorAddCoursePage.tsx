import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const FormContainer = styled.form`
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: bold;
  color: #555;
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
  width: 100%;
  padding: 10px;
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

const InstructorAddCoursePage: React.FC = () => {
  const [courseName, setCourseName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8080/instructor/add-course",
        { courseName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("새 강의가 등록되었습니다.");
      navigate("/instructor/courses"); // 강의 관리 페이지로 이동
    } catch (error) {
      console.error("강의 등록 실패:", error);
      alert("강의 등록에 실패했습니다.");
    }
  };

  return (
    <Container>
      <Title>새 강의 등록</Title>
      <FormContainer onSubmit={handleSubmit}>
        <Label htmlFor="courseName">강의명</Label>
        <Input
          type="text"
          id="courseName"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          required
          placeholder="강의명을 입력하세요"
        />
        <SubmitButton type="submit">등록</SubmitButton>
      </FormContainer>
    </Container>
  );
};

export default InstructorAddCoursePage;
