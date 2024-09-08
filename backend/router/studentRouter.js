import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Student from "../model/Student.js";
import CourseApplication from "../model/CourseApplication.js";

const studentRouter = express.Router();

// 학생 회원가입
studentRouter.post("/register", async (req, res) => {
  const { memberId, password, name, memberNumber } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newStudent = new Student({
      memberId,
      password: hashedPassword,
      name,
      memberNumber,
    });

    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 신규 수강신청
studentRouter.post("/course-application", async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "인증이 필요합니다." });
  }

  // JWT 토큰 검증
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "유효하지 않은 토큰입니다." });
    }

    req.user = user; // 토큰에서 가져온 사용자 정보
  });

  const { courseId, studentId } = req.body;

  try {
    // 이미 수강 신청한 경우 확인
    const existingApplication = await CourseApplication.findOne({
      courseId,
      studentId,
    });
    if (existingApplication) {
      return res.status(400).json({ message: "이미 신청한 강의입니다." });
    }

    // 새로운 수강 신청 추가
    const newApplication = new CourseApplication({
      courseId,
      studentId,
    });

    await newApplication.save();
    res.status(201).json({ message: "수강 신청이 완료되었습니다." });
  } catch (error) {
    console.error("수강 신청 실패:", error);
    res.status(500).json({ message: "수강 신청에 실패했습니다." });
  }
});

// 이미 신청한 강의 목록 조회
studentRouter.get("/applied-courses/:studentId", async (req, res) => {
  const { studentId } = req.params;

  try {
    const appliedCourses = await CourseApplication.find({ studentId }).populate(
      "courseId"
    );
    const courseIds = appliedCourses.map((app) => app.courseId._id); // 학생이 신청한 강의 ID 목록 반환
    res.status(200).json({ appliedCourseIds: courseIds });
  } catch (error) {
    console.error("신청한 강의 목록 조회 실패:", error);
    res
      .status(500)
      .json({ message: "신청한 강의 목록을 조회하는 데 실패했습니다." });
  }
});

export default studentRouter;
