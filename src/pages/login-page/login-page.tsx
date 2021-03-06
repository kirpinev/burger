import { FC } from "react";
import { useSelector } from "hooks/use-selector";
import { Link, Redirect, useLocation } from "react-router-dom";

import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { RequestErrorDetails } from "components/request-error-details/request-error-details";
import { Modal } from "components/modal/modal";
import { HelmetOptions } from "components/helmet-options/helmet-options";

import { selectUserInfo } from "services/selectors/select-user-info";
import { selectModalStatus } from "services/selectors/select-modal-status";

import { useFormMethods } from "hooks/use-form-methods";
import { useModals } from "hooks/use-modals";
import { AppRoutes } from "enums/app-routes";

import styles from "global-styles/form.module.css";

export const LoginPage: FC = (): JSX.Element => {
  const { password, email, isLoggedIn } = useSelector(selectUserInfo);
  const { updateEmail, updatePassword, authorize } = useFormMethods();
  const { isErrorModalOpen } = useSelector(selectModalStatus);
  const { state } = useLocation<{ from: string }>();
  const { toggleModalWithError } = useModals();

  if (isLoggedIn) {
    return <Redirect to={state?.from || AppRoutes.MainPage} />;
  }

  return (
    <>
      <HelmetOptions title="Вход" />
      {isErrorModalOpen && (
        <Modal handleModalCloseClick={toggleModalWithError}>
          <RequestErrorDetails
            title="Что-то пошло не так :("
            subtitle="Проверьте данные и попробуйте войти снова"
          />
        </Modal>
      )}
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
          <Link className={styles.link} to={AppRoutes.RegisterPage}>
            <Button type="secondary" size="medium">
              Зарегистрироваться
            </Button>
          </Link>
        </p>
        <p
          className={`text text_type_main-default text_color_inactive ${styles.info}`}
        >
          Забыли пароль?{" "}
          <Link className={styles.link} to={AppRoutes.ForgotPasswordPage}>
            <Button type="secondary" size="medium">
              Восстановить пароль
            </Button>
          </Link>
        </p>
      </form>
    </>
  );
};
