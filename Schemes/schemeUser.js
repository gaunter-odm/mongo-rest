import mongoose from "mongoose";
import { v4 } from "uuid";

const uuid = v4;

const schemeUsers = mongoose.Schema({
  uuid: { type: String, required: true, default: uuid, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isValid: { type: Boolean, required: true, default: false },
  created_at: { type: String, required: true, default: Date.now },
  updated_at: { type: String, required: true, default: Date.now },
  role: {type: String, default: "user"},
  avatar: { type: String },
});

export default schemeUsers;
