import { Layout as AntLayout } from "antd";
import { ReactNode, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

import { Navbar } from "../Navbar";
import { EmailContext } from "@/utils/EmailContext";
import styles from "./styles.module.scss";

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();

  const [cookies, setCookies] = useCookies(["token"]);

  const navbarShowCondition = !(
    router.asPath.includes("sign-in") ||
    router.asPath.includes("sign-up") ||
    router.asPath.includes("request")
  );

  useEffect(() => {
    if (!router.asPath.includes("/request") && !cookies.token) router.replace("/auth/sign-in");
  }, [cookies.token]);

  const { userEmail, setUserEmail } = useContext(EmailContext);
  if (navbarShowCondition && cookies.token && userEmail) router.replace("/view-requests");
  return (
    <EmailContext.Provider value={{ userEmail, setUserEmail }}>
      {navbarShowCondition && <Navbar setCookies={setCookies} />}
      <div className={styles.layoutContent}>{children}</div>
    </EmailContext.Provider>
  );
}
