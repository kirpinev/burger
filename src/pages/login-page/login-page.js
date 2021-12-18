import { Link } from "react-router-dom";

import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { AppHeader } from "components/app-header/app-header";

import { appRoutes } from "constants/app-routes";

import styles from "global-styles/form.module.css";

export const LoginPage = () => {
  return (
    <>
      <AppHeader />
      <div className={styles.container}>
        <h1 className="text text_type_main-medium">Вход</h1>
        <EmailInput value="" name="Email" onChange={() => {}} />
        <PasswordInput value="" name="Пароль" onChange={() => {}} />
        <Button type="primary" size="medium">
          Войти
        </Button>
        <p
          className={`text text_type_main-default text_color_inactive ${styles.info}`}
        >
          Вы новый пользователь?{" "}
          <Link className={styles.link} to={appRoutes.registerPage}>
            <Button type="secondary" size="medium">
              Зарегистрироваться
            </Button>
          </Link>
        </p>
        <p
          className={`text text_type_main-default text_color_inactive ${styles.info}`}
        >
          Забыли пароль?{" "}
          <Link className={styles.link} to={appRoutes.forgotPasswordPage}>
            <Button type="secondary" size="medium">
              Восстановить пароль
            </Button>
          </Link>
        </p>
      </div>
    </>
  );
};
