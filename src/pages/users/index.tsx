import { Button, Empty, Typography } from "antd";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { Skeleton } from "antd";

import { api } from "@/api";
import { TUser } from "@/api/modules/signupRequests";
import { SignupRequest } from "@/components/SignupRequest";

export default function ApproveSignup() {
  const [signupRequests, setSignupRequests] = useState<TUser[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const deleteIncomingReqeusts = async () => {
    setIsLoading(true);
    try {
      api.deleteAllRequests();
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSignupRequests();
  }, []);

  const notFound = () => {
    if (!signupRequests.length && !isLoading) {
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
      <div className={styles.layoutWrapper}>
        <div className={styles.headerPanel}>
          <Typography.Title level={4}>Активные пользователи и заявки</Typography.Title>
          <Button onClick={deleteIncomingReqeusts}>Удалить все входящие заявки</Button>
        </div>

        <div className={styles.contentWrapper}>
          {isLoading ? (
            <Skeleton />
          ) : (
            signupRequests.map((request) => <SignupRequest key={request.id} request={request} />)
          )}
          {notFound()}
        </div>
      </div>
    </div>
  );
}
