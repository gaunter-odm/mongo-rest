import authMiddleware from "../middleware/auth.js";

export default function (app) {
  app.get("/date", authMiddleware, (req, res) => {



    res.json(req.userData);
  });
}
