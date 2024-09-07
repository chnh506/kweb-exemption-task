import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Instructor from "../model/Instructor.js";
import Course from "../model/Course.js";
import CoursePost from "../model/CoursePost.js";

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
    res.json({ courses });
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

// 특정 강의의 게시물 목록 조회
instructorRouter.get("/courses/:courseId/posts", async (req, res) => {
  const { courseId } = req.params;

  try {
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "강의를 찾을 수 없습니다." });
    }

    // 해당 강의에 대한 게시물 목록을 가져옵니다
    const posts = await CoursePost.find({ courseId }).sort({ createdAt: -1 }); // 최신 게시물 순서로 정렬

    res.status(200).json({ posts });
  } catch (error) {
    console.error("게시물 목록 조회 오류:", error);
    res
      .status(500)
      .json({ message: "게시물 목록을 조회하는 데 실패했습니다." });
  }
});

// 특정 강의의 새로운 게시물 작성
instructorRouter.post("/courses/:courseId/add-post", async (req, res) => {
  const { courseId } = req.params;
  let instructorId;
  const { title, content, course } = req.body;

  // 제목 or 내용이 비어있을 경우
  if (!title || !content) {
    return res.status(400).json({ message: "제목과 내용을 입력해야 합니다." });
  }

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // 'Bearer TOKEN' 형태에서 토큰 추출

  if (!token) {
    return res.status(401).json({ message: "인증 토큰이 없습니다." });
  }

  try {
    // JWT 토큰 검증
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    instructorId = decoded.id;
  } catch (error) {
    res.status(403).json({ message: "유효하지 않은 토큰입니다." });
  }

  try {
    // 로그인되어있는 교수자가 강의 담당 교수자인 경우만 게시물 등록 가능
    if (course.instructorId === instructorId) {
      const newCoursePost = new CoursePost({
        courseId,
        title,
        content,
      });

      await newCoursePost.save();
      res.status(201).json({ message: "게시물이 성공적으로 등록되었습니다." });
    } else {
      res
        .status(401)
        .json({ message: "강의 담당 교수자만 게시물을 등록할 수 있습니다." });
    }
  } catch (error) {
    res.status(500).json({ message: "게시물 등록 실패", error });
  }
});

export default instructorRouter;
