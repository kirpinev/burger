import React from "react";
import { useSelector } from "react-redux";

import {
  EmailInput,
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { selectUserInfo } from "services/selectors/select-user-info";
import { useFormMethods } from "hooks/use-form-methods";

import styles from "./profile-form.module.css";

export const ProfileForm = () => {
  const { name, password, email } = useSelector(selectUserInfo);
  const { updateName, updateEmail, updatePassword, updateUser } =
    useFormMethods();

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
