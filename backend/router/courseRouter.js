import express from "express";
import Course from "../model/Course.js";

const courseRouter = express.Router();

courseRouter.post("/register", async (req, res) => {
  const { instructorId, courseName } = req.body;

  try {
    const newCourse = new Course({ instructorId, courseName });

    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default courseRouter;
