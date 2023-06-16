// Все возможные приоритеты
export enum EIssuePriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

// Все возможные статусы
export enum EIssueStatus {
  BACKLOG = "BACKLOG",
  IN_PROGRESS = "IN_PROGRESS",
  IN_TESTING = "IN_TESTING",
  RESOLVED = "RESOLVED",
  CANCELED = "CANCELED",
}

// Тип данных для зранения одного тикета
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

// Словарь со значениями для селектом приоритетов и статусрв
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
