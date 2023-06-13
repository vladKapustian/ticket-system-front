import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { App, Button, Card, Form, Input, Spin, Typography } from "antd";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import Link from "next/link";

import { SignInData } from "@/api/modules/auth";

import styles from "./styles.module.scss";
import { api } from "@/api";
import { useState } from "react";

const validatePassword = (_: any, passwordValue: string, callback: (error?: string) => void) => {
  if (passwordValue.length > +8) {
    Promise.resolve();
    callback();
  } else {
    callback("Error");
  }
};

export default function SignIn() {
  const router = useRouter();
  const [cookies, setCookies] = useCookies(["token", "email"]);
  const [isLoading, setIsLoading] = useState(false);
  const { message } = App.useApp();

  const showErrorMessage = () => {
    message.error("Не удалось войти в аккаунт");
  };

  const onFormSubmit = async (values: SignInData) => {
    try {
      setIsLoading(true);
      const response = await api.signIn(values);

      if (response.data) {
        setCookies("token", response.data.token, {
          expires: new Date("Thu Jan 01 2099 00:00:00 GMT+0300 (Moscow Standard Time)"),
        });
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("userEmail", values.email);
        router.replace("/issues");
      }
    } catch (error) {
      showErrorMessage();
      console.error(error);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  return (
    <div className={`${styles.layoutWrapper} ${isLoading ? styles.layoutWrapperLoading : ""}`}>
      {isLoading && (
        <div className={styles.loadingCOntainer}>
          <Spin className={styles.loadingSpin} size="large" />
        </div>
      )}
      <div className={styles.layoutContainer}>
        <Card className={styles.loginFormContainer}>
          <Typography.Title level={3}>Вход в систему тикетов</Typography.Title>
          <Form
            layout="vertical"
            name="normal_login"
            className={styles.loginForm}
            initialValues={{ remember: true }}
            onFinish={onFormSubmit}
          >
            <Form.Item
              label="Имя пользователя"
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
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="E-mail" />
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
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Пароль"
              />
            </Form.Item>
            <Form.Item className={styles.signInButtons}>
              <Button type="primary" htmlType="submit" className={styles.formSubmitButton}>
                Войти
              </Button>
              или <Link href="/auth/sign-up">зарегистрироваться</Link>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
}
