import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import styles from "./header-nav-link.module.css";

export const HeaderNavLink = ({ text, icon, path, exact }) => (
  <NavLink
    className={`${styles.link} text text_type_main-default text_color_inactive p-5`}
    activeClassName={styles.linkActive}
    exact={exact}
    to={path}
  >
    <span className={`${styles.logo} pr-2`}>{icon}</span>
    {text}
  </NavLink>
);

HeaderNavLink.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
};
