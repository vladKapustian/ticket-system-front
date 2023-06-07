import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import Link from "next/link";

import { SignInData } from "@/api/modules/auth";

import styles from "./styles.module.scss";
import { api } from "@/api";

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
  // const { userEmail, setUserEmail } = useContext(EmailContext);

  const onFormSubmit = async (values: SignInData) => {
    try {
      console.log(values);
      const response = await api.signIn(values);
      if (response.data) {
        setCookies("token", response.data, {
          expires: new Date("Thu Jan 01 2099 00:00:00 GMT+0300 (Moscow Standard Time)"),
        });

        localStorage.setItem("userEmail", values.email);
        console.log(cookies);

        router.replace("/view-requests");
      }
      console.log(response.data.token);
    } catch (error) {
      console.error(error);
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
    </div>
  );
}
