import { FC, useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { TIconProps } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils";

import styles from "./header-nav-link.module.css";

interface IHeaderNavLink {
  text: string;
  Icon: ({ type }: TIconProps) => JSX.Element;
  path: string;
  exact: boolean;
  matchPaths?: string[];
}

export const HeaderNavLink: FC<IHeaderNavLink> = ({
  text,
  Icon,
  path,
  exact,
  matchPaths,
}): JSX.Element => {
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
