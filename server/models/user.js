import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  userType: {type: String, required: true},
  password: {type: String, required: true},
  username:{type: String, required: true},
  fullName: {type: String}
});

export default mongoose.model("User", userSchema);