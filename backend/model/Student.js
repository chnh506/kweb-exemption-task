import mongoose from "mongoose";
const { Schema } = mongoose;

const studentSchema = new Schema({
  memberId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  memberNumber: { type: Number, required: true },
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
