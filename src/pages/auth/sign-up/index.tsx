import { App, Button, Card, Form, Input, Spin, Typography } from "antd"; // компоненты ui-кита

import styles from "./styles.module.scss";
import Link from "next/link";
import { api } from "@/api";
import { useState } from "react";
import { useRouter } from "next/router";

// Интерфейс данных для формы регистрации
interface ISignUpFormData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

// Функция валидации пароля, (см. sign-in/index.tsx)
const validatePassword = (_: any, passwordValue: string, callback: Function) => {
  if (passwordValue.length >= 8) {
    Promise.resolve();
    callback();
  } else {
    callback("Error");
  }
};

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false); // Сотояние загрузки
  const router = useRouter(); // Функция работы с роутами
  const { message } = App.useApp(); // Функция работы с сообщениями ошибки и успеха

  // Отправка сообщения успешной регистрации
  const showSuccessMessage = () => {
    message.success("Пользователь успешно создан. Дождитесь подтверждения администатора");
  };

  // Отправка сообщения неудачной регистрации
  const showErrorMessage = () => {
    message.error("Не удалось создать пользователя. Проверьте все введенные данные или обратитесь к администратору");
  };

  // Обработчик отправки формы
  const onFormSubmit = async (values: ISignUpFormData) => {
    try {
      setIsLoading(true); // Выставляем состояние загрузки
      await api.signUp(values); // Отправляем запрос о регистрации
      showSuccessMessage(); // Показывем сообщение успеха
      router.replace("/auth/sign-in/"); // Перенаправляем пользовтеля на страницу логина
    } catch (error) {
      // Отлавливаем ошибки
      showErrorMessage(); // Показываем сообщение ошибки
    }
    setIsLoading(false); // Отключаем состояние загрузки
  };

  return (
    <div className={styles.contentContainer}>
      {/* Отображаем спиннер при загрузке */}
      {isLoading && <Spin className={styles.loadingSpin} size="large" />}
      {/* Обертка формы */}
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
          {/* Поле формы */}
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
