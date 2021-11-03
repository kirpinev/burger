import React from "react";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { HeaderNavLink } from "../header-nav-link/header-nav-link";

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
                icon={<BurgerIcon type="primary" />}
              />
            </li>
            <li>
              <HeaderNavLink
                text="Лента заказов"
                icon={<ListIcon type="secondary" />}
                inactive={true}
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
            icon={<ProfileIcon type="secondary" />}
            inactive={true}
          />
        </li>
      </ul>
    </nav>
  </header>
);
