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
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const StudentLectureApplicationPage: React.FC = () => {
  // 실제 강의 목록은 서버에서 받아와야 함
  const lectures = ["강의 1", "강의 2", "강의 3"];

  const handleApply = (lecture: string) => {
    // 수강신청 로직 추가
    console.log("수강신청한 강의:", lecture);
  };

  return (
    <Container>
      <Title>수강 신청</Title>
      {lectures.map((lecture) => (
        <LectureItem key={lecture}>
          {lecture}
          <Button onClick={() => handleApply(lecture)}>신청</Button>
        </LectureItem>
      ))}
    </Container>
  );
};

export default StudentLectureApplicationPage;
