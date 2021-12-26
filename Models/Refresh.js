import mongoose from "mongoose";
import schemeRefresh from "../Schemes/schemeRefresh.js";
import config from "../config.js";
export default mongoose
  .createConnection(config.mongoConnect)
  .model("RefreshToken", schemeRefresh);
