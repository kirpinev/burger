import { useSelector } from "react-redux";
import { Link, Redirect, useLocation } from "react-router-dom";

import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { AppHeader } from "components/app-header/app-header";

import { selectUserInfo } from "services/selectors/select-user-info";
import { useFormMethods } from "hooks/use-form-methods";
import { appRoutes } from "constants/app-routes";

import styles from "global-styles/form.module.css";

export const LoginPage = () => {
  const { password, email, isLoggedIn } = useSelector(selectUserInfo);
  const { updateEmail, updatePassword, authorize } = useFormMethods();
  const { state } = useLocation();

  if (isLoggedIn) {
    return <Redirect to={state?.from || appRoutes.mainPage} />;
  }

  return (
    <>
      <AppHeader />
      <form onSubmit={authorize} className={styles.container}>
        <h1 className="text text_type_main-medium">Вход</h1>
        <EmailInput value={email} name="email" onChange={updateEmail} />
        <PasswordInput
          value={password}
          name="password"
          onChange={updatePassword}
        />
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
      </form>
    </>
  );
};
