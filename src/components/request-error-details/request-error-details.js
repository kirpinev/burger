import PropTypes from "prop-types";

import styles from "./request-error-details.module.css";

export const RequestErrorDetails = ({ title, subtitle }) => (
  <>
    <h4 className={`${styles.title} text text_type_main-large`}>{title}</h4>
    <p className="text text_type_main-default text_color_inactive mt-15 mb-15">
      {subtitle}
    </p>
  </>
);

RequestErrorDetails.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};
