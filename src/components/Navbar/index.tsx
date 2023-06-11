import { Button, Layout, Menu, Typography } from "antd";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

import styles from "./styles.module.scss";
import { api } from "@/api";
import Link from "next/link";

export const Navbar = () => {
  const [_, setCookies] = useCookies(["token"]);
  const [email, setEmail] = useState("");
  const router = useRouter();

  const logout = async () => {
    try {
      await api.signOut();
      setCookies("token", null);
      router.replace("auth/sign-in");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setEmail(localStorage.getItem("userEmail") || "");
  }, []);

  return (
    <Layout.Header className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.leftContent}>
          <Typography.Title className={styles.logo} level={2}>
            Тикеты
          </Typography.Title>
          <Link href="/approve-sign-up/">
            <Typography.Title className={styles.approveSignupLink} level={4}>
              Заявки вступления в техподдержку
            </Typography.Title>
          </Link>
        </div>
        <div className={styles.rightContent}>
          <span className={styles.email}>{email}</span>
          <Button onClick={logout} className={styles.logoutButton}>
            Выйти
          </Button>
        </div>
      </div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]} />
    </Layout.Header>
  );
};
