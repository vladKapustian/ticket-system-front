import Link from "next/link";
import { useContext, useState } from "react";
import Image from "next/image";

import { EmailContext } from "@/utils/EmailContext";
import ExitSVG from "../../../public/exit.svg";
import styles from "./styles.module.scss";
import { Divider } from "antd";

export const Navbar = ({ setCookies }: { setCookies: (name: "token", value: any) => void }) => {
  let userEmail;
  if (typeof window !== "undefined") {
    userEmail = localStorage.getItem("userEmail");
  }
  // const { userEmail } = useContext(EmailContext);

  return (
    <div className={styles.navbarContainer}>
      <h1 className={styles.brandLogoHeader}>Тикеты</h1>
      <div className={styles.navbarRightContainer}>
        <h3>{userEmail}</h3>
        <Image onClick={() => setCookies("token", null)} src={ExitSVG} alt="Выход" />
      </div>
    </div>
  );
};
