import { User } from "@/types/User";
import { axiosInstance } from "../axiosInstance";

export type SignUpData = Omit<User, "id">;
export type SignInData = {
  email: string;
  password: string;
};

export const authApi = {
  signUp: (values: SignUpData) => {
    return axiosInstance.post("/auth/sign-up", values);
  },
  signIn: (values: SignInData) => {
    return axiosInstance.post("/auth/sign-in", values);
  },
  signOut: () => {
    return axiosInstance.post("/auth/sign-out");
  },
};
