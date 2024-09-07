import mongoose from "mongoose";
const { Schema } = mongoose;

const courseSchema = new Schema({
  instructorId: {
    type: Schema.Types.ObjectId,
    ref: "Instructor",
    required: true,
  },
  courseName: { type: String, required: true },
});

const Course = mongoose.model("Course", courseSchema);
export default Course;
