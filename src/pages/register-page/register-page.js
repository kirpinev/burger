import { Link } from "react-router-dom";

import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { AppHeader } from "components/app-header/app-header";

import { appRoutes } from "constants/app-routes";

import styles from "global-styles/form.module.css";

export const RegisterPage = () => {
  return (
    <>
      <AppHeader />
      <div className={styles.container}>
        <h1 className="text text_type_main-medium">Регистрация</h1>
        <Input placeholder="Имя" value="" onChange={() => {}} />
        <EmailInput value="" name="Email" onChange={() => {}} />
        <PasswordInput value="" name="Пароль" onChange={() => {}} />
        <Button type="primary" size="medium">
          Зарегистрироваться
        </Button>
        <p
          className={`text text_type_main-default text_color_inactive ${styles.info}`}
        >
          Уже зарегистрированы?{" "}
          <Link className={styles.link} to={appRoutes.loginPage}>
            Войти
          </Link>
        </p>
      </div>
    </>
  );
};
