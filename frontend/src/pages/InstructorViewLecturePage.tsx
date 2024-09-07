import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const LectureItem = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const InstructorViewLecturePage: React.FC = () => {
  // 실제 강의 목록은 서버에서 받아와야 함
  const lectures = ["강의 1", "강의 2", "강의 3"];

  return (
    <Container>
      <Title>내 강의 목록</Title>
      {lectures.map((lecture) => (
        <LectureItem key={lecture}>{lecture}</LectureItem>
      ))}
    </Container>
  );
};

export default InstructorViewLecturePage;
