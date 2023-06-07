import { Button, Checkbox, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import styles from "./styles.module.scss";
import { api } from "@/utils/axiosInstance";
import { useCookies } from "react-cookie";
import Link from "next/link";
import { useContext } from "react";
import { EmailContext } from "@/utils/EmailContext";
import { useRouter } from "next/router";

interface IFormData {
  password: string;
  email: string;
}

const validatePassword = (_: any, passwordValue: string, callback: Function) => {
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
  // const { userEmail, setUserEmail } = useContext(EmailContext);

  const onFormSubmit = async (values: IFormData) => {
    console.log(values);

    try {
      console.log(values);
      const response = await api.post("/sign-in", values);
      if (response.data.statusCode === 404) throw new Error(response.data.message);
      if (response.data) {
        setCookies("token", response.data);

        localStorage.setItem("userEmail", values.email);
        console.log(cookies);

        router.replace("/view-requests");
      }
      console.log(response.data.token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.layoutContainer}>
      <Form
        name="normal_login"
        className={styles.loginFormContainer}
        initialValues={{ remember: true }}
        onFinish={onFormSubmit}
      >
        <h3>Имя пользователя</h3>
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
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Логин" />
        </Form.Item>
        <h3>Пароль</h3>
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
          <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Пароль" />
        </Form.Item>
        <Form.Item className={styles.signInButtons}>
          <Button type="primary" htmlType="submit" className={styles.formSubmitButton}>
            Войти
          </Button>
          или <Link href="/auth/sign-up">зарегистрироваться</Link>
        </Form.Item>
      </Form>
    </div>
  );
}
