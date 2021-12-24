import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import styles from "./profile-nav-link.module.css";

export const ProfileNavLink = ({ path, text, ...rest }) => (
  <NavLink
    className={`text text_type_main-medium text_color_inactive ${styles.navLink}`}
    exact={true}
    activeClassName={styles.navLinkActive}
    to={path}
    {...rest}
  >
    {text}
  </NavLink>
);

ProfileNavLink.propTypes = {
  path: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
