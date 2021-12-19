import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from "components/modal/modal";
import { AppHeader } from "components/app-header/app-header";
import { RequestErrorDetails } from "components/request-error-details/request-error-details";

import { updateEmail } from "services/actions/email";
import { resetEmailState } from "services/actions/email";
import { selectEmailAndEmailSentStatus } from "services/selectors/select-email";
import { sendResetEmail } from "services/actions/email";
import { selectModalStatus } from "services/selectors/select-modal-status";
import { toggleErrorModal } from "services/actions/modals";

import { appRoutes } from "constants/app-routes";
import { validateEmail } from "utils/validate-email";
import { getTokenFromStorage } from "utils/local-storage";
import { accessToken } from "constants/token-names";
import { selectUserInfo } from "services/selectors/select-user-info";

import styles from "global-styles/form.module.css";

export const ForgotPasswordPage = () => {
  const { email, emailSent } = useSelector(selectEmailAndEmailSentStatus);
  const { isLoggedIn } = useSelector(selectUserInfo);
  const { isErrorModalOpen } = useSelector(selectModalStatus);
  const dispatch = useDispatch();

  const changeEmailValue = useCallback(
    (e) => dispatch(updateEmail(e.target.value)),
    [dispatch]
  );

  const sendEmail = useCallback(() => {
    if (validateEmail(email)) {
      dispatch(sendResetEmail());
    }
  }, [dispatch, email]);

  const toggleModalWithError = useCallback(
    () => dispatch(toggleErrorModal()),
    [dispatch]
  );

  useEffect(() => {
    return () => {
      dispatch(resetEmailState());
    };
  }, [dispatch]);

  if (isLoggedIn || getTokenFromStorage(accessToken)) {
    return <Redirect push to={appRoutes.mainPage} />;
  }

  if (emailSent) {
    return <Redirect push to={appRoutes.resetPasswordPage} />;
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
      <AppHeader />
      <div className={styles.container}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <EmailInput
          value={email}
          name="Укажите e-mail"
          onChange={changeEmailValue}
        />
        <Button type="primary" size="medium" onClick={sendEmail}>
          Восстановить
        </Button>
        <p
          className={`text text_type_main-default text_color_inactive ${styles.info}`}
        >
          Вспомнили пароль?{" "}
          <Link className={styles.link} to={appRoutes.loginPage}>
            <Button type="secondary" size="medium">
              Войти
            </Button>
          </Link>
        </p>
      </div>
    </>
  );
};
