import mongoose from "mongoose";

export default mongoose.Schema({
  token: { type: String, required: true },
  userId: { type: String, required: true },
  exp: { type: Number, required: true },
  iat: {
    type: Number,
    default: Date.now,
  },
});
