import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { App, Button, Card, Form, Input, Spin, Typography } from "antd";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import Link from "next/link";

import { SignInData } from "@/api/modules/auth";

import styles from "./styles.module.scss";
import { api } from "@/api";
import { useState } from "react";

// Функция валидации пароля
const validatePassword = (_: any, passwordValue: string, callback: (error?: string) => void) => {
  if (passwordValue.length >= 8) {
    // на каждый ввод символа проверяем длину строки
    Promise.resolve(); // При успешной проверке ничего не отображаем
    callback();
  } else {
    callback("Error"); // Выдаем ошибку если проверка провалилась
  }
};

// Страница логина
export default function SignIn() {
  const router = useRouter(); // Хук для работы роутингом
  const [, setCookies] = useCookies(["token", "email"]); // Достаем email пользователя из cookies
  const [isLoading, setIsLoading] = useState(false); // Состояние загрузки
  const { message } = App.useApp(); // Помошник для уведомлений

  // Функция-обработчик отправкии формы
  const onFormSubmit = async (values: SignInData) => {
    setIsLoading(true); // Выстявляем состояние загрузки
    try {
      const response = await api.signIn(values); // Запрос на логин, получение ответа

      // Если в поле data ответа что-то лежит
      if (response.data) {
        // Кладем в куки токен для аутентификации
        setCookies("token", response.data.token, {
          expires: new Date("Thu Jan 01 2099 00:00:00 GMT+0300 (Moscow Standard Time)"), // Дата истечения
        });
        localStorage.setItem("role", response.data.role); // Кладем в localstorage роль пользователя
        localStorage.setItem("userEmail", values.email); // Кладем в localStorage почту пооьзователя
        router.replace("/issues"); // перенаправляем на страницу с тикетами
      }
    } catch (error) {
      message.error("Не удалось войти в аккаунт"); // Сообщение ошибки
      console.error(error); // Выводим в консоль
    }
    setIsLoading(false); // Отключаем состояние загрузки
  };

  return (
    <div className={`${styles.layoutWrapper} ${isLoading ? styles.layoutWrapperLoading : ""}`}>
      {isLoading && (
        <div className={styles.loadingCOntainer}>
          <Spin className={styles.loadingSpin} size="large" />
        </div>
      )}
      {/* Контейнер для тела страницы */}
      <div className={styles.layoutContainer}>
        <Card className={styles.loginFormContainer}>
          <Typography.Title level={3}>Вход в систему тикетов</Typography.Title>
          {/* Компонент формы */}
          <Form
            layout="vertical"
            name="normal_login"
            className={styles.loginForm}
            initialValues={{ remember: true }}
            onFinish={onFormSubmit}
          >
            {/* Поле формы */}
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
