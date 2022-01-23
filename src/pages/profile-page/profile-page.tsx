import React, { FC, useEffect } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import { ProfileForm } from "components/profile-form/profile-form";
import { ProfileNavigation } from "components/profile-navigation/profile-navigation";
import { HelmetOptions } from "components/helmet-options/helmet-options";

import { AppRoutes } from "enums/app-routes";
import { useLoading } from "hooks/use-loading";
import { useUser } from "hooks/use-user";

import styles from "./profile-page.module.css";

export const ProfilePage: FC = (): JSX.Element => {
  const { path } = useRouteMatch();
  const { resetLoading } = useLoading();
  const { getUserInfo } = useUser();

  useEffect(() => {
    getUserInfo();

    return () => {
      resetLoading();
    };
  }, [getUserInfo, resetLoading]);

  return (
    <>
      <HelmetOptions title="Личный кабинет" />
      <section className={styles.container}>
        <Switch>
          <Route path={path} exact={true}>
            <ProfileNavigation />
            <ProfileForm />
          </Route>
          <Route path={`${path}${AppRoutes.ProfileOrders}`} exact={true}>
            <ProfileNavigation />
          </Route>
          <Route path={`${path}${AppRoutes.ProfileOrders}/:id`} exact={true}>
            Какой-то заказ
          </Route>
        </Switch>
      </section>
    </>
  );
};
