import register from "./register.js";
import login from "./login.js";
import date from "./date.js";
import refresh from "./refresh.js";
import logout from "./logout.js";

export default function (app) {
  register(app);
  refresh(app);
  logout(app);
  login(app);
  date(app);
}
