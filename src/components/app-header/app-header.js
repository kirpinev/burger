import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { HeaderNavLink } from "components/header-nav-link/header-nav-link";
import { appRoutes } from "constants/app-routes";

import styles from "./app-header.module.css";

export const AppHeader = () => (
  <header className={`${styles.header} pt-4 pb-4`}>
    <nav>
      <ul className={styles.ul}>
        <li>
          <ul className={styles.ul}>
            <li className="mr-2">
              <HeaderNavLink
                text="Конструктор"
                Icon={BurgerIcon}
                path={appRoutes.mainPage}
                exact={true}
              />
            </li>
            <li>
              <HeaderNavLink
                text="Лента заказов"
                Icon={ListIcon}
                path={appRoutes.profileOrders}
                exact={false}
              />
            </li>
          </ul>
        </li>
        <li className={styles.logo}>
          <Logo />
        </li>
        <li>
          <HeaderNavLink
            text="Личный кабинет"
            Icon={ProfileIcon}
            path={appRoutes.profilePage}
            matchPaths={[`${appRoutes.profilePage}${appRoutes.profileOrders}`]}
            exact={false}
          />
        </li>
      </ul>
    </nav>
  </header>
);
