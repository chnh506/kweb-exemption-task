import express from "express";
import jwt from "jsonwebtoken";
import Course from "../model/Course.js";

const courseRouter = express.Router();

// 모든 강의 목록 조회
courseRouter.get("/", async (req, res) => {
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

  try {
    const courses = await Course.find();
    res.status(200).json({ courses });
  } catch (error) {
    console.error("강의 목록 조회 실패:", error);
    res.status(500).json({ message: "강의 목록을 가져오는 데 실패했습니다." });
  }
});

export default courseRouter;
