import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import {
  Button,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { Modal } from "components/modal/modal";
import { RequestErrorDetails } from "components/request-error-details/request-error-details";

import { selectModalStatus } from "services/selectors/select-modal-status";
import { toggleErrorModal } from "services/actions/modals";
import { sendPasswordAndTokenThunk } from "services/actions/user";
import { selectUserInfo } from "services/selectors/select-user-info";

import { useFormMethods } from "hooks/use-form-methods";
import { AppRoutes } from "enums/app-routes";

import styles from "global-styles/form.module.css";

export const ResetPasswordPage = () => {
  const { isEmailSent, password, token, isPasswordSent } =
    useSelector(selectUserInfo);
  const { updatePassword, updateToken } = useFormMethods();
  const { isErrorModalOpen } = useSelector(selectModalStatus);
  const dispatch = useDispatch();

  const toggleModalWithError = useCallback(
    () => dispatch(toggleErrorModal()),
    [dispatch]
  );

  const sendPasswordAndToken = useCallback(
    (e) => {
      e.preventDefault();

      dispatch(sendPasswordAndTokenThunk());
    },
    [dispatch]
  );

  if (!isEmailSent) {
    return <Redirect push to={AppRoutes.ForgotPasswordPage} />;
  }

  if (isPasswordSent) {
    return <Redirect push to={AppRoutes.LoginPage} />;
  }

  return (
    <>
      {isErrorModalOpen && (
        <Modal handleModalCloseClick={toggleModalWithError}>
          <RequestErrorDetails
            title="Что-то пошло не так :("
            subtitle="Попробуйте отправить пароль повторно"
          />
        </Modal>
      )}
      <form onSubmit={sendPasswordAndToken} className={styles.container}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <PasswordInput
          value={password}
          name="password"
          onChange={updatePassword}
        />
        <Input
          placeholder="Введите код из письма"
          name="token"
          value={token}
          onChange={updateToken}
        />
        <Button type="primary" size="medium">
          Сохранить
        </Button>
        <p
          className={`text text_type_main-default text_color_inactive ${styles.info}`}
        >
          Вспомнили пароль?{" "}
          <Link className={styles.link} to={AppRoutes.LoginPage}>
            <Button type="secondary" size="medium">
              Войти
            </Button>
          </Link>
        </p>
      </form>
    </>
  );
};
