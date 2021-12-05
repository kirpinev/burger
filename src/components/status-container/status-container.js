import PropTypes from "prop-types";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./status-container.module.css";

export const StatusContainer = ({ title, buttonText, onButtonClick }) => (
  <div className={styles.container}>
    <p className="text text_type_main-large mb-10">{title}</p>
    {buttonText && (
      <Button type="primary" size="large" onClick={onButtonClick}>
        {buttonText}
      </Button>
    )}
  </div>
);

StatusContainer.propTypes = {
  title: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
  onButtonClick: PropTypes.func,
};
