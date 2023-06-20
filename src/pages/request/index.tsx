import React, { useState } from "react";
import Image from "next/image";

import ReportImage from "../../../public/reportImage.svg";
import styles from "./styles.module.scss";
import { App, Button, Card, Checkbox, Form, FormInstance, Input, Result, Select } from "antd";
import { Typography } from "antd";
import { api } from "@/api";
import { EIssuePriority } from "@/types/Issue";

const { Option } = Select; // Достаем необходимые компоеннты из инпортированных ранее
const { TextArea } = Input; // Достаем необходимые компоеннты из инпортированных ранее
const { Title, Paragraph } = Typography; // Достаем необходимые компоеннты из инпортированных ранее
interface IRequestFormValue {
  reporterName: string;
  reporterEmail: string;
  title: string;
  description: string;
  priority: EIssuePriority;
}

export default function Request() {
  const { message } = App.useApp(); // Помошник для уведомлений
  const [loading, setIsLoading] = useState(false); // Состояние загрузки
  const formRef = React.useRef<FormInstance>(null); // Создаем ссылку на форму
  const [requestIsSent, setRequestIsSent] = useState(false); // Состояние отправленного запроса

  // Функция обработчик изменения приоритета
  const onValueChange = (value: EIssuePriority) => {
    switch (value) {
      case EIssuePriority.LOW: // Если выбранный статус LOW
        formRef.current?.setFieldsValue(value); // Выставляем этот статус
        break; // Прекрыщаем проверки
      case EIssuePriority.MEDIUM:
        formRef.current?.setFieldsValue(value);
        break;
      case EIssuePriority.HIGH:
        formRef.current?.setFieldsValue(value);
        break;
    }
  };

  // Показываем сообщение ошибки
  const showErrorMessage = () => {
    message.error("Не удалось войти в аккаунт");
  };

  // Функция-обработчик отправкии формы
  const onFormSubmit = async (values: IRequestFormValue) => {
    try {
      setIsLoading(true); // Выстявляем состояние загрузки
      await api.createRequest(values); // Запрос на создаение тикета, получение ответа
      setRequestIsSent(true); // Выстаялем сосотояние отправленного тикета
    } catch (error) {
      showErrorMessage(); // Показываем сообщение ошибки пользователю
      console.error(error); // Выводим ошибку в консоль
    }
    setIsLoading(false); // Отключаем состояние загрузки
  };

  return (
    <div className={styles.requestPageContainer}>
      <Image className={styles.reportImage} src={ReportImage} alt="" />
      <div className={styles.requestFormWrapper}>
        {/* Если пользовтель еще не отправил запрос */}
        {!requestIsSent ? (
          <div className={styles.formContainer}>
            <Title className={styles.formPageTitle}>Требуется помощь?</Title>
            <Paragraph className={styles.formPageDescriptionText}>
              Мы очень ценим ваше мнение и готовы оказать вам помощь с любой проблемой при использовании нашими
              продуктами. Пожалуйста, оставьте информацию о проблеме, а также свои комментарии контактные данные, чтобы
              мы могли вам оказать поощь как можно быстрее!
            </Paragraph>
            {/* Обертка формы */}
            <Form
              layout="vertical"
              size="middle"
              name="normal_login"
              initialValues={{ remember: true }}
              onFinish={onFormSubmit}
            >
              {/* Предмет формы */}
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
                <Select placeholder="Выберите уровень важности заявки" onChange={onValueChange} allowClear>
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
                  className={styles.formTextArea}
                  placeholder="Введите текст сообщения (не более 500 сивмолов)"
                  maxLength={500}
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
                  Отправить заявку
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
