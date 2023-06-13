import { Button, Col, Empty, Input, Select, Typography } from "antd";
import styles from "./styles.module.scss";
import IssueItem from "@/components/IssueItem";
import { EIssuePriority, EIssueStatus, TIssue, issuePriorityDictionary, issueStatusDictionary } from "@/types/Issue";
import { useEffect, useState } from "react";
import { Skeleton } from "antd";

import { api } from "@/api";
import { useRouter } from "next/router";
import { GetIssuesListParams } from "@/api/modules/request";

const preparedOptionsForStatusSelect = Object.entries(EIssueStatus).map(([key, value]) => ({
  label: key,
  value,
}));
const preparedOptionsForPrioritySelect = Object.entries(EIssuePriority).map(([key, value]) => ({
  label: key,
  value,
}));

export default function ViewRequests() {
  const router = useRouter();
  const [issues, setIssues] = useState<TIssue[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getRequestParamsFromRoute = () => {
    const query = router.query as GetIssuesListParams;
    return query;
  };

  const fetchIssues = async (fetchParams: GetIssuesListParams) => {
    setIsLoading(true);
    try {
      const res = await api.getAllRequests(fetchParams);
      setIssues(res.data.data);
    } catch (err) {
      console.error(err);
      localStorage.clear();
      router.replace("/auth/sign-in");
    }
    setIsLoading(false);
  };

  const onFilterSeacrchSubmit = (value: string) => {
    router.query.title = value;
    fetchIssues(getRequestParamsFromRoute());
  };

  const onPriorityChange = (value: EIssuePriority) => {
    router.query.priority = EIssuePriority[value];
    fetchIssues(getRequestParamsFromRoute());
  };
  const onStatusChange = (value: EIssueStatus) => {
    router.query.status = EIssueStatus[value];
    fetchIssues(getRequestParamsFromRoute());
  };

  const notFound = () => {
    if (!issues.length) {
      return <Empty className={styles.empltyIssuesList} description="Не удалось найти тикеты" />;
    }
  };

  useEffect(() => {
    fetchIssues(getRequestParamsFromRoute());
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.layoutWrapper}>
        <div className={styles.filtersWrapper}>
          <Typography.Title level={4}>Фильтры</Typography.Title>
          <div className={styles.titleItemContainer}>
            <Typography.Paragraph className={styles.filterTitleParagraph}>Поиск по теме</Typography.Paragraph>
            <Input.Search
              onSearch={onFilterSeacrchSubmit}
              placeholder="Заголовок искомого обращения"
              className={styles.titleFilter}
            />
          </div>
          <div className={styles.titleItemContainer}>
            <Typography.Paragraph className={styles.filterTitleParagraph}>Поиск по приоритету</Typography.Paragraph>
            <Select
              onChange={onPriorityChange}
              options={preparedOptionsForPrioritySelect}
              placeholder="Приоритет"
              className={styles.selectFilter}
            />
          </div>
          <div className={styles.titleItemContainer}>
            <Typography.Paragraph className={styles.filterTitleParagraph}>Поиск по статусу</Typography.Paragraph>
            <Select
              onChange={onStatusChange}
              options={preparedOptionsForStatusSelect}
              placeholder="Статус"
              className={styles.selectFilter}
            />
          </div>
        </div>
        <div className={styles.contentWrapper}>
          {isLoading ? <Skeleton /> : issues.map((issue) => <IssueItem key={issue.id} issue={issue} />)}
          {notFound()}
        </div>
      </div>
    </div>
  );
}
