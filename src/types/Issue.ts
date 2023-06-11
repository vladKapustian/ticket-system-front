export enum EIssuePriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export enum EIssueStatus {
  BACKLOG = "BACKLOG",
  IN_PROGRESS = "IN_PROGRESS",
  IN_TESTING = "IN_TESTING",
  RESOLVED = "RESOLVED",
  CANCELED = "CANCELED",
}

export type TIssue = {
  id: number;
  title: string;
  description: string;
  status: EIssueStatus;
  priority: EIssuePriority;
  reporterEmail: string;
  reporterName: string;
  updatedAt: Date;
  createdAt: Date;
};

export const issuePriorityDictionary: Record<EIssuePriority, string> = {
  [EIssuePriority.LOW]: "Несрочно",
  [EIssuePriority.MEDIUM]: "Некритично",
  [EIssuePriority.HIGH]: "Критично",
};

export const issueStatusDictionary: Record<EIssueStatus, string> = {
  [EIssueStatus.BACKLOG]: "Бэклог",
  [EIssueStatus.CANCELED]: "Отменено",
  [EIssueStatus.IN_PROGRESS]: "В процессе",
  [EIssueStatus.IN_TESTING]: "На тестировании",
  [EIssueStatus.RESOLVED]: "Готово",
};
