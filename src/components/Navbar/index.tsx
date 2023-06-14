import { Button, Layout, Menu, MenuProps } from "antd";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

import styles from "./styles.module.scss";
import { api } from "@/api";
import Link from "next/link";
import { AppstoreOutlined, MailOutlined } from "@ant-design/icons";
import { ItemType } from "antd/es/menu/hooks/useItems";

export const Navbar = () => {
  const [, setCookies] = useCookies(["token"]);
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [current, setCurrent] = useState(router.asPath.includes("issues") ? "issues" : "users");
  const [userRole, setUserRole] = useState("");

  const logout = async () => {
    try {
      await api.signOut();
      setCookies("token", null);
      localStorage.clear();
      router.replace("/auth/sign-in");
    } catch (err) {
      console.error(err);
    }
  };

  const isUserSuperadmin = (): ItemType | null => {
    if (userRole === "SUPERADMIN") {
      return {
        label: <Link href="/users">Пользователи</Link>,
        key: "users",
        icon: <AppstoreOutlined />,
      };
    }
    return null;
  };

  const items: MenuProps["items"] = [
    {
      label: <Link href="/issues">Просмотр тикетов</Link>,
      key: "issues",
      icon: <MailOutlined />,
    },
    isUserSuperadmin(),
  ];

  const setMenuSelectedItem: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  useEffect(() => {
    setEmail(localStorage.getItem("userEmail") || "");
    const role = localStorage.getItem("role");
    if (role) setUserRole(role);
  }, []);

  return (
    <Layout.Header className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <Menu
          style={{ minWidth: 0, flex: "auto" }}
          className={styles.menuItems}
          items={items}
          theme="light"
          mode="horizontal"
          onClick={setMenuSelectedItem}
          selectedKeys={[current]}
        />
        <div className={styles.rightContent}>
          <span className={styles.email}>{email}</span>
          <Button onClick={logout} className={styles.logoutButton}>
            Выйти
          </Button>
        </div>
      </div>
    </Layout.Header>
  );
};
