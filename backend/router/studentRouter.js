import express from "express";
import Student from "../model/Student.js";
import bcrypt from "bcrypt";

const studentRouter = express.Router();

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

export default studentRouter;
