// Импортируем необходимые для взаимойдействия с реактивностью функции из библиоткеи react
import React, { useEffect, useState } from "react";

// Импротируем типы, для данных в компоненте карточки
import { EIssuePriority, EIssueStatus, TIssue, issuePriorityDictionary, issueStatusDictionary } from "@/types/Issue";

// Импортируем стили и вспомогательные компоненты из ui-kit antd
import styles from "./styles.module.scss";
import { Select, Typography } from "antd";
import { api } from "@/api";

type Props = {
  issue: TIssue;
};

// Создаем словарь для цветов, которые будут применяться в зависимости от заданной важности тикета
enum EIssuePriorityColor {
  "HIGH" = "#F25252",
  "MEDIUM" = "#EDBC5E",
  "LOW" = "#4499FE",
}

// Получаем все опции для селектов статусов
const preparedOptionsForStatusSelect = Object.entries(issueStatusDictionary).map(([key, value]) => ({
  label: value,
  value: key,
}));

// Получаем все опции для селектов приоритетов
const preparedOptionsForPrioritySelect = Object.entries(issuePriorityDictionary).map(([key, value]) => ({
  label: value,
  value: key,
}));

// Компонент тикета. Принимает в себя данные 1 созданного запроса
const IssueItem = ({ issue }: Props) => {
  // Инициализируем переменные для состояния открытия/закрытия карточки (изначально закрыто)
  const [isOpen, setIsOpen] = useState(false);
  // Инициализируем переменную для состояния текущего статуса тикета
  const [statusSelectValue, setStatusSelectValue] = useState<EIssueStatus>(EIssueStatus[issue.status]);
  // Инициализируем переменную для состояния текущего приоритета тикета
  const [prioritySelectValue, setPrioritySelectValue] = useState<EIssuePriority>(EIssuePriority[issue.priority]);

  // Инициализируем переменную для состояния текущего цвета карточки
  const [statusBorderColor, setStatusBorderColor] = useState(EIssuePriorityColor[issue.priority]);

  // Функция-помошник открытия/закрытия тикета
  const onClick = () => setIsOpen((prev) => !prev);

  // Стейт для редактирования даты последнего изменения, в случае, когда пользовтаель системы изменяет статус или приоритет
  const [changeDate, setChangeDate] = useState(new Date(issue.updatedAt));

  // При изменении приоритета изменяем цвет карточки
  useEffect(() => {
    setStatusBorderColor(EIssuePriorityColor[prioritySelectValue]);
  }, [prioritySelectValue]);

  // Функция-помошник изменения приоритета
  const onPriorityChange = (value: EIssuePriority) => {
    setPrioritySelectValue(value); // Меняем приоритет
    api.updateRequestPriority({ priority: prioritySelectValue }, issue.id); // Отправляем новый приоритет на бекенд
    setChangeDate(new Date(Date.now())); // Изменяем дату последних изменений
  };

  // Такая же функция, как и onPriorityChange, только для статуса
  const onStatusChange = (value: EIssueStatus) => {
    setStatusSelectValue(value);
    api.updateRequestStatus({ status: statusSelectValue }, issue.id);
    setChangeDate(new Date(Date.now()));
  };

  // Возмращаем jsx (html подобный синтаксис-обертка над функцией React.createElement)
  return (
    // Обертка страницы
    <div className={styles.wrapper}>
      {/* Верхнаяя часть (header) карточки */}
      <div className={styles.header} onClick={onClick}>
        <div className={styles.statusIndicator} style={{ backgroundColor: statusBorderColor }} />
        <div className={styles.headerTop}>
          <div className={styles.headerTopLeft}>
            <div style={{ color: statusBorderColor }} className={styles.priority}>
              {issuePriorityDictionary[issue.priority]}
            </div>
            <span className={styles.createdAt}>{changeDate.toLocaleDateString()}</span>
          </div>
          <div className={styles.headerTopRight}>{issueStatusDictionary[statusSelectValue]}</div>
        </div>
        <div className={styles.headerBottom}>
          <div className={styles.title}>{issue.title}</div>
          <div className={styles.reporterEmail}>{issue.reporterEmail}</div>
        </div>
      </div>
      {/* Часть карточки, открыающаяся при нажатии, показывается только, если isOpen равно true */}
      {isOpen && (
        <div className={styles.body}>
          {/* Показываем текст тикета */}
          <div className={styles.descriptionWrapper}>{issue.description}</div>
          <div className={styles.bodyFooter}>
            {/* Дата последнего обновления */}
            <div className={styles.bodyFooterLeft}>Обновлено: {changeDate.toLocaleDateString()}</div>
            {/* Селекты статус и приоритет */}
            <div className={styles.bodyFooterRight}>
              <div className={styles.footerRightItemWrapper}>
                <Typography.Text>Статус</Typography.Text>
                <Select
                  onChange={onStatusChange}
                  className={styles.selects}
                  options={preparedOptionsForStatusSelect}
                  value={statusSelectValue}
                />
              </div>
              <div className={styles.footerRightItemWrapper}>
                <Typography.Text>Приоритет</Typography.Text>
                <Select
                  onChange={onPriorityChange}
                  className={styles.selects}
                  options={preparedOptionsForPrioritySelect}
                  value={prioritySelectValue}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IssueItem;
