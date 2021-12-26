import jwt from "../services/jwt.js";
export default function (req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    const result = jwt.verify(token);
    if (typeof result === "string") throw new Error(result);
    const { uuid, name, role } = result;
    req.userData = { uuid, name, role };

    next();
  } catch ({ message }) {
    switch (message) {
      case jwt.TokenExpiredError:
        res.redirect(403, "/refresh");
        break;
      default:
        res.redirect(401, "/logout");
    }
  }
}
