import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  EmailInput,
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { StatusContainer } from "components/status-container/status-container";

import { selectUserInfo } from "services/selectors/select-user-info";
import { selectLoadingStatus } from "services/selectors/select-loading-status";
import { getTokenFromStorage } from "utils/local-storage";
import { accessToken } from "constants/token-names";
import { appRoutes } from "constants/app-routes";
import { useFormMethods } from "hooks/use-form-methods";

import styles from "./profile-form.module.css";

export const ProfileForm = () => {
  const { isError } = useSelector(selectLoadingStatus);
  const { name, password, email } = useSelector(selectUserInfo);
  const { updateName, updateEmail, updatePassword, updateUser } =
    useFormMethods();

  if (isError && getTokenFromStorage(accessToken)) {
    return (
      <StatusContainer
        buttonText="Повторить"
        onButtonClick={updateUser}
        title="При обновлении данных что-то пошло не так, повторить?"
      />
    );
  }

  if (isError && !getTokenFromStorage(accessToken)) {
    return <Redirect to={appRoutes.loginPage} />;
  }

  return (
    <form onSubmit={updateUser} className={styles.form}>
      <Input placeholder="Имя" value={name} name="name" onChange={updateName} />
      <EmailInput value={email} name="email" onChange={updateEmail} />
      <PasswordInput
        value={password}
        name="password"
        onChange={updatePassword}
      />
      <div className={styles.buttonsContainer}>
        <Button type="secondary" size="large">
          Отмена
        </Button>
        <Button type="primary" size="medium">
          Сохранить
        </Button>
      </div>
    </form>
  );
};
