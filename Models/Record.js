import mongoose from "mongoose";
import schemeRecord from "../Schemes/schemeRecord.js";
import config from "../config.js";
export default mongoose
  .createConnection(config.mongoConnect)
  .model("Record", schemeRecord);
