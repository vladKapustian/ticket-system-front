import React, { useEffect, useState } from "react";

import { EIssuePriority, EIssueStatus, TIssue, issuePriorityDictionary, issueStatusDictionary } from "@/types/Issue";

import styles from "./styles.module.scss";
import { Button, Form, Input, Modal, Select, Typography } from "antd";
import { api } from "@/api";

type Props = {
  issue: TIssue;
};

enum EIssuePriorityColor {
  "HIGH" = "#F25252",
  "MEDIUM" = "#EDBC5E",
  "LOW" = "#4499FE",
}

const preparedOptionsForStatusSelect = Object.entries(issueStatusDictionary).map(([key, value]) => ({
  label: value,
  value: key,
}));
const preparedOptionsForPrioritySelect = Object.entries(issuePriorityDictionary).map(([key, value]) => ({
  label: value,
  value: key,
}));

const IssueItem = ({ issue }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [statusSelectValue, setStatusSelectValue] = useState<EIssueStatus>(EIssueStatus[issue.status]);
  const [prioritySelectValue, setPrioritySelectValue] = useState<EIssuePriority>(EIssuePriority[issue.priority]);

  const [statusBorderColor, setStatusBorderColor] = useState(EIssuePriorityColor[issue.priority]);

  const onClick = () => setIsOpen((prev) => !prev);

  const [changeDate, setChangeDate] = useState(new Date(issue.updatedAt));

  useEffect(() => {
    setStatusBorderColor(EIssuePriorityColor[prioritySelectValue]);
  }, [prioritySelectValue]);

  const onPriorityChange = (value: EIssuePriority) => {
    setPrioritySelectValue(value);
    api.updateRequestPriority({ priority: prioritySelectValue }, issue.id);
    setChangeDate(new Date(Date.now()));
  };

  const onStatusChange = (value: EIssueStatus) => {
    setStatusSelectValue(value);
    api.updateRequestStatus({ status: statusSelectValue }, issue.id);
    setChangeDate(new Date(Date.now()));
  };

  return (
    <>
      <div className={styles.wrapper}>
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
        {isOpen && (
          <div className={styles.body}>
            <div className={styles.descriptionWrapper}>{issue.description}</div>
            <div className={styles.bodyFooter}>
              <div className={styles.bodyFooterLeft}>Обновлено: {changeDate.toLocaleDateString()}</div>

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
    </>
  );
};

export default IssueItem;
