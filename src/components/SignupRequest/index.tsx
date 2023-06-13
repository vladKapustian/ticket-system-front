// Импортируем нужные вспомогательные компоненты
import { TUser, UserRole } from "@/api/modules/signupRequests";
import { Button, Card, Typography } from "antd";
import { api } from "@/api";

import styles from "./styles.module.scss"; // стили для страницы

type Props = {
  request: TUser;
};

// Компонент карточки пользователя (может быть подтвержденным или нет)
// Если пользователь подтвержен, отображаем его роль, в противном случае
// Отображаем кнопку подтвердить пользователя
const SignupRequest = ({ request }: Props) => {
  //Функция-обработчик для клика на кнопку `Одобрить регистрацию`
  const approveSignup = () => {
    try {
      api.confirmUsers({ id: request.id }); // Отправляем запрос на регистрацию
    } catch (error) {
      console.error(error); // Отлавливаем ошибку
    }
  };

  return (
    <Card
      className={styles.signupRequestWrapper}
      title={<Typography.Text className={styles.requestTitle}>{request.email}</Typography.Text>} // Почта
    >
      <div className={styles.requestCardBody}>
        <Typography.Text>Имя: {request.firstname}</Typography.Text>
        <Typography.Text>Фамилия: {request.lastname}</Typography.Text>

        {request.role === UserRole.UNCONFIRMED ? ( // Если роль пользователя неподтерждена, отображаем кнопку `Одобрить регистрацию`
          <div className={styles.approveButtonContainer}>
            <Button type="primary" onClick={approveSignup}>
              Одобрить регистрацию
            </Button>
          </div>
        ) : (
          // Отображаем роль
          <Typography.Text className={styles.approveButtonContainer}>Роль: Администратор</Typography.Text>
        )}
      </div>
    </Card>
  );
};
export { SignupRequest };
