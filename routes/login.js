import { compareSync } from "bcrypt";
import User from "../Models/User.js";
import * as refresh from "../services/refreshToken.js";
import jwt from "../services/jwt.js";

export default function (app) {
  app.post("/login", (req, res) => {
    const rawPass = req.body?.password?.trim();
    const email = req.body?.email?.trim();

    if (!email || !rawPass) {
      res.json({
        verify: false,
        message: "Все поля обязательны для заполнения.",
      });
      return;
    }

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
