import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import {
  Button,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { AppHeader } from "components/app-header/app-header";
import { Modal } from "components/modal/modal";
import { RequestErrorDetails } from "components/request-error-details/request-error-details";

import { selectModalStatus } from "services/selectors/select-modal-status";
import { toggleErrorModal } from "services/actions/modals";
import { sendPasswordAndTokenThunk } from "services/actions/user";
import { selectUserInfo } from "services/selectors/select-user-info";

import { useFormMethods } from "hooks/use-form-methods";
import { appRoutes } from "constants/app-routes";
import { validatePassword } from "utils/validate-password";

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

  const sendPassword = useCallback(() => {
    if (validatePassword(password) && token) {
      dispatch(sendPasswordAndTokenThunk());
    }
  }, [dispatch, password, token]);

  if (!isEmailSent) {
    return <Redirect push to={appRoutes.mainPage} />;
  }

  if (isPasswordSent) {
    return <Redirect push to={appRoutes.loginPage} />;
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
      <AppHeader />
      <div className={styles.container}>
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
        <Button type="primary" size="medium" onClick={sendPassword}>
          Сохранить
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
