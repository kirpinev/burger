import React, { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  EmailInput,
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import {
  getUserInfoThunk,
  resetUserEditStatus,
  updateUserEditStatus,
  resetUserPassword,
} from "services/actions/user";
import {
  selectUserInfo,
  selectUserEditStatus,
} from "services/selectors/select-user-info";
import { useFormMethods } from "hooks/use-form-methods";

import styles from "./profile-form.module.css";

export const ProfileForm: FC = (): JSX.Element => {
  const { name, password, email } = useSelector(selectUserInfo);
  const isUserInfoEdit = useSelector(selectUserEditStatus);
  const { updateName, updateEmail, updatePassword, updateUser } =
    useFormMethods();
  const dispatch = useDispatch();

  const resetForm = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(getUserInfoThunk());
      dispatch(resetUserEditStatus());
      dispatch(resetUserPassword());
    },
    [dispatch]
  );

  const updateStatus = useCallback(() => {
    dispatch(updateUserEditStatus());
  }, [dispatch]);

  const resetStatus = useCallback(() => {
    dispatch(resetUserEditStatus());
  }, [dispatch]);

  const updateNameAndShowButtons = useCallback(
    (e) => {
      updateStatus();
      updateName(e);
    },
    [updateName, updateStatus]
  );

  const updateEmailAndShowButtons = useCallback(
    (e) => {
      updateStatus();
      updateEmail(e);
    },
    [updateEmail, updateStatus]
  );

  const updatePasswordAndShowButtons = useCallback(
    (e) => {
      updateStatus();
      updatePassword(e);
    },
    [updateStatus, updatePassword]
  );

  const updateUserAndHideButtons = useCallback(
    (e) => {
      updateUser(e);
      resetStatus();
    },
    [updateUser, resetStatus]
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
