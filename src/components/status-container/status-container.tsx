import { FC } from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./status-container.module.css";

interface IStatusContainer {
  readonly title: string;

  readonly onButtonClick?: () => void;
  readonly buttonText?: string;
}

export const StatusContainer: FC<IStatusContainer> = ({
  title,
  buttonText,
  onButtonClick,
}): JSX.Element => (
  <div className={styles.container}>
    <p className="text text_type_main-large mb-10">{title}</p>
    {buttonText && (
      <Button type="primary" size="large" onClick={onButtonClick}>
        {buttonText}
      </Button>
    )}
  </div>
);
