import mongoose from "mongoose";
const { Schema, Types } = mongoose;

export default Schema({
  startDate: Date,
  finalDate: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  user: { type: Types.ObjectId, required: true },
});
