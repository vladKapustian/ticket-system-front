import { authApi } from "./modules/auth";
import { requestApi } from "./modules/request";
import { signupRequestApi } from "./modules/signupRequests";

export const api = {
  ...authApi,
  ...requestApi,
  ...signupRequestApi
};
