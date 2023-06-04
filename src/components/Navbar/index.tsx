import Link from "next/link";
import { useContext } from "react";
import Image from "next/image";

import { EmailContext } from "@/utils/EmailContext";
import ExitSVG from "../../../public/exit.svg";
import styles from "./styles.module.scss";
import { Divider } from "antd";

export const Navbar = ({ setCookies }: { setCookies: (name: "token", value: any) => void }) => {
  const { userEmail } = useContext(EmailContext);

  return (
    <>
      <div className={styles.navbarContainer}>
        <Link href="/request">Подать заявку</Link>
        {userEmail !== "" && (
          <div>
            <h3>{userEmail}</h3>
            <Image onClick={() => setCookies("token", null)} src={ExitSVG} alt="Выход" />
          </div>
        )}
      </div>
    </>
  );
};
