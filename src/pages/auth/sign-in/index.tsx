import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { App, Button, Card, Form, Input, Spin, Typography, message } from "antd";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import Link from "next/link";

import { SignInData } from "@/api/modules/auth";

import styles from "./styles.module.scss";
import { api } from "@/api";
import { useState } from "react";

const { Title } = Typography;

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
  const { message } = App.useApp();
  const [loading, setIsLoading] = useState(false);
  // const { userEmail, setUserEmail } = useContext(EmailContext);

  const showErrorMessage = () => {
    message.error("This is an error message");
  };

  const onFormSubmit = async (values: SignInData) => {
    try {
      setIsLoading(true);
      const response = await api.signIn(values);
      if (response.data) {
        setCookies("token", response.data, {
          expires: new Date("Thu Jan 01 2099 00:00:00 GMT+0300 (Moscow Standard Time)"),
        });

        localStorage.setItem("userEmail", values.email);

        router.replace("/view-requests");
      }
    } catch (error) {
      setIsLoading(false);
      showErrorMessage();
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <div>
      {loading && <Spin className={styles.loadingSpin} size="large" />}
      <div className={styles.layoutContainer}>
        <Card className={styles.loginFormContainer}>
          <Title level={3}>Вход в систему тикетов</Title>
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
