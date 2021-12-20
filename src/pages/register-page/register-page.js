import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { AppHeader } from "components/app-header/app-header";

import { selectUserInfo } from "services/selectors/select-user-info";
import { useFormMethods } from "hooks/use-form-methods";
import { appRoutes } from "constants/app-routes";

import styles from "global-styles/form.module.css";

export const RegisterPage = () => {
  const { name, password, email, isLoggedIn } = useSelector(selectUserInfo);
  const { updateName, updateEmail, updatePassword, register } =
    useFormMethods();

  if (isLoggedIn) {
    return <Redirect to={appRoutes.mainPage} />;
  }

  return (
    <>
      <AppHeader />
      <form onSubmit={register} className={styles.container}>
        <h1 className="text text_type_main-medium">Регистрация</h1>
        <Input
          placeholder="Имя"
          value={name}
          name="name"
          onChange={updateName}
        />
        <EmailInput value={email} name="email" onChange={updateEmail} />
        <PasswordInput
          value={password}
          name="password"
          onChange={updatePassword}
        />
        <Button type="primary" size="medium">
          Зарегистрироваться
        </Button>
        <p
          className={`text text_type_main-default text_color_inactive ${styles.info}`}
        >
          Уже зарегистрированы?{" "}
          <Link className={styles.link} to={appRoutes.loginPage}>
            <Button type="secondary" size="medium">
              Войти
            </Button>
          </Link>
        </p>
      </form>
    </>
  );
};
