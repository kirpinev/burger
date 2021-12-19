import PropTypes from "prop-types";

import styles from "./profile-nav-signature.module.css";

export const ProfileNavSignature = ({ text }) => (
  <p
    className={`text text_type_main-default text_color_inactive mt-20 ${styles.signature}`}
  >
    {text}
  </p>
);

ProfileNavSignature.propTypes = {
  text: PropTypes.string.isRequired,
};
