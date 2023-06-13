// Импортируем ранее созанные объекты с функциями для взаимодействия с API 
import { authApi } from "./modules/auth";
import { requestApi } from "./modules/request";
import { signupRequestApi } from "./modules/signupRequests";

/* Деструктуризируем их в api, чтобы обращаясь к объекту api можно 
было получить доступ ко всем функциям запросов */
export const api = {
  ...authApi,
  ...requestApi,
  ...signupRequestApi
};
