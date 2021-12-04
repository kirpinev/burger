import PropTypes from "prop-types";

import styles from "./header-nav-link.module.css";

export const HeaderNavLink = ({ text, icon, inactive = false }) => (
  <a
    style={{ color: !inactive && "white" }}
    className={`${styles.link} text text_type_main-default ${
      inactive && "text_color_inactive"
    } p-5`}
    href="#"
  >
    <span className={`${styles.logo} pr-2`}>{icon}</span>
    {text}
  </a>
);

HeaderNavLink.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  inactive: PropTypes.bool,
};
