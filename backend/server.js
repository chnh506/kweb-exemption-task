import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import studentRouter from "./router/studentRouter";
import instructorRouter from "./router/instructorRouter";
import courseRouter from "./router/courseRouter";
import coursePostRouter from "./router/coursePostRouter";

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
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB 연결 성공"))
  .catch((err) => console.error("MongoDB 연결 실패:", err));

// router 설정
app.use("/student", studentRouter);
app.use("/instructor", instructorRouter);
app.use("/course", courseRouter);
app.use("/coursePost", coursePostRouter);

// 서버 시작
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`서버가 ${PORT} 포트에서 실행 중입니다.`);
});
