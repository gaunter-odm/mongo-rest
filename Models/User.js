import mongoose from "mongoose";
import config from "../config.js";
import schemeUser from "../Schemes/schemeUser.js";

export default mongoose
  .createConnection(config.mongoConnect)
  .model("User", schemeUser);
