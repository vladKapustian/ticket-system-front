// Импортируем необходимые типы
import { AxiosResponse } from "axios"; 
import { User } from "@/types/User";
import { axiosInstance } from "../axiosInstance";

// Тип для отправки данных регистрации на бекенд
export type SignUpData = Omit<User, "id">;
// Тип для отправки данных логина на бекенд
export type SignInData = {
  email: string;
  password: string;
};

/* Этот код экспортирует объект с именем `authApi`, который содержит три метода: `signUp`, `signIn` и
`signOut`. Эти методы выполняют HTTP-запросы к серверу, используя объект `axiosInstance`, для
выполнения задач, связанных с аутентификацией, таких как регистрация, вход и выход. Метод `signUp
принимает в качестве аргумента объект `SignUpData` и отправляет POST-запрос к конечной точке `/auth/sign-up`.
с предоставленными данными. Метод `signIn` принимает в качестве аргумента объект `SignInData`
и отправляет POST-запрос на конечную точку `/auth/sign-in` с предоставленными данными. Он возвращает
Promise, который разрешается в объект `AxiosResponse`, содержащий `token` и `role`. Метод `signOut
отправляет POST-запрос на конечную точку `/auth/sign-out`, чтобы выписать пользователя. */
export const authApi = {
  signUp: (values: SignUpData) => {
    return axiosInstance.post("/auth/sign-up", values);
  },
  signIn: (values: SignInData): Promise<AxiosResponse<{ token: string; role: string }>> => {
    return axiosInstance.post<{ token: string; role: string }>("/auth/sign-in", values);
  },
  signOut: () => {
    return axiosInstance.post("/auth/sign-out");
  },
};
