import React, { useEffect, useState } from "react";

import { EIssuePriority, EIssueStatus, TIssue, issuePriorityDictionary, issueStatusDictionary } from "@/types/Issue";

import styles from "./styles.module.scss";
import { Button, Select } from "antd";
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
  label: key,
  value,
}));
const preparedOptionsForPrioritySelect = Object.entries(issuePriorityDictionary).map(([key, value]) => ({
  label: key,
  value,
}));

const IssueItem = ({ issue }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [statusSelectValue, setStatusSelectValue] = useState<EIssueStatus>(EIssueStatus[issue.status]);
  const [prioritySelectValue, setPrioritySelectValue] = useState<EIssuePriority>(EIssuePriority[issue.priority]);

  const statusBorderColor = EIssuePriorityColor[issue.priority];

  const onClick = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const patchedIssue = { ...issue, priority: prioritySelectValue };
    console.log(patchedIssue);
    api.updateRequestPriority({ ...issue, priority: prioritySelectValue });
  }, [prioritySelectValue]);

  useEffect(() => {
    const patchedIssue = { ...issue, status: statusSelectValue };
    console.log(patchedIssue);
    api.updateRequestStatus(patchedIssue);
  }, [statusSelectValue]);

  return (
    <div className={styles.wrapper}>
      <div style={{ borderColor: statusBorderColor }} className={styles.header} onClick={onClick}>
        <div className={styles.headerTop}>
          <div className={styles.headerTopLeft}>
            <div style={{ color: statusBorderColor }} className={styles.priority}>
              {issuePriorityDictionary[issue.priority]}
            </div>
            <span className={styles.createdAt}>{issue.updatedAt.toLocaleString()}</span>
          </div>
          <div className={styles.headerTopRight}>{issueStatusDictionary[issue.status]}</div>
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
            <div className={styles.bodyFooterLeft}>Обновлено: {issue.updatedAt.toLocaleString()}</div>

            <div className={styles.bodyFooterRight}>
              <div>
                <Select
                  onChange={setStatusSelectValue}
                  className={styles.selects}
                  options={preparedOptionsForStatusSelect}
                  value={statusSelectValue}
                />
                <Select
                  onChange={setPrioritySelectValue}
                  className={styles.selects}
                  options={preparedOptionsForPrioritySelect}
                  value={prioritySelectValue}
                />
              </div>
              <Button type="link">Ответить</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IssueItem;
