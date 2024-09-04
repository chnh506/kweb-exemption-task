//test.js
import express from "express";

const testRouter = express.Router();

testRouter.get("/", (req, res) => {
  res.send("hi");
});

export default testRouter;
