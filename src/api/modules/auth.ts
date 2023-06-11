import { User } from "@/types/User";
import { axiosInstance } from "../axiosInstance";
import { AxiosResponse } from "axios";

export type SignUpData = Omit<User, "id">;
export type SignInData = {
  email: string;
  password: string;
};

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
