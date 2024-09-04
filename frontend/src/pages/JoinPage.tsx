import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// 스타일 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f9f9f9;
  padding: 20px;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  color: #333;
  margin-bottom: 1.5rem;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #555;
  align-self: flex-start;
`;

const Input = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 1rem;
  box-sizing: border-box;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Btn = styled.button`
  width: 100%;
  max-width: 400px;
  padding: 0.75rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const StyledLink = styled(Link)`
  font-size: 0.9rem;
  color: #007bff;
  text-decoration: none;
  margin-top: 1rem;

  &:hover {
    text-decoration: underline;
  }
`;

const RadioContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 400px;
  padding: 0 20px;
  margin-bottom: 1rem;
`;

const RadioLabel = styled.label<{ checked: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48%;
  padding: 0.75rem;
  font-size: 1rem;
  color: ${({ checked }) => (checked ? "#007bff" : "#555")};
  font-weight: ${({ checked }) => (checked ? "bold" : "normal")};
  border: 1px solid ${({ checked }) => (checked ? "#007bff" : "#ccc")};
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  transition:
    border-color 0.3s ease,
    color 0.3s ease;

  &:hover {
    border-color: #007bff;
  }
`;

const HiddenRadioInput = styled.input`
  display: none;
`;

// JoinPage 컴포넌트
function JoinPage() {
  const [role, setRole] = useState("student");

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRole(e.target.value);
  };

  return (
    <Container>
      <Title>회원가입</Title>
      <FormContainer>
        <Label htmlFor="id">아이디</Label>
        <Input type="text" id="id" placeholder="아이디" />

        <Label htmlFor="password">비밀번호</Label>
        <Input type="password" id="password" placeholder="비밀번호" />

        <Label htmlFor="name">이름</Label>
        <Input type="text" id="name" placeholder="이름" />

        <Label htmlFor="memberNumber">학번</Label>
        <Input type="text" id="memberNumber" placeholder="학번" />

        <Label>학생/교수자 역할 선택</Label>
        <RadioContainer>
          <RadioLabel checked={role === "student"}>
            <HiddenRadioInput
              type="radio"
              name="role"
              value="student"
              checked={role === "student"}
              onChange={handleRoleChange}
            />
            학생
          </RadioLabel>
          <RadioLabel checked={role === "instructor"}>
            <HiddenRadioInput
              type="radio"
              name="role"
              value="instructor"
              checked={role === "instructor"}
              onChange={handleRoleChange}
            />
            교수자
          </RadioLabel>
        </RadioContainer>

        <Btn type="submit">가입</Btn>
        <StyledLink to="/login">이미 계정이 있으신가요? 로그인하기</StyledLink>
      </FormContainer>
    </Container>
  );
}

export default JoinPage;
