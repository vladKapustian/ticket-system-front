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

 export type GetIssuesListParams = {
  title?: string;
  status?: EIssueStatus;
  priority?: EIssuePriority;
  limit?: number;
  page?: number;
}

/* Экспорт объекта с именем `requestApi`, который содержит несколько функций, выполняющих API-запросы с использованием
`axiosInstance`. Эти функции включают в себя создание нового вопроса, удаление вопроса, обновление
приоритет и статус задания, а также получение списка заданий с дополнительными фильтрами и пагинацией. */
export const requestApi = {
  // Создание заявки. Отправляем объект values типа RequestCreateData на бекенд для создания тикета
  createRequest: (values: RequestCreateData) => {
    return axiosInstance.post("/issues", values);
  },
  // Удаление заявки. Отправляем объект values типа TIssue на бекенд для удаления тикета
  deleteRequest: (values: TIssue) => {
    return axiosInstance.patch(`/issues/${values.id}/status`, values);
  },
   // Обновление приоритета заявки. Отправляем новый приоритет в конкретный тикет issueId
  updateRequestPriority: (priority: {priority:string}, issueId:number) => {
    return axiosInstance.patch(`/issues/${issueId}/priority`, priority);
  },
  // Обновление статуса заявки. Отправляем новый приоритет в конкретный тикет issueId
  updateRequestStatus: (status: {status:string}, issueId:number) => {
    return axiosInstance.patch(`/issues/${issueId}/status`, status);
  },
  // Получение всех заявок (экран issues)
  getAllRequests:(params:GetIssuesListParams = {limit:20, page:1}):Promise<AxiosResponse<IssuesListDTO>>=>{
    return axiosInstance.get("/issues", {params})
  },
};
