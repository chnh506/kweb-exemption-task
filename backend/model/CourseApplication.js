import mongoose from "mongoose";
const { Schema } = mongoose;

const courseApplicationSchema = new Schema({
  courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  studentId: { type: Schema.Types.ObjectId, ref: "Student", required: true },
});

const CourseApplication = mongoose.model(
  "CourseApplication",
  courseApplicationSchema
);
export default CourseApplication;
