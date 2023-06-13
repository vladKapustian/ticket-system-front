
import { AxiosResponse } from "axios";
import { axiosInstance } from "../axiosInstance";

export const signuoRequestApi = {};

export enum UserRole {
  UNCONFIRMED = "UNCONFIRMED",
  SUPERADMIN = "SUPERADMIN",
  OPERATOR = "OPERATOR",
}

export type TUser = {
  id: number;
  firstname: string;
  lastname: string;
  role: UserRole;
  email: string;
  password: string;
};

/* Этот код определяет и экспортирует модуль под названием `signupRequestApi`, который содержит две функции:
`getUsers` и `confirmUsers`. Эти функции выполняют HTTP-запросы с использованием Axios для получения и обновления
данные пользователей из API. Тип `TUser` и перечисление `UserRole` также определены для обеспечения безопасности типа
для пользовательских данных. Модуль `axiosInstance` импортируется из другого модуля для обеспечения согласованности в
конфигурации Axios во всем приложении. */
export const signupRequestApi = {
  getUsers: ():Promise<AxiosResponse<TUser[]>> => {
    return axiosInstance.get("/users", );
  },
  confirmUsers: (id:{id:number}):Promise<AxiosResponse<TUser>> => {
    return axiosInstance.patch(`/users/${id.id}/confirm`, id);
  },
};
