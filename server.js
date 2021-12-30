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

routes(app);
app.listen(config.httpPort);
