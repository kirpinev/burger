import React, { FC, useCallback } from "react";
import { useSelector } from "react-redux";

import {
  EmailInput,
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import {
  selectUserInfo,
  selectUserEditStatus,
} from "services/selectors/select-user-info";
import { useFormMethods } from "hooks/use-form-methods";
import { useUser } from "hooks/use-user";

import styles from "./profile-form.module.css";

export const ProfileForm: FC = (): JSX.Element => {
  const { name, password, email } = useSelector(selectUserInfo);
  const isUserInfoEdit = useSelector(selectUserEditStatus);
  const {
    updateName,
    updateEmail,
    updatePassword,
    updateUser,
    updateEditStatus,
    resetEditStatus,
    resetPassword,
  } = useFormMethods();
  const { getUserInfo } = useUser();

  const resetForm = useCallback(
    (e) => {
      e.preventDefault();
      getUserInfo();
      resetEditStatus();
      resetPassword();
    },
    [getUserInfo, resetEditStatus, resetPassword]
  );

  const updateNameAndShowButtons = useCallback(
    (e) => {
      updateEditStatus();
      updateName(e);
    },
    [updateName, updateEditStatus]
  );

  const updateEmailAndShowButtons = useCallback(
    (e) => {
      updateEditStatus();
      updateEmail(e);
    },
    [updateEmail, updateEditStatus]
  );

  const updatePasswordAndShowButtons = useCallback(
    (e) => {
      updateEditStatus();
      updatePassword(e);
    },
    [updateEditStatus, updatePassword]
  );

  const updateUserAndHideButtons = useCallback(
    (e) => {
      updateUser(e);
      resetEditStatus();
    },
    [updateUser, resetEditStatus]
  );

  return (
    <form onSubmit={updateUserAndHideButtons} className={styles.form}>
      <Input
        placeholder="Имя"
        value={name}
        name="name"
        onChange={updateNameAndShowButtons}
      />
      <EmailInput
        value={email}
        name="email"
        onChange={updateEmailAndShowButtons}
      />
      <PasswordInput
        value={password}
        name="password"
        onChange={updatePasswordAndShowButtons}
      />
      {isUserInfoEdit && (
        <div className={styles.buttonsContainer}>
          <Button type="secondary" size="large" onClick={resetForm}>
            Отмена
          </Button>
          <Button type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
};
