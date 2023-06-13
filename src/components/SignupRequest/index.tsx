import { TUser, UserRole } from "@/api/modules/signupRequests";
import { Button, Card, Typography } from "antd";
import { type } from "os";
import styles from "./styles.module.scss";
import { api } from "@/api";
import { useState } from "react";

type Props = {
  request: TUser;
};

const SignupRequest = ({ request }: Props) => {
  const [isSigidUp, setIsSignedUp] = useState(request.role === UserRole.OPERATOR);
  const approveSignup = () => {
    try {
      api.confirmUsers({ id: request.id });
      setIsSignedUp(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card
      className={styles.signupRequestWrapper}
      title={<Typography.Text className={styles.requestTitle}>{request.email}</Typography.Text>}
    >
      <div className={styles.requestCardBody}>
        <Typography.Text>Имя: {request.firstname}</Typography.Text>
        <Typography.Text>Фамилия: {request.lastname}</Typography.Text>

        {!isSigidUp ? (
          <div className={styles.approveButtonContainer}>
            <Button type="primary" onClick={approveSignup}>
              Одобрить регистрацию
            </Button>
          </div>
        ) : (
          <Typography.Text className={styles.approveButtonContainer}>Роль: Администратор</Typography.Text>
        )}
      </div>
    </Card>
  );
};
export { SignupRequest };
