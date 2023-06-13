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

const preparedOptionsForStatusSelect = Object.entries(EIssueStatus).map(([key, value]) => ({
  label: key,
  value,
}));
const preparedOptionsForPrioritySelect = Object.entries(EIssuePriority).map(([key, value]) => ({
  label: key,
  value,
}));

const IssueItem = ({ issue }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [statusSelectValue, setStatusSelectValue] = useState<EIssueStatus>(EIssueStatus[issue.status]);
  const [prioritySelectValue, setPrioritySelectValue] = useState<EIssuePriority>(EIssuePriority[issue.priority]);
  // const [responseModalIsOpen, setResponseModalIsOpen] = useState(false);

  const statusBorderColor = EIssuePriorityColor[issue.priority];

  const onClick = () => setIsOpen((prev) => !prev);

  // const openModal = () => {
  //   setResponseModalIsOpen(true);
  // };

  // const handleOk = () => {
  //   setResponseModalIsOpen(false);
  // };

  // const handleCancel = () => {
  //   setResponseModalIsOpen(false);
  // };

  const changePriority = () => {
    try {
    } catch (error) {}
  };

  useEffect(() => {
    api.updateRequestPriority({ priority: prioritySelectValue }, issue.id);
  }, [prioritySelectValue]);

  useEffect(() => {
    api.updateRequestStatus({ status: statusSelectValue }, issue.id);
  }, [statusSelectValue]);

  return (
    <>
      {/* <Modal open={responseModalIsOpen} onOk={handleOk} onCancel={handleCancel}>
        <Typography.Title level={2}>Закрытие тикета {issue.title}</Typography.Title>
        <Form className={styles.formContainer} layout="vertical">
          <Form.Item label="Текст ответа" name="message">
            <Input.TextArea className={styles.formMessageInput} placeholder="Текст ответа на обращение" />
          </Form.Item>
          <Form.Item className={styles.formOptionsInput} label="Статус тикета" name="status">
            <Select
              onChange={setStatusSelectValue}
              className={styles.selects}
              options={preparedOptionsForStatusSelect}
              value={statusSelectValue}
            />
          </Form.Item>
        </Form>
      </Modal> */}
      <div className={styles.wrapper}>
        <div className={styles.header} onClick={onClick}>
          <div className={styles.statusIndicator} style={{ backgroundColor: statusBorderColor }} />
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
                <div className={styles.footerRightItemWrapper}>
                  <Typography.Text>Статус</Typography.Text>
                  <Select
                    onChange={setStatusSelectValue}
                    className={styles.selects}
                    options={preparedOptionsForStatusSelect}
                    value={statusSelectValue}
                  />
                </div>
                <div className={styles.footerRightItemWrapper}>
                  <Typography.Text>Приоритет</Typography.Text>
                  <Select
                    onChange={setPrioritySelectValue}
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
