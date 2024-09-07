import mongoose from "mongoose";
const { Schema } = mongoose;

const coursePostSchema = new Schema({
  courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
});

const CoursePost = mongoose.model("CoursePost", coursePostSchema);
export default CoursePost;
