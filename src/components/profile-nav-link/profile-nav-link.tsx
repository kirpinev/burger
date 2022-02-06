import { FC } from "react";
import { NavLink } from "react-router-dom";

import styles from "./profile-nav-link.module.css";

interface IProfileNavLink {
  readonly path: string;
  readonly text: string;

  readonly onClick?: () => void;
}

export const ProfileNavLink: FC<IProfileNavLink> = ({
  path,
  text,
  onClick,
}): JSX.Element => (
  <NavLink
    className={`text text_type_main-medium text_color_inactive ${styles.navLink}`}
    exact={true}
    activeClassName={styles.navLinkActive}
    to={path}
    onClick={onClick}
  >
    {text}
  </NavLink>
);
