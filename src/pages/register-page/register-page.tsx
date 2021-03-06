import { FC } from "react";
import { useSelector } from "hooks/use-selector";
import { Link, Redirect } from "react-router-dom";

import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { Modal } from "components/modal/modal";
import { RequestErrorDetails } from "components/request-error-details/request-error-details";
import { HelmetOptions } from "components/helmet-options/helmet-options";

import { selectUserInfo } from "services/selectors/select-user-info";
import { selectModalStatus } from "services/selectors/select-modal-status";
import { useFormMethods } from "hooks/use-form-methods";
import { useModals } from "hooks/use-modals";
import { AppRoutes } from "enums/app-routes";
import { getAccessToken } from "utils/token";

import styles from "global-styles/form.module.css";

export const RegisterPage: FC = (): JSX.Element => {
  const { name, password, email } = useSelector(selectUserInfo);
  const { updateName, updateEmail, updatePassword, register } =
    useFormMethods();
  const { isErrorModalOpen } = useSelector(selectModalStatus);
  const { toggleModalWithError } = useModals();

  if (getAccessToken()) {
    return <Redirect to={AppRoutes.MainPage} />;
  }

  return (
    <>
      <HelmetOptions title="Регистрация" />
      {isErrorModalOpen && (
        <Modal handleModalCloseClick={toggleModalWithError}>
          <RequestErrorDetails
            title="Что-то пошло не так :("
            subtitle="Попробуйте отправить запрос снова"
          />
        </Modal>
      )}
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
