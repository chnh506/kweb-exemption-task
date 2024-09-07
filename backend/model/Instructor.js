import mongoose from "mongoose";
const { Schema } = mongoose;

const instructorSchema = new Schema({
  memberId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  memberNumber: { type: String, required: true },
});

const Instructor = mongoose.model("Instructor", instructorSchema);
export default Instructor;
