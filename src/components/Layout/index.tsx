import { Layout as AntLayout } from "antd";
import { ReactNode, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

import { Navbar } from "../Navbar";
import { EmailContext } from "@/utils/EmailContext";
import styles from "./styles.module.scss";

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();

  const [cookies] = useCookies(["token"]);

  const isShowCondition = !(router.asPath.includes("/auth") || router.asPath.includes("/request"));

  useEffect(() => {
    console.log(!cookies.token && !router.asPath.includes("/auth"));

    if (!cookies.token && !router.asPath.includes("/auth")) router.replace("/auth/sign-in");
  }, [cookies.token]);

  const { userEmail, setUserEmail } = useContext(EmailContext);

  return (
    <EmailContext.Provider value={{ userEmail, setUserEmail }}>
      {isShowCondition && <Navbar />}
      <div className={styles.layoutContent}>{children}</div>
    </EmailContext.Provider>
  );
}
