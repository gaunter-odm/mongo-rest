import Refresh from "../Models/Refresh.js";

export default async (userId) => await Refresh.countDocuments({ userId });
