import { Button, Col, Empty, Input, Select, Typography } from "antd";
import styles from "./styles.module.scss";
import IssueItem from "@/components/IssueItem";
import { EIssuePriority, EIssueStatus, TIssue, issuePriorityDictionary, issueStatusDictionary } from "@/types/Issue";
import { useEffect, useState } from "react";
import { Skeleton } from "antd";

import { api } from "@/api";
import { useRouter } from "next/router";

const preparedOptionsForStatusSelect = Object.entries(issueStatusDictionary).map(([key, value]) => ({
  label: key,
  value,
}));
const preparedOptionsForPrioritySelect = Object.entries(issuePriorityDictionary).map(([key, value]) => ({
  label: key,
  value,
}));

const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

export default function ViewRequests() {
  const router = useRouter();
  const [issues, setIssues] = useState<TIssue[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [titleSearch, setTitleSearch] = useState<string>();

  const fetchIssues = async () => {
    setIsLoading(true);
    try {
      const res = await api.getAllRequests({ title: titleSearch });
      setIssues(res.data.data);
    } catch (err) {
      console.error(err);
      localStorage.clear();
      router.replace("auth/sign-in");
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchIssues();
  }, []);

  let searchValue: string = "";
  const changeTitleSearchValue = () => {
    setTitleSearch(titleSearch);
    fetchIssues;
  };

  const notFound = () => {
    if (!issues.length) {
      return <Empty className={styles.empltyIssuesList} description={<span>Не удалось найти тикеты</span>} />;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.filtersWrapper}>
        <Typography.Title level={4}>Фильтры</Typography.Title>
        <div className={styles.titleItemContainer}>
          <Typography.Paragraph className={styles.filterTitleParagraph}>Поиск по теме</Typography.Paragraph>
          <Input.Search
            value={titleSearch}
            onChange={changeTitleSearchValue}
            placeholder="Заголовок искомого обращения"
            className={styles.titleFilter}
          />
        </div>
        <div className={styles.titleItemContainer}>
          <Typography.Paragraph className={styles.filterTitleParagraph}>Поиск по приоритету</Typography.Paragraph>
          <Select options={preparedOptionsForPrioritySelect} placeholder="Приоритет" className={styles.selectFilter} />
        </div>
        <div className={styles.titleItemContainer}>
          <Typography.Paragraph className={styles.filterTitleParagraph}>Поиск по статусу</Typography.Paragraph>
          <Select options={preparedOptionsForStatusSelect} placeholder="Статус" className={styles.selectFilter} />
        </div>
      </div>
      <div className={styles.contentWrapper}>
        {isLoading ? <Skeleton /> : issues.map((issue) => <IssueItem key={issue.id} issue={issue} />)}
        {notFound()}
      </div>
    </div>
  );
}
