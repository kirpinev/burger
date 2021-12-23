import { useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import styles from "./header-nav-link.module.css";

export const HeaderNavLink = ({ text, Icon, path, exact, matchPaths }) => {
  const location = useLocation();

  const iconType = useMemo(
    () =>
      location.pathname === path ||
      (matchPaths &&
        matchPaths.find((matchPath) => matchPath === location.pathname))
        ? "primary"
        : "secondary",
    [location.pathname, matchPaths, path]
  );

  return (
    <NavLink
      className={`${styles.link} text text_type_main-default text_color_inactive p-5`}
      activeClassName={styles.linkActive}
      exact={exact}
      to={path}
    >
      <span className={`${styles.logo} pr-2`}>
        <Icon type={iconType} />
      </span>
      {text}
    </NavLink>
  );
};

HeaderNavLink.propTypes = {
  text: PropTypes.string.isRequired,
  Icon: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  matchPaths: PropTypes.arrayOf(PropTypes.string.isRequired),
  exact: PropTypes.bool.isRequired,
};
