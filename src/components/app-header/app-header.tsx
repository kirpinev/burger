import { FC, useCallback } from "react";
import { useHistory } from "react-router-dom";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { HeaderNavLink } from "components/header-nav-link/header-nav-link";

import { AppRoutes } from "enums/app-routes";

import styles from "./app-header.module.css";

export const AppHeader: FC = (): JSX.Element => {
  const history = useHistory();

  const goToMainPage = useCallback(
    (e) => {
      e.preventDefault();

      history.push(AppRoutes.MainPage);
    },
    [history]
  );

  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <nav>
        <ul className={styles.ul}>
          <li>
            <ul className={styles.ul}>
              <li className="mr-2">
                <HeaderNavLink
                  text="Конструктор"
                  Icon={BurgerIcon}
                  path={AppRoutes.MainPage}
                  exact={true}
                />
              </li>
              <li>
                <HeaderNavLink
                  text="Лента заказов"
                  Icon={ListIcon}
                  path={AppRoutes.FeedPage}
                  exact={false}
                />
              </li>
            </ul>
          </li>
          <li className={styles.logo} onClick={goToMainPage}>
            <Logo />
          </li>
          <li>
            <HeaderNavLink
              text="Личный кабинет"
              Icon={ProfileIcon}
              path={AppRoutes.ProfilePage}
              matchPaths={[
                `${AppRoutes.ProfilePage}${AppRoutes.ProfileOrders}`,
              ]}
              exact={false}
            />
          </li>
        </ul>
      </nav>
    </header>
  );
};
