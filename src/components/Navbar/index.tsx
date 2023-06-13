// Импортируем нужные вспомогательные компоненты и хуки (функции помошники работы с состоянием)
import { Button, Layout, Menu, MenuProps } from "antd";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import Link from "next/link";
import { AppstoreOutlined, MailOutlined } from "@ant-design/icons";
import { ItemType } from "antd/es/menu/hooks/useItems";

import styles from "./styles.module.scss"; // стили для страницы
import { api } from "@/api"; // объект для обмена данными с бэком

// Компонент заголовка
export const Navbar = () => {
  const router = useRouter(); // Объект для работы с URL и query (параметрами запроса)
  const [, setCookies] = useCookies(["token"]); // Инициализируем состояние файлов cookies
  const [email, setEmail] = useState(""); // Инициализируем состояние почты пользовтеля (по умолчанию пустая строка)
  const [current, setCurrent] = useState(router.asPath.includes("issues") ? "issues" : "users"); // Инициализируем состояние текущего выбранного блока
  const [userRole, setUserRole] = useState(""); // Инициализируем состояние текущей роли пользователя

  // Функция для выхода из аккаунта
  const logout = async () => {
    try {
      await api.signOut(); // Отправляем запрос на выход из аккаунта
      setCookies("token", null); // Очищаем cookies
      router.replace("/auth/sign-in"); // Переносим пользовтеля на страницу аутентификации
    } catch (err) {
      console.error(err); // Отлавливаем ошибку
    }
  };

  // Функция, отвечающая за отображение пункта меню с обзором всех активных пользователей и заявок
  const isUserSuperadmin = (): ItemType | null => {
    if (userRole === "SUPERADMIN") {
      // Отображаем, только если пользователь суперадмин (1 человек)
      return {
        label: <Link href="/users">Пользователи</Link>, // Текст с ссылкой на страницу
        key: "users", // Ключ значения
        icon: <AppstoreOutlined />, // Иконка
      };
    }
    return null; // Если пользователь не суперадмин, ничего не возращаем
  };

  // Данные для пунктов меню
  const items: MenuProps["items"] = [
    {
      label: <Link href="/issues">Просмотр тикетов</Link>, // Текст с ссылкой на страницу
      key: "issues", // Ключ значения
      icon: <MailOutlined />, // Иконка
    },
    isUserSuperadmin(),
  ];

  // Функция для выбора пункта меню
  const setMenuSelectedItem: MenuProps["onClick"] = (e) => {
    setCurrent(e.key); // Выставляем активным пункт с ключом `e`
  };

  // При загрузке страницы
  useEffect(() => {
    setEmail(localStorage.getItem("userEmail") || ""); // Достаем почту из localStorage (хранилище данных в браузере)
    const role = localStorage.getItem("role"); // Достаем роль пользователя
    if (role) setUserRole(role); // Выставляем роль пользователя при наличии
  }, []);

  // Возвращаем jsx (обертка над React.createElement)
  return (
    <Layout.Header className={styles.navbar}>
      <div className={styles.navbarContainer}>
        {/* Компонент меню */}
        <Menu
          // Выставляем стили для адаптирования меню под разные устройства
          style={{ minWidth: 0, flex: "auto" }}
          // Css класс
          className={styles.menuItems}
          // Опции для меню
          items={items}
          // Тема для меню
          theme="light"
          // Горизонтальное отображение меню
          mode="horizontal"
          // При клике на элемент вызываем фунцию setMenuSelectedItem
          onClick={setMenuSelectedItem}
          // Выставляем выбранное в данный момент значение
          selectedKeys={[current]}
        />
        <div className={styles.rightContent}>
          {/* Отображаем почту пользователя при наличии */}
          <span className={styles.email}>{email}</span>
          {/* Кнопка выйти с обработчиком событий logout */}
          <Button onClick={logout} className={styles.logoutButton}>
            Выйти
          </Button>
        </div>
      </div>
    </Layout.Header>
  );
};
