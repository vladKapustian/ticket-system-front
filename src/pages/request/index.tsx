import React, { useState } from "react";
import Image from "next/image";

import ReportImage from "../../../public/reportImage.svg";
import styles from "./styles.module.scss";
import { App, Button, Card, Checkbox, Form, FormInstance, Input, Result, Select } from "antd";
import { Typography } from "antd";
import { useRouter } from "next/router";
import { api } from "@/api";
import { EIssuePriority } from "@/types/Issue";

const { Option } = Select;
const { TextArea } = Input;
const { Title, Paragraph } = Typography;
interface IRequestFormValue {
  reporterName: string;
  reporterEmail: string;
  title: string;
  description: string;
  priority: EIssuePriority;
}

export default function Request() {
  const router = useRouter();
  const { message } = App.useApp();
  const [loading, setIsLoading] = useState(false);
  const formRef = React.useRef<FormInstance>(null);
  const [requestIsSent, setRequestIsSent] = useState(false);

  const onValuerChange = (value: EIssuePriority) => {
    switch (value) {
      case EIssuePriority.LOW:
        formRef.current?.setFieldsValue(value);
        break;
      case EIssuePriority.MEDIUM:
        formRef.current?.setFieldsValue(value);
        break;
      case EIssuePriority.HIGH:
        formRef.current?.setFieldsValue(value);
        break;
    }
  };

  const showErrorMessage = () => {
    message.error("Не удалось войти в аккаунт");
  };

  const onFormSubmit = async (values: IRequestFormValue) => {
    try {
      setIsLoading(true);
      const response = await api.createRequest(values);
      setRequestIsSent(true);
    } catch (error) {
      setIsLoading(false);
      showErrorMessage();
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.requestPageContainer}>
      <Image className={styles.reportImage} src={ReportImage} alt="" />

      <div className={styles.requestFormWrapper}>
        {!requestIsSent ? (
          <div className={styles.formContainer}>
            <Title className={styles.formPageTitle}>Требуется помощь?</Title>
            <Paragraph className={styles.formPageDescriptionText}>
              Мы очень ценим ваше мнение и готовы оказать вам помощь с любой проблемой при использовании нашими
              продуктами. Пожалуйста, оставьте информацию о проблеме, а также свои комментарии контактные данные, чтобы
              мы могли вам оказать поощь как можно быстрее!
            </Paragraph>
            <Form
              layout="vertical"
              size="middle"
              name="normal_login"
              initialValues={{ remember: true }}
              onFinish={onFormSubmit}
            >
              <Form.Item
                className={`${styles.formItem}`}
                label="Как к вам можно обращаться"
                name="reporterName"
                rules={[{ required: true, message: "Поле обязательно для заполнения" }]}
              >
                <Input placeholder="Имя" />
              </Form.Item>
              <Form.Item
                className={`${styles.formItem}`}
                label="Email"
                name="reporterEmail"
                rules={[{ required: true, message: "Поле обязательно для заполнения" }]}
              >
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item
                className={`${styles.formItem}`}
                label="Тема сообщения"
                name="title"
                rules={[{ required: true, message: "Поле обязательно для заполнения" }]}
              >
                <Input placeholder="Тема" />
              </Form.Item>
              <Form.Item
                className={`${styles.formItem}`}
                label="Уровень важности"
                name="priority"
                rules={[{ required: true, message: "Поле обязательно для заполнения" }]}
              >
                <Select placeholder="Выберите уровень важности заявки" onChange={onValuerChange} allowClear>
                  <Option value={EIssuePriority.LOW}>Низкая</Option>
                  <Option value={EIssuePriority.MEDIUM}>Средняя</Option>
                  <Option value={EIssuePriority.HIGH}>Высокая</Option>
                </Select>
              </Form.Item>
              <Form.Item
                className={`${styles.formItem}`}
                rules={[{ required: true, message: "Поле обязательно для заполнения" }]}
                label="Текст сообщения"
                name="description"
              >
                <TextArea
                  placeholder="Введите текст сообщения (не более 1000 сивмолов)"
                  maxLength={1000}
                  rows={6}
                ></TextArea>
              </Form.Item>
              <Form.Item
                className={`${styles.formItem}`}
                name="agrrement"
                valuePropName="checked"
                rules={[
                  {
                    required: true,
                    message: "Нужно дать согласие на обработку персональных данных",
                  },
                ]}
              >
                <Checkbox className={`${styles.formItem} ${styles.requestFormCheckbox}`}>
                  Я даю согласие на обработку своих персональных данных
                </Checkbox>
              </Form.Item>

              <Form.Item className={styles.signInButtons}>
                <Button type="primary" htmlType="submit" className={styles.formSubmitButton}>
                  Зарегистрироваться
                </Button>
              </Form.Item>
            </Form>{" "}
          </div>
        ) : (
          <Result status="success" title="Заявка успешно создана"></Result>
        )}
      </div>
    </div>
  );
}
