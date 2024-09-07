import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

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
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");
  const [_, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleMemberIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemberId(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post("http://localhost:8080/login", {
        memberId: memberId,
        password: password,
      });
      console.log(response);

      // 서버에서 받은 정보를 로컬 스토리지에 저장
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.user._id);
      localStorage.setItem("userName", response.data.user.name);
      localStorage.setItem("userRole", response.data.user.role);

      alert("로그인 성공");

      // 역할에 따라 다른 페이지로 리다이렉트
      if (response.data.user.role === "student") {
        navigate("/student/main");
      } else {
        navigate("/instructor/main");
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <Title>로그인</Title>
      <FormContainer onSubmit={handleSubmit}>
        <Label htmlFor="id">아이디</Label>
        <Input
          type="text"
          id="memberId"
          value={memberId}
          onChange={handleMemberIdChange}
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
