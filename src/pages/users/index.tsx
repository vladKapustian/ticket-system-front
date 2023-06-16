import { Empty, Typography } from "antd";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { Skeleton } from "antd";

import { api } from "@/api";
import { TUser } from "@/api/modules/signupRequests";
import { SignupRequest } from "@/components/SignupRequest";

// Страница users
export default function ApproveSignup() {
  const [signupRequests, setSignupRequests] = useState<TUser[] | []>([]); // Состояние всех текущих данных для карточек
  const [isLoading, setIsLoading] = useState(true); // Состояние загрузки

  // Функция запроса карточкек на бек
  const fetchSignupRequests = async () => {
    setIsLoading(true); // Выставляем состояние загрузки
    try {
      const res = await api.getUsers(); // Делаем запрос и получиаем ответ
      setSignupRequests(res.data); // Кладем в состояние с данными данные, которые нам прислали с сервера
    } catch (err) {
      // Отлавливаем ошибку и выводим ее в консоль
      console.error(err);
    }
    setIsLoading(false); // Убираем состояние загрузки
  };

  // При загрзке страницы запрашиваем данные
  useEffect(() => {
    fetchSignupRequests();
  }, []);

  // Возавращаем ненайдено
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
        <Typography.Title level={4}>Активные пользователи и заявки</Typography.Title>

        <div className={styles.contentWrapper}>
          {/* Если происходит загрузка */}
          {isLoading ? (
            // Показываем skeleton
            <Skeleton />
          ) : (
            // Показываем карточки
            signupRequests.map((request) => <SignupRequest key={request.id} request={request} />)
          )}
          {notFound()}
        </div>
      </div>
    </div>
  );
}
