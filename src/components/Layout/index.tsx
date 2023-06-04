import { Layout as AntLayout } from "antd";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

import { Navbar } from "../Navbar";
import { EmailContext } from "@/utils/EmailContext";
import styles from "./styles.module.scss";

const { Header, Content } = AntLayout;

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();

  const [cookies, setCookies] = useCookies(["token"]);
  useEffect(() => {
    if (!cookies.token) router.replace("/auth/sign-in");
  }, [cookies.token]);

  const [userEmail, setUserEmail] = useState("");

  return (
    <EmailContext.Provider value={{ userEmail, setUserEmail }}>
      <AntLayout>
        <Header className={styles.layoutHeader}>
          <Navbar setCookies={setCookies} />
        </Header>
        <Content className={styles.layoutContent}>{children}</Content>
      </AntLayout>
    </EmailContext.Provider>
  );
}
