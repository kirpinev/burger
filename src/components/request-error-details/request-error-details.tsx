import { FC } from "react";

import styles from "./request-error-details.module.css";

interface IRequestErrorDetails {
  readonly title: string;
  readonly subtitle: string;
}

export const RequestErrorDetails: FC<IRequestErrorDetails> = ({
  title,
  subtitle,
}): JSX.Element => (
  <>
    <h4 className={`${styles.title} text text_type_main-large`}>{title}</h4>
    <p className="text text_type_main-default text_color_inactive mt-15 mb-15">
      {subtitle}
    </p>
  </>
);
