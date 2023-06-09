import { Col } from "antd";
import styles from "./styles.module.scss";
import IssueItem from "@/components/IssueItem";
import { EIssuePriority, EIssueStatus, TIssue } from "@/types/Issue";
import { useEffect, useState } from "react";
import { Skeleton } from "antd";

import { api } from "@/api";

export default function ViewRequests() {
  const [issues, setIssues] = useState<TIssue[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchIssues = async () => {
    const _issues = await api.getAllRequests();
    setIssues(_issues.data.data);
  };
  useEffect(() => {
    try {
      setIsLoading(true);
      fetchIssues();

      issuesLayout();
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  }, []);

  const issuesLayout = () => {
    if (issues.length) {
      return issues.map((issue) => <IssueItem key={issue.id} issue={issue} />);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.filtersWrapper}>ee</div>
      <div className={styles.contentWrapper}>
        {isLoading ? <Skeleton /> : issues.map((issue) => <IssueItem key={issue.id} issue={issue} />)}
      </div>
    </div>
  );
}

const mockIssues: TIssue[] = [
  {
    id: 2,
    title: "Опять что-то наебнулось. Почините, пожалуйста",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborumLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborumLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu ",
    reporterEmail: "aleksandrstraus3456@gmail.com",
    reporterName: "Раша",
    status: EIssueStatus.IN_PROGRESS,
    priority: EIssuePriority.HIGH,
    updatedAt: new Date(),
    createdAt: new Date(),
  },
  {
    id: 1,
    title: "Опять что-то наебнулось. Почините, пожалуйста",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborumLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborumLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu ",
    reporterEmail: "aleksandrstraus3456@gmail.com",
    reporterName: "Раша",
    status: EIssueStatus.IN_PROGRESS,
    priority: EIssuePriority.HIGH,
    updatedAt: new Date(),
    createdAt: new Date(),
  },
];
