import bcrypt from "bcrypt";
import User from "../Models/User.js";

export default (app) => {
  app.post("/register", async (req, res) => {
    let { password, name, email } = req.body;

    if (!password || !name || !email) {
      res.send("все поля оббязательны для заполнения");
      return;
    }

    password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    try {
      const user = await User.create({
        name,
        email,
        password,
      });
      res.json({ user });
    } catch (e) {
      const reason = e.code === 11000 ? "Duplicate field" : "";

      res.json({
        error: e.name,
        errorMessage: e.message,
        code: e.code,
        pattern: e.keyPattern,
        value: e.keyValue,
        reason,
        success: false,
      });
    }
  });
};
