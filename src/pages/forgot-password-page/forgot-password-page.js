import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { Modal } from "components/modal/modal";
import { RequestErrorDetails } from "components/request-error-details/request-error-details";

import { selectModalStatus } from "services/selectors/select-modal-status";
import { toggleErrorModal } from "services/actions/modals";
import { AppRoutes } from "constants/app-routes";
import { getTokenFromStorage } from "utils/local-storage";
import { Token } from "constants/token-names";
import { selectUserInfo } from "services/selectors/select-user-info";
import { useFormMethods } from "hooks/use-form-methods";
import { sendResetEmailThunk } from "services/actions/user";

import styles from "global-styles/form.module.css";

export const ForgotPasswordPage = () => {
  const { email, isEmailSent } = useSelector(selectUserInfo);
  const { updateEmail } = useFormMethods();
  const { isErrorModalOpen } = useSelector(selectModalStatus);
  const dispatch = useDispatch();

  const sendEmail = useCallback(
    (e) => {
      e.preventDefault();

      dispatch(sendResetEmailThunk());
    },
    [dispatch]
  );

  const toggleModalWithError = useCallback(
    () => dispatch(toggleErrorModal()),
    [dispatch]
  );

  if (getTokenFromStorage(Token.Access)) {
    return <Redirect push to={AppRoutes.MainPage} />;
  }

  if (isEmailSent) {
    return <Redirect push to={AppRoutes.ResetPasswordPage} />;
  }

  return (
    <>
      {isErrorModalOpen && (
        <Modal handleModalCloseClick={toggleModalWithError}>
          <RequestErrorDetails
            title="Что-то пошло не так :("
            subtitle="Попробуйте отправить email повторно"
          />
        </Modal>
      )}
      <form onSubmit={sendEmail} className={styles.container}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <EmailInput
          value={email}
          name="Укажите e-mail"
          onChange={updateEmail}
        />
        <Button type="primary" size="medium">
          Восстановить
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
