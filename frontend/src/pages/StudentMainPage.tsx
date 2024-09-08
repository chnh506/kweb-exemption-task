import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f8ff;
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
  display: flex;
  justify-content: center;
  flex-wrap: wrap; /* 화면이 좁아지면 링크들이 수직으로 쌓이도록 설정 */
  margin-top: 20px;
  gap: 20px; /* 각 링크 간의 간격을 추가 */
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

const StudentMainPage: React.FC = () => {
  const userName = localStorage.getItem("userName");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");

    alert("로그아웃 되었습니다.");
    navigate("/login"); // 로그아웃 후 로그인 페이지로 리다이렉트
  };

  return (
    <Container>
      <Title>학생 메인 페이지</Title>
      <Message>{userName}님, 환영합니다!</Message>

      <HyperlinkContainer>
        <StyledLink to="/student/courses" state={{ userName }}>
          수강신청 페이지
        </StyledLink>
        <StyledLink to="/student/own-courses" state={{ userName }}>
          수강중인 강의 목록
        </StyledLink>
      </HyperlinkContainer>

      <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
    </Container>
  );
};

export default StudentMainPage;
