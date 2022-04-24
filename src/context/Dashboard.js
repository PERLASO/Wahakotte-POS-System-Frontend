import { get, post, put, deleteApi } from "../adapters/ApiServices";

export const getDashboardData = async function () {
  return await get(`Dashboard`);
};


