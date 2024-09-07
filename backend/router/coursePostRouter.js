import express from "express";
import CoursePost from "../model/CoursePost.js";

const coursePostRouter = express.Router();

coursePostRouter.post("/register", async (req, res) => {
  const { courseId, title, content } = req.body;

  try {
    const newPost = new CoursePost({ courseId, title, content });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default coursePostRouter;
