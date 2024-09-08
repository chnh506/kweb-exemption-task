import mongoose from "mongoose";
const { Schema } = mongoose;

const courseApplicationSchema = new Schema({
  courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  studentId: { type: Schema.Types.ObjectId, ref: "Student", required: true },
});

// studentId와 courseId의 조합이 유일하도록 unique index 추가
courseApplicationSchema.index({ studentId: 1, courseId: 1 }, { unique: true });

const CourseApplication = mongoose.model(
  "CourseApplication",
  courseApplicationSchema
);
export default CourseApplication;
