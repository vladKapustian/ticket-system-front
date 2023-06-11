import { App, Button, Card, Form, Input, Spin, Typography } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import styles from "./styles.module.scss";
import { useCookies } from "react-cookie";
import Link from "next/link";
import { api } from "@/api";
import { useState } from "react";
import { useRouter } from "next/router";

interface ISignUpFormData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

const validatePassword = (_: any, passwordValue: string, callback: Function) => {
  if (passwordValue.length >= 8) {
    Promise.resolve();
    callback();
  } else {
    callback("Error");
  }
};

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { message } = App.useApp();

  const showSuccessMessage = () => {
    message.success("Пользователь успешно создан. Дождитесь подтверждения администатора");
  };

  const showErrorMessage = () => {
    message.success("Не удалось создать пользователя. Проверьте все введенные данные или обратитесь к администратору");
  };

  const onFormSubmit = async (values: ISignUpFormData) => {
    try {
      setIsLoading(true);
      await api.signUp(values);
      showSuccessMessage();
      router.replace("/auth/sign-in/");
    } catch (error) {
      console.log(error);
      showErrorMessage();
    }
    setIsLoading(false);
  };
  return (
    <div className={styles.contentContainer}>
      {isLoading && <Spin className={styles.loadingSpin} size="large" />}
      <Card className={styles.formContainer}>
        <Typography.Title level={3}>Вход в систему тикетов</Typography.Title>
        <Form
          layout="vertical"
          size="middle"
          name="normal_login"
          className={styles.loginFormContainer}
          initialValues={{ remember: true }}
          onFinish={onFormSubmit}
        >
          <Form.Item
            label="Имя"
            name="firstname"
            rules={[{ required: true, message: "Поле 'Имя' является обязательным" }]}
          >
            <Input placeholder="Имя" />
          </Form.Item>
          <Form.Item
            label="Фамилия"
            name="lastname"
            rules={[{ required: true, message: "Поле 'Фамилия' является обязательным" }]}
          >
            <Input placeholder="Фамилия" />
          </Form.Item>
          <Form.Item
            label="email"
            name="email"
            rules={[
              { required: true, message: "Поле обязательно для заполнения" },
              {
                required: true,
                type: "email",
                message: "Некорректный адрес электронной почты",
              },
            ]}
          >
            <Input placeholder="E-mail" />
          </Form.Item>
          <Form.Item
            label="Пароль"
            name="password"
            rules={[
              { required: true, message: "Поле 'Пароль' является обязательным" },
              {
                validator: validatePassword,
                message: "Поле 'Пароль' должно содержать минимум 8 символов",
                required: true,
              },
            ]}
          >
            <Input.Password placeholder="Пароль" />
          </Form.Item>

          <Form.Item className={styles.signInButtons}>
            <Button type="primary" htmlType="submit" className={styles.formSubmitButton}>
              Зарегистрироваться
            </Button>
            или <Link href="/auth/sign-in">войти</Link>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
