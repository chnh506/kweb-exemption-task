import express from "express";
import Instructor from "../model/Instructor.js";
import bcrypt from "bcrypt";

const instructorRouter = express.Router();

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

export default instructorRouter;
