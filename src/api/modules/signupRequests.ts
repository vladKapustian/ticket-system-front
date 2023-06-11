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

export const signupRequestApi = {
  getUsers: ():Promise<AxiosResponse<TUser[]>> => {
    return axiosInstance.get("/users", );
  },
  confirmUsers: (id:{id:number}):Promise<AxiosResponse<TUser>> => {
    return axiosInstance.patch(`/users/${id.id}/confirm`, id);
  },
};
