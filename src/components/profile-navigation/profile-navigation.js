import { Route, Switch } from "react-router-dom";

import { ProfileNavLink } from "components/profile-nav-link/profile-nav-link";
import { ProfileNavSignature } from "components/profile-nav-signature/profile-nav-signature";

import { appRoutes } from "constants/app-routes";

import styles from "./profile-navigation.module.css";

export const ProfileNavigation = () => (
  <div className={styles.listContainer}>
    <ul className={styles.navList}>
      <li className={styles.navListItem}>
        <ProfileNavLink text="Профиль" path={`${appRoutes.profilePage}`} />
      </li>
      <li className={styles.navListItem}>
        <ProfileNavLink
          text="История заказов"
          path={`${appRoutes.profilePage}${appRoutes.profileOrders}`}
        />
      </li>
      <li className={styles.navListItem}>
        <ProfileNavLink text="Выход" path={appRoutes.logoutPage} />
      </li>
    </ul>
    <Switch>
      <Route path={appRoutes.profilePage} exact={true}>
        <ProfileNavSignature text="В этом разделе вы можете изменить свои персональные данные" />
      </Route>
      <Route
        path={`${appRoutes.profilePage}${appRoutes.profileOrders}`}
        exact={true}
      >
        <ProfileNavSignature text="В этом разделе вы можете просмотреть свою историю заказов" />
      </Route>
    </Switch>
  </div>
);
