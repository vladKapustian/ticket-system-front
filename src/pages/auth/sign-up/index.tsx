import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import styles from "./styles.module.scss";
import { api } from "@/utils/axiosInstance";
import { useCookies } from "react-cookie";
import Link from "next/link";

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

const onFormSubmit = async (values: ISignUpFormData) => {
  console.log(values);

  try {
    const response = await api.post("/auth/sign-up", values);
    if (response.data.statusCode === 404) throw new Error(response.data.message);
  } catch (error) {
    console.log(error);
  }
};

export default function SignUp() {
  return (
    <div className={styles.contentContainer}>
      <Form
        name="normal_login"
        className={styles.loginFormContainer}
        initialValues={{ remember: true }}
        onFinish={onFormSubmit}
      >
        <Form.Item name="firstname" rules={[{ required: true, message: "Поле 'Имя' является обязательным" }]}>
          <Input placeholder="Имя" />
        </Form.Item>
        <Form.Item name="lastname" rules={[{ required: true, message: "Поле 'Фамилия' является обязательным" }]}>
          <Input placeholder="Фамилия" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Поле 'Логин' является обязательным" },
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
          <Input type="password" placeholder="Пароль" />
        </Form.Item>

        <Form.Item className={styles.signInButtons}>
          <Button type="primary" htmlType="submit" className={styles.formSubmitButton}>
            Зарегистрироваться
          </Button>
          или <Link href="/auth/sign-in">войти</Link>
        </Form.Item>
      </Form>
    </div>
  );
}
