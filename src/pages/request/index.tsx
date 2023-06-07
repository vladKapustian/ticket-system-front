import React from "react";
import Image from "next/image";

import ReportImage from "../../../public/reportImage.svg";
import styles from "./styles.module.scss";
import { Button, Checkbox, Form, FormInstance, Input, Select } from "antd";
import { Typography } from "antd";

const { Option } = Select;
const { TextArea } = Input;
const { Title, Paragraph } = Typography;
interface IRequestFormValue {
  reporterName: string;
  reporterEmail: string;
  title: string;
}

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
        break;
    }
  };
  const onFormSubmit = (values: IRequestFormValue) => {};
  return (
    <div className={styles.requestPageContainer}>
      <Image className={styles.reportImage} src={ReportImage} alt="" />
      <div className={styles.requestFormContainer}>
        <Title className={styles.formPageTitle}>Требуется помощь?</Title>
        <Paragraph className={styles.formPageDescriptionText}>
          Мы очень ценим ваше мнение и готовы оказать вам помощь с любой проблемой при использовании нашими продуктами.
          Пожалуйста, оставьте информацию о проблеме, а также свои комментарии контактные данные, чтобы мы могли вам
          оказать поощь как можно быстрее!
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
            <Input placeholder="Фамилия" />
          </Form.Item>
          <Form.Item
            className={`${styles.formItem}`}
            label="Тема сообщения"
            name="title"
            rules={[{ required: true, message: "Поле обязательно для заполнения" }]}
          >
            <Input placeholder="Логин" />
          </Form.Item>
          <Form.Item
            className={`${styles.formItem}`}
            label="Уровень важности"
            name="priority"
            rules={[{ required: true, message: "Поле обязательно для заполнения" }]}
          >
            <Select placeholder="Выберите уровень важности заявки" onChange={onGenderChange} allowClear>
              <Option value="LOW">Низкая</Option>
              <Option value="MEDIUM">Средняя</Option>
              <Option value="HIGH">Высокая</Option>
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
        </Form>
      </div>
    </div>
  );
}
