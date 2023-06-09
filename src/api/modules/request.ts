import { User } from "@/types/User";
import { axiosInstance } from "../axiosInstance";
import { TIssue, EIssuePriority } from "@/types/Issue";
import { AxiosResponse } from "axios";

export type RequestCreateData = {
    title: string;
    description: string;
    reporterEmail: string;
    reporterName: string;
    priority?: EIssuePriority;
  };

  export type Pagination = {
    totalCount: number;
  }
  

  export type IssuesListDTO = {
    data: TIssue[];
    meta: Pagination;
  }

export const requestApi = {
  createRequest: (values: RequestCreateData) => {
    return axiosInstance.post("/issues", values);
  },
  deleteRequest: (values: TIssue) => {
    return axiosInstance.patch(`${values.id}/status`, values);
  },
  updateRequestPriority: (values: TIssue) => {
    return axiosInstance.patch(`/${values.id}/priority`);
  },
  updateRequestStatus: (values: TIssue) => {
    return axiosInstance.patch(`/${values.id}/status`);
  },
  getAllRequests:():Promise<AxiosResponse<IssuesListDTO>>=>{
    return axiosInstance.get("/issues")
  },
};
