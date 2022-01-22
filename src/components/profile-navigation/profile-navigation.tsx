import { FC } from "react";
import { Route, Switch } from "react-router-dom";

import { ProfileNavLink } from "components/profile-nav-link/profile-nav-link";
import { ProfileNavSignature } from "components/profile-nav-signature/profile-nav-signature";

import { useUser } from "hooks/use-user";
import { AppRoutes } from "enums/app-routes";

import styles from "./profile-navigation.module.css";

export const ProfileNavigation: FC = (): JSX.Element => {
  const { logoutUser } = useUser();

  return (
    <div className={styles.listContainer}>
      <ul className={styles.navList}>
        <li className={styles.navListItem}>
          <ProfileNavLink text="Профиль" path={`${AppRoutes.ProfilePage}`} />
        </li>
        <li className={styles.navListItem}>
          <ProfileNavLink
            text="История заказов"
            path={`${AppRoutes.ProfilePage}${AppRoutes.ProfileOrders}`}
          />
        </li>
        <li className={styles.navListItem}>
          <ProfileNavLink
            text="Выход"
            path={AppRoutes.LogoutPage}
            onClick={logoutUser}
          />
        </li>
      </ul>
      <Switch>
        <Route path={AppRoutes.ProfilePage} exact={true}>
          <ProfileNavSignature text="В этом разделе вы можете изменить свои персональные данные" />
        </Route>
        <Route
          path={`${AppRoutes.ProfilePage}${AppRoutes.ProfileOrders}`}
          exact={true}
        >
          <ProfileNavSignature text="В этом разделе вы можете просмотреть свою историю заказов" />
        </Route>
      </Switch>
    </div>
  );
};
