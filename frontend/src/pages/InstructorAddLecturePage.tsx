import React, { useState } from "react";
import styled from "styled-components";

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

const InstructorAddLecturePage: React.FC = () => {
  const [lectureName, setLectureName] = useState("");

  const handleSubmit = () => {
    // 강의 등록 로직 추가
    console.log("강의가 등록되었습니다:", lectureName);
  };

  return (
    <Container>
      <Title>강의 등록</Title>
      <Input
        type="text"
        value={lectureName}
        onChange={(e) => setLectureName(e.target.value)}
        placeholder="강의 이름"
      />
      <Button onClick={handleSubmit}>등록</Button>
    </Container>
  );
};

export default InstructorAddLecturePage;
