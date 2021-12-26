import jwt from "jsonwebtoken";
import config from "../config.js";
const { secretKey, jwtLive } = config;

const TokenExpiredError = jwt.TokenExpiredError.name;

export default {
  TokenExpiredError,
  sign: (payload) => jwt.sign(payload, secretKey, { expiresIn: jwtLive }),
  verify: (token) => {
    try {
      return jwt.verify(token, secretKey);
    } catch (e) {
      return e.name;
    }
  },
};
