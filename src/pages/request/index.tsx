import React from "react";
import Image from "next/image";

import ReportImage from "../../../public/reportImage.svg";
import styles from "./styles.module.scss";
import { Button, Checkbox, Form, FormInstance, Input, Select } from "antd";

const { Option } = Select;
const { TextArea } = Input;

export default function Request() {
  const formRef = React.useRef<FormInstance>(null);

  const onGenderChange = (value: string) => {
    switch (value) {
      case "LOW":
        formRef.current?.setFieldsValue(value);
        break;
      case "MEDIUM":
        formRef.current?.setFieldsValue(value);
        break;
      case "HIGH":
        formRef.current?.setFieldsValue(value);
    }
  };
  const onFormSubmit = () => {};
  return (
    <div className={styles.requestPageContainer}>
      <Image className={styles.reportImage} src={ReportImage} alt="" />
      <div className={styles.requestFormContainer}>
        <h1 className={styles.formPageTitle}>Требуется помощь?</h1>
        <p className={styles.formPageDescriptionText}>
          Мы очень ценим ваше мнение и готовы оказать вам помощь с любой проблемой при использовании нашими продуктами.
          Пожалуйста, оставьте информацию о проблеме, а также свои комментарии контактные данные, чтобы мы могли вам
          оказать поощь как можно быстрее!
        </p>
        <Form
          layout="vertical"
          size="large"
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={onFormSubmit}
        >
          <Form.Item
            label="Как к вам можно обращаться"
            name="reporterName"
            rules={[{ required: true, message: "Поле 'Как к вам можно обращаться' является обязательным" }]}
          >
            <Input placeholder="Имя" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="reporterEmail"
            rules={[{ required: true, message: "Поле 'Email' является обязательным" }]}
          >
            <Input placeholder="Фамилия" />
          </Form.Item>
          <Form.Item
            label="Тема сообщения"
            name="title"
            rules={[
              { required: true, message: "Поле 'Тема сообщения' является обязательным" },
              {
                required: true,
                type: "email",
                message: "Пожалуйста, введите корректную почту",
              },
            ]}
          >
            <Input placeholder="Логин" />
          </Form.Item>
          <Form.Item
            label="Уровень важности"
            name="priority"
            rules={[{ required: true, message: "Поле 'Уровень важности' является обязательным" }]}
          >
            <Select placeholder="Select a option and change input text above" onChange={onGenderChange} allowClear>
              <Option value="LOW">Низкая</Option>
              <Option value="MEDIUM">Средняя</Option>
              <Option value="HIGH">Высокая</Option>
            </Select>
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "Поле 'Текст сообщения' является обязательным" }]}
            label="Текст сообщения"
            name="description"
          >
            <TextArea
              placeholder="Введите текст сооьщения (не более 1000 сивмолов)"
              maxLength={1000}
              rows={6}
            ></TextArea>
          </Form.Item>
          <Form.Item
            name="agrrement"
            valuePropName="checked"
            rules={[
              {
                required: true,
                message: "Для пользованием данных нужно дать согласие на обработку персональных данных",
              },
            ]}
          >
            <Checkbox>Я даю согласие на обработку своих персональных данных</Checkbox>
          </Form.Item>

          <Form.Item className={styles.signInButtons}>
            <Button type="primary" htmlType="submit" className={styles.formSubmitButton}>
              Зарегистрироваться
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
