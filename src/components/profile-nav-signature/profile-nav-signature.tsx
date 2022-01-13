import { FC } from "react";

import styles from "./profile-nav-signature.module.css";

interface IProfileNavSignature {
  text: string;
}

export const ProfileNavSignature: FC<IProfileNavSignature> = ({
  text,
}): JSX.Element => (
  <p
    className={`text text_type_main-default text_color_inactive mt-20 ${styles.signature}`}
  >
    {text}
  </p>
);
