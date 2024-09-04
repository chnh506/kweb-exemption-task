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

// LogInPage 컴포넌트
function LogInPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 로그인 로직을 추가할 수 있습니다.
    console.log("Id:", id);
    console.log("Password:", password);
  };

  return (
    <Container>
      <Title>로그인</Title>
      <FormContainer onSubmit={handleSubmit}>
        <Label htmlFor="id">아이디</Label>
        <Input
          type="text"
          id="id"
          value={id}
          onChange={handleIdChange}
          placeholder="아이디"
        />

        <Label htmlFor="password">비밀번호</Label>
        <Input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="비밀번호"
        />

        <Btn type="submit">로그인</Btn>
        <StyledLink to="/join">계정이 없으신가요? 회원가입</StyledLink>
      </FormContainer>
    </Container>
  );
}

export default LogInPage;
