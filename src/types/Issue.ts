export enum IssuePriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "MEDIUM",
}

export enum IssueStatus {
  BACKLOG = "BACKLOG",
  IN_PROGRESS = "IN_PROGRESS",
  IN_TESTING = "IN_TESTING",
  RESOLVED = "RESOLVED",
  CANCELED = "CANCELED",
}

export type Issue = {
  id: number;
  title: string;
  description: string;
  status: IssueStatus;
  priority: IssuePriority;
  reporterEmail: string;
  reporterName: string;
  updatedAt: Date;
  createdAt: Date;
};

export const issuePriorityDictionary: Record<IssuePriority, string> = {
  [IssuePriority.LOW]: "Несрочно",
  [IssuePriority.MEDIUM]: "Некритично",
  [IssuePriority.HIGH]: "Критично",
};

export const issueStatusDictionary: Record<IssueStatus, string> = {
  [IssueStatus.BACKLOG]: "Бэклог",
  [IssueStatus.CANCELED]: "Отменено",
  [IssueStatus.IN_PROGRESS]: "В процессе",
  [IssueStatus.IN_TESTING]: "На тестировании",
  [IssueStatus.RESOLVED]: "Готово",
};
