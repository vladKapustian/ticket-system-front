import { authApi } from "./modules/auth";
import { requestApi } from "./modules/request";

export const api = {
  ...authApi,
  ...requestApi,
};
