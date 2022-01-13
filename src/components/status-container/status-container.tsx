import { FC } from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./status-container.module.css";

interface IStatusContainer {
  title: string;
  buttonText?: string;
  onButtonClick?: () => void;
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
