import { compareSync } from "bcrypt";
import User from "../Models/User.js";
import * as refresh from "../services/refreshToken.js";
import jwt from "../services/jwt.js";
import Validator from "../middleware/validator.js";

const conf = {
  validators: {
    email: "required|email",
    password: "required|min:10#Number"
  }
}

export default function (app) {
  app.post("/login", new Validator(conf).body(), (req, res) => {
    const rawPass = req.body?.password?.trim();
    const email = req.body?.email?.trim();

    User.findOne({ email }).exec(async (err, user) => {
      try {
        if (!user || !compareSync(rawPass, user.password))
          error("Не верный логин или пароль.");

        const { uuid, name, role } = user;

        const access_token = jwt.sign({ uuid, name, role });
        const refresh_token = await refresh.isseuToken(uuid);

        res.json({
          verify: true,
          access_token,
          refresh_token,
        });
      } catch ({ message }) {
        res.json({ verify: false, message });
      }
    });
  });
}

function error(msg) {
  throw new Error(msg);
}
