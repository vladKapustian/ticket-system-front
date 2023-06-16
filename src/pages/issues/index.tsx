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

// Опции для селекта статусов
const preparedOptionsForStatusSelect = Object.entries(issueStatusDictionary).map(([key, value]) => ({
  label: value,
  value: key,
}));

// Опции для селекта приоритетов
const preparedOptionsForPrioritySelect = Object.entries(issuePriorityDictionary).map(([key, value]) => ({
  label: value,
  value: key,
}));

export default function ViewRequests() {
  const router = useRouter(); // Хук для работы с query и навигацией
  const [issues, setIssues] = useState<TIssue[]>([]); // состояние хранящее все данные текущих тикетов
  const [isLoading, setIsLoading] = useState(true); // состояние загрузки
  const [search, setSearch] = useState(""); // Состояние значения инпута поиска
  const [, setCookies] = useCookies(); // Используем файлы cookies

  const getRequestParamsFromRoute = () => router.query as GetIssuesListParams; // При каждом запросе на бек достаем параменты фильтрыции из query

  // Функция запроса к API
  const fetchIssues = async (fetchParams: GetIssuesListParams) => {
    setIsLoading(true); // Состояние загрузки
    try {
      const res = await api.getAllRequests(fetchParams); // Делаем запрос и получаем ответ от бека
      setIssues(res.data.data); // Добавляем данные для карточки в issues
    } catch (err) {
      console.error(err); // Выводим ошибку в консоль
      localStorage.clear(); // Очищаем localSotrage
      setCookies("token", null); // Очищаем куки
      router.replace("/auth/sign-in"); // Переносим пользователя на страницу логина
    }
    setIsLoading(false); // убираем состояние загрузки
  };

  // Функция отрабатывающая при зименении инпута с поиском
  const onFilterSeacrchSubmit = (value: string) => {
    router.query.title = value;
    fetchIssues(getRequestParamsFromRoute());
  };

  // Функция отрабатывающая при зименении слекта приоритов
  const onPriorityChange = (value: EIssuePriority) => {
    router.query.priority = value;
    fetchIssues(getRequestParamsFromRoute()); // Достаем параметы из query и делаем запрос на бек
  };

  // Функция отрабатывающая при зименении слекта статусов
  const onStatusChange = (value: EIssueStatus) => {
    router.query.status = value;
    fetchIssues(getRequestParamsFromRoute()); // Достаем параметы из query и делаем запрос на бек
  };

  // Функция очистки фильтров
  const clearFilters = () => {
    router.query = {}; // Очищаем query
    setSearch(""); // Очищаем инпут поиска
    fetchIssues(getRequestParamsFromRoute()); // Достаем параметы из query и делаем запрос на бек
  };

  // При загрузке страницы белаем запрос на бек
  useEffect(() => {
    fetchIssues(getRequestParamsFromRoute());
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.layoutWrapper}>
        <div className={styles.filtersWrapper}>
          {/* Контейнер селектов с поиском */}
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
        {/* Контейнер для карточек */}
        <div className={styles.contentWrapper}>
          {/* Показываем skeleton (см. antd), если активно состояние загрузки */}
          {isLoading ? (
            <div className={styles.skeletonWrapper}>
              <Skeleton />
            </div>
          ) : (
            // Отображаем все карточки
            issues.map((issue) => <IssueItem key={issue.id} issue={issue} />) 
          )}
          {/* Если нет карточек, отображаем сообщение о ненайденных карточках */}
          {!issues.length && !isLoading && (
            <Empty className={styles.empltyIssuesList} description="Не удалось найти тикеты" />
          )}
        </div>
      </div>
    </div>
  );
}
