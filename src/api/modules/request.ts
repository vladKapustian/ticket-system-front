import { User } from "@/types/User";
import { axiosInstance } from "../axiosInstance";
import { TIssue, EIssuePriority, EIssueStatus } from "@/types/Issue";
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

 type GetIssuesListParams = {
    title?: string;
    limit?: number;
    page?: number;
  }

export const requestApi = {
  createRequest: (values: RequestCreateData) => {
    return axiosInstance.post("/issues", values);
  },
  deleteRequest: (values: TIssue) => {
    return axiosInstance.patch(`/issues/${values.id}/status`, values);
  },
  updateRequestPriority: (priority: {priority:string}, issueId:number) => {
    return axiosInstance.patch(`/issues/${issueId}/priority`, priority);
  },
  updateRequestStatus: (status: {status:string}, issueId:number) => {
    return axiosInstance.patch(`/issues/${issueId}/status`, status);
  },
  getAllRequests:(params:GetIssuesListParams = {limit:20, page:1}):Promise<AxiosResponse<IssuesListDTO>>=>{
    return axiosInstance.get("/issues", {params:params})
  },
};
