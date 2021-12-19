import {
  EmailInput,
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./profile-form.module.css";

export const ProfileForm = () => {
  return (
    <form className={styles.form}>
      <Input placeholder="Имя" value="" onChange={() => {}} />
      <EmailInput value="" name="Email" onChange={() => {}} />
      <PasswordInput value="" name="Пароль" onChange={() => {}} />
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
