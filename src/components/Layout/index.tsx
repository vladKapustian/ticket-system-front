// Импортируем нужные вспомогательные компоненты и хуки (функции помошники работы с состоянием)
import { Layout as AntLayout, App } from "antd";
import { ReactNode, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

import { Navbar } from "../Navbar"; // Импортируем верхнюю навигационную панель
import { EmailContext } from "@/utils/EmailContext"; // Импортируем контекст почты пользователя
import styles from "./styles.module.scss"; // Импортируем стили

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter(); // Хук для работы с url и query (запросом)

  const [cookies] = useCookies(["token"]); // Достаем из файлов cookies токен авторизации пользователя

  // Условие показа компонента Navbar (не показывается на страницах с аутентификацией и созданием заявки)
  const isShowCondition = !(router.asPath.includes("/auth") || router.asPath.includes("/request"));

  // При изменении токена если при наличии токена авторизации после доменного имени и отустутствии пути после доменного имени в route
  // перенаправляем на страцу с тикетами
  useEffect(() => {
    if (cookies.token && !router.asPath) router.replace("/issues/");
    // если нет токена и пользователь не находится на странице регистрации или логина, перенаправляем его на страницу логина
    if (!cookies.token && !router.asPath.includes("/auth")) router.replace("/auth/sign-in");
  }, [cookies.token]);

  // Достаем текущее состояние (значение) почты пользовтеля из контектса
  const { userEmail, setUserEmail } = useContext(EmailContext);

  // Возвращаем jsx (обертка над React.createElement)
  return (
    <EmailContext.Provider value={{ userEmail, setUserEmail }}>
      <App>
        {/* Условное отображение заголовка страницы */}
        {isShowCondition && <Navbar />}
        <div className={styles.layoutContent}>{children}</div>
      </App>
    </EmailContext.Provider>
  );
}
