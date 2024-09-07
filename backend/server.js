import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import studentRouter from "./router/studentRouter.js";
import instructorRouter from "./router/instructorRouter.js";
import courseRouter from "./router/courseRouter.js";
import coursePostRouter from "./router/coursePostRouter.js";
import Student from "./model/Student.js";
import Instructor from "./model/Instructor.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
); // frontend domain에 대해서만 cors 허용 설정
app.use(express.json());

// mongoDB 연결
const mongoURI = process.env.MONGO_URI;
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB 연결 성공"))
  .catch((err) => console.error("MongoDB 연결 실패:", err));

// login 라우트
app.post("/login", async (req, res) => {
  const { memberId, password } = req.body;

  try {
    // 학생 테이블에서 먼저 사용자를 찾음
    let user = await Student.findOne({ memberId });
    let userRole = "student";

    // 학생 테이블에서 찾지 못했으면 교수자 테이블에서 찾기
    if (!user) {
      user = await Instructor.findOne({ memberId });
      userRole = "instructor";
    }

    if (!user) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    // 비밀번호 확인
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "비밀번호가 일치하지 않습니다." });
    }

    // JWT 토큰 생성
    const token = jwt.sign(
      { id: user._id, role: userRole },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        role: userRole,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "서버 오류", error });
  }
});

// router 설정
app.use("/student", studentRouter);
app.use("/instructor", instructorRouter);
app.use("/course", courseRouter);
app.use("/coursePost", coursePostRouter);

// 서버 시작
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`서버가 ${PORT} 포트에서 실행 중입니다.`);
});
