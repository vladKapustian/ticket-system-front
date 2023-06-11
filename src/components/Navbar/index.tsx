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
  const [_, setCookies] = useCookies(["token"]);
  const [email, setEmail] = useState<string>();
  const router = useRouter();
  const [current, setCurrent] = useState("/issues");
  const [userRole, setUserRole] = useState<string>();

  const logout = async () => {
    try {
      await api.signOut();
      setCookies("token", null);
      router.replace("auth/sign-in");
    } catch (err) {
      console.error(err);
    }
  };

  const isUserSuperadmin = (): ItemType | null => {
    if (userRole === "SUPERADMIN") {
      return {
        label: <Link href="/approve-sign-up">"Просмотр заявок"</Link>,
        key: "/approve-sign-up",
        icon: <AppstoreOutlined />,
        onClick: () => setCurrent("/approve-sign-up"),
      };
    }
    return null;
  };

  const items: MenuProps["items"] = [
    {
      label: <Link href="/issues">Просмотр тикетов</Link>,
      key: "2",
      icon: <MailOutlined />,
      onClick: () => setCurrent("/issues"),
    },
    isUserSuperadmin(),
  ];

  const setMenuSelectedItem: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
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
          defaultSelectedKeys={[router.asPath]}
          selectedKeys={[router.asPath]}
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
