import { Button, Col, Empty, Input, Select, Typography } from "antd";
import styles from "./styles.module.scss";
import IssueItem from "@/components/IssueItem";
import { EIssuePriority, EIssueStatus, TIssue, issuePriorityDictionary, issueStatusDictionary } from "@/types/Issue";
import { useEffect, useState } from "react";
import { Skeleton } from "antd";

import { api } from "@/api";
import { useRouter } from "next/router";
import { TUser } from "@/api/modules/signupRequests";
import { SignupRequest } from "@/components/SignupRequest";

export default function ApproveSignup() {
  const [signupRequests, setSignupRequests] = useState<TUser[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSignupRequests = async () => {
    setIsLoading(true);
    try {
      const res = await api.getUsers();
      setSignupRequests(res.data);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSignupRequests();
  }, []);

  const notFound = () => {
    if (!signupRequests.length) {
      return (
        <Empty
          className={styles.empltyIssuesList}
          description={<span>Активных аккаунтов или запросов на добавление не найдено</span>}
        />
      );
    }
  };

  return (
    <div className={styles.container}>
      <Typography.Title level={4}>Активные пользователи и заявки</Typography.Title>

      <div className={styles.contentWrapper}>
        {isLoading ? (
          <Skeleton />
        ) : (
          signupRequests.map((request) => <SignupRequest key={request.id} request={request} />)
        )}
        {notFound()}
      </div>
    </div>
  );
}