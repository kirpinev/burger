import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { AppHeader } from "components/app-header/app-header";
import { Modal } from "components/modal/modal";
import { RequestErrorDetails } from "components/request-error-details/request-error-details";

import { selectUserInfo } from "services/selectors/select-user-info";
import { selectModalStatus } from "services/selectors/select-modal-status";
import { toggleErrorModal } from "services/actions/modals";
import { useFormMethods } from "hooks/use-form-methods";
import { appRoutes } from "constants/app-routes";
import { getTokenFromStorage } from "utils/local-storage";
import { accessToken } from "constants/token-names";

import styles from "global-styles/form.module.css";

export const RegisterPage = () => {
  const { name, password, email } = useSelector(selectUserInfo);
  const { updateName, updateEmail, updatePassword, register } =
    useFormMethods();
  const { isErrorModalOpen } = useSelector(selectModalStatus);
  const dispatch = useDispatch();

  const toggleModalWithError = useCallback(
    () => dispatch(toggleErrorModal()),
    [dispatch]
  );

  if (getTokenFromStorage(accessToken)) {
    return <Redirect to={appRoutes.mainPage} />;
  }

  return (
    <>
      {isErrorModalOpen && (
        <Modal handleModalCloseClick={toggleModalWithError}>
          <RequestErrorDetails
            title="Что-то пошло не так :("
            subtitle="Попробуйте отправить запрос снова"
          />
        </Modal>
      )}
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
