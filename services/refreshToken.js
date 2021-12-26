import { v4 } from "uuid";
import config from "../config.js";
import Refresh from "../Models/Refresh.js";

const uuid = v4;
export const isseuToken = async (userId, exp = config.refreshLive) => {
  const newRefreshToken = uuid();

  await Refresh.create({
    token: newRefreshToken,
    userId,
    exp,
  });
  return newRefreshToken;
};

export const remove = async (token) => {
  const { deletedCount } = await Refresh.deleteOne({ token });
  return !!deletedCount;
};

export const verify = async (token) => {
  const refresh = await Refresh.findOne({ token }).exec();
  if (!refresh) return false;

  const { iat, exp } = refresh;
  return Date.now() <= new Date(exp * 1000 + iat).getTime();
};

export const reissueToken = async (token) => {
  if (!(await verify(token))) {
    await remove(token);
    return false;
  }

  const newRefreshToken = uuid();

  await Refresh.updateOne(
    { token },
    {
      token: newRefreshToken,
      exp: config.refreshLive,
      iat: Date.now(),
    }
  );

  return newRefreshToken;
};
