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

const StudentViewOwnLecturePage: React.FC = () => {
  // 실제 수강신청한 강의 목록은 서버에서 받아와야 함
  const myLectures = ["수강 강의 1", "수강 강의 2"];

  return (
    <Container>
      <Title>내 수강 강의</Title>
      {myLectures.map((lecture) => (
        <LectureItem key={lecture}>{lecture}</LectureItem>
      ))}
    </Container>
  );
};

export default StudentViewOwnLecturePage;
