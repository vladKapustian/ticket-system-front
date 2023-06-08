import React, { useState } from "react";

import { Issue, issuePriorityDictionary, issueStatusDictionary } from "@/types/Issue";

import styles from "./styles.module.scss";
import { Button } from "antd";

type Props = {
  issue: Issue;
};

const IssueItem = ({ issue }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClick = () => setIsOpen((prev) => !prev);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header} onClick={onClick}>
        <div className={styles.headerTop}>
          <div className={styles.headerTopLeft}>
            <div className={styles.priority}>{issuePriorityDictionary[issue.priority]}</div>
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
              <Button type="link">Ответить</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IssueItem;
