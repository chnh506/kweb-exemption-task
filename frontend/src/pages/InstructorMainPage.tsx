import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

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

const Message = styled.p`
  font-size: 1.2rem;
  color: #555;
  text-align: center;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  margin-top: 1.5rem;
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

const HyperlinkContainer = styled.div`
  margin-top: 20px;
`;

const LogoutButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d93636;
  }
`;

const InstructorMainPage: React.FC = () => {
  const userName = localStorage.getItem("userName");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");

    alert("로그아웃 되었습니다.");
    navigate("/login");
  };

  return (
    <Container>
      <Title>교수자 메인 페이지</Title>
      <Message>{userName}님, 환영합니다!</Message>

      <HyperlinkContainer>
        <StyledLink to="/instructor/courses">강의 관리 페이지</StyledLink>
      </HyperlinkContainer>

      <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
    </Container>
  );
};

export default InstructorMainPage;
