import { Button, Col, Empty, Input, Select, Typography } from "antd";
import styles from "./styles.module.scss";
import IssueItem from "@/components/IssueItem";
import { EIssuePriority, EIssueStatus, TIssue, issuePriorityDictionary, issueStatusDictionary } from "@/types/Issue";
import { useEffect, useState } from "react";
import { Skeleton } from "antd";

import { api } from "@/api";
import { useRouter } from "next/router";
import { GetIssuesListParams } from "@/api/modules/request";
import { useCookies } from "react-cookie";

const preparedOptionsForStatusSelect = Object.entries(issueStatusDictionary).map(([key, value]) => ({
  label: value,
  value: key,
}));
const preparedOptionsForPrioritySelect = Object.entries(issuePriorityDictionary).map(([key, value]) => ({
  label: value,
  value: key,
}));

export default function ViewRequests() {
  const router = useRouter();
  const [issues, setIssues] = useState<TIssue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [, setCookies] = useCookies();

  const getRequestParamsFromRoute = () => router.query as GetIssuesListParams;

  const fetchIssues = async (fetchParams: GetIssuesListParams) => {
    setIsLoading(true);
    try {
      const res = await api.getAllRequests(fetchParams);
      setIssues(res.data.data);
    } catch (err) {
      console.error(err);
      localStorage.clear();
      setCookies("token", null);
      router.replace("/auth/sign-in");
    }
    setIsLoading(false);
  };

  const onFilterSeacrchSubmit = (value: string) => {
    router.query.title = value;
    fetchIssues(getRequestParamsFromRoute());
  };

  const onPriorityChange = (value: EIssuePriority) => {
    router.query.priority = value;
    fetchIssues(getRequestParamsFromRoute());
  };
  const onStatusChange = (value: EIssueStatus) => {
    router.query.status = value;
    fetchIssues(getRequestParamsFromRoute());
  };

  const clearFilters = () => {
    router.query = {};
    setSearch("");
    fetchIssues(getRequestParamsFromRoute());
  };

  useEffect(() => {
    fetchIssues(getRequestParamsFromRoute());
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.layoutWrapper}>
        <div className={styles.filtersWrapper}>
          <div className={styles.titleItemContainer}>
            <Typography.Paragraph className={styles.filterTitleParagraph}>Поиск</Typography.Paragraph>
            <Input.Search
              value={search}
              onChange={(e) => setSearch(e.currentTarget.value)}
              onSearch={onFilterSeacrchSubmit}
              placeholder="Заголовок искомого обращения"
              className={styles.titleFilter}
            />
          </div>
          <div className={styles.titleItemContainer}>
            <Typography.Paragraph className={styles.filterTitleParagraph}>Приоритет</Typography.Paragraph>
            <Select
              onChange={onPriorityChange}
              options={preparedOptionsForPrioritySelect}
              placeholder="Приоритет"
              className={styles.selectFilter}
            />
          </div>
          <div className={styles.titleItemContainer}>
            <Typography.Paragraph className={styles.filterTitleParagraph}>Статус</Typography.Paragraph>
            <Select
              onChange={onStatusChange}
              options={preparedOptionsForStatusSelect}
              placeholder="Статус"
              className={styles.selectFilter}
            />
          </div>
          <Button onClick={clearFilters}>Очистить фильтры</Button>
        </div>
        <div className={styles.contentWrapper}>
          {isLoading ? (
            <div className={styles.skeletonWrapper}>
              <Skeleton />
            </div>
          ) : (
            issues.map((issue) => <IssueItem key={issue.id} issue={issue} />)
          )}
          {!issues.length && !isLoading && (
            <Empty className={styles.empltyIssuesList} description="Не удалось найти тикеты" />
          )}
        </div>
      </div>
    </div>
  );
}
