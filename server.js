// const express = require("express");
// const bodyParser = require("body-parser");
// const formData = require('express-form-data')
// const mongoose = require("mongoose")

import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import formData from "express-form-data";
import routes from "./routes/index.js";
import config from "./config.js";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(formData.parse());

mongoose.connect(config.mongoConnect, (err) => {
  if (err) return console.log(err);
  else console.log("mongodb connection");

  routes(app);

  app.listen(config.httpPort);
});
