import jwt from "../services/jwt.js";
import Refresh from "../Models/Refresh.js";
import User from "../Models/User.js";
import * as refresh from "../services/refreshToken.js";

export default (app) => {
  app.post("/refresh", async (req, res) => {
    try {
      const token = req.body?.refresh_token;

      const currentToken = await Refresh.findOne({ token });

      if (!currentToken) throw new Error("/logout");
      const { uuid, name, role } = await User.findOne({
        uuid: currentToken.userId,
      });

      const access_token = jwt.sign({ uuid, name, role });
      const refresh_token = await refresh.reissueToken(token);

      res.json({ access_token, refresh_token });
    } catch ({ message: path }) {
      res.redirect(401, path);
    }
  });
};
