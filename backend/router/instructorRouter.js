import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Instructor from "../model/Instructor.js";
import Course from "../model/Course.js";

const instructorRouter = express.Router();

// 교수자 회원가입
instructorRouter.post("/register", async (req, res) => {
  const { memberId, password, name, memberNumber } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newInstructor = new Instructor({
      memberId,
      password: hashedPassword,
      name,
      memberNumber,
    });

    await newInstructor.save();
    res.status(201).json(newInstructor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 강의 목록 조회
instructorRouter.get("/courses", async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // 'Bearer TOKEN' 형태에서 토큰 추출

  if (!token) {
    return res.status(401).json({ message: "인증 토큰이 없습니다." });
  }

  try {
    // JWT 토큰 검증
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 토큰이 유효하면, 교수자의 강의 목록을 조회
    const courses = await Course.find({ instructorId: decoded.id });
    res.json({ courses: courses.map((course) => course.courseName) });
  } catch (error) {
    res.status(403).json({ message: "유효하지 않은 토큰입니다." });
  }
});

// 새 강의 등록
instructorRouter.post("/add-course", async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "인증 토큰이 없습니다." });
  }

  try {
    // JWT 토큰 검증
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { courseName } = req.body;
    if (!courseName) {
      return res.status(400).json({ message: "강의명을 입력해야 합니다." });
    }

    // 새 강의 생성
    const newCourse = new Course({
      courseName,
      instructorId: decoded.id,
    });

    await newCourse.save();
    res.status(201).json({ message: "새 강의가 등록되었습니다." });
  } catch (error) {
    res.status(403).json({ message: "유효하지 않은 토큰입니다." });
  }
});

export default instructorRouter;
