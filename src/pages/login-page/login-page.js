import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useLocation } from "react-router-dom";

import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { RequestErrorDetails } from "components/request-error-details/request-error-details";
import { Modal } from "components/modal/modal";

import { selectUserInfo } from "services/selectors/select-user-info";
import { selectModalStatus } from "services/selectors/select-modal-status";
import { toggleErrorModal } from "services/actions/modals";
import { useFormMethods } from "hooks/use-form-methods";
import { AppRoutes } from "enums/app-routes";

import styles from "global-styles/form.module.css";

export const LoginPage = () => {
  const { password, email, isLoggedIn } = useSelector(selectUserInfo);
  const { updateEmail, updatePassword, authorize } = useFormMethods();
  const { isErrorModalOpen } = useSelector(selectModalStatus);
  const { state } = useLocation();
  const dispatch = useDispatch();

  const toggleModalWithError = useCallback(
    () => dispatch(toggleErrorModal()),
    [dispatch]
  );

  if (isLoggedIn) {
    return <Redirect to={state?.from || AppRoutes.MainPage} />;
  }

  return (
    <>
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
