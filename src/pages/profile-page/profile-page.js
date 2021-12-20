import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import { AppHeader } from "components/app-header/app-header";
import { ProfileForm } from "components/profile-form/profile-form";
import { ProfileNavigation } from "components/profile-navigation/profile-navigation";

import { getUserInfoThunk } from "services/actions/user";
import { resetLoadingState } from "services/actions/loading";
import { appRoutes } from "constants/app-routes";

import styles from "./profile-page.module.css";

export const ProfilePage = () => {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfoThunk());

    return () => {
      dispatch(resetLoadingState());
    };
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <section className={styles.container}>
        <Switch>
          <Route path={path} exact={true}>
            <ProfileNavigation />
            <ProfileForm />
          </Route>
          <Route path={`${path}${appRoutes.profileOrders}`} exact={true}>
            <ProfileNavigation />
          </Route>
          <Route path={`${path}${appRoutes.profileOrders}/:id`} exact={true}>
            Какой-то заказ
          </Route>
        </Switch>
      </section>
    </>
  );
};