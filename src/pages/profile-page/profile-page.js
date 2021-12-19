import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";

import { AppHeader } from "components/app-header/app-header";
import { ProfileForm } from "components/profile-form/profile-form";
import { ProfileNavigation } from "components/profile-navigation/profile-navigation";
import { StatusContainer } from "components/status-container/status-container";

import { selectLoadingStatus } from "services/selectors/select-loading-status";
import { getUserInfo } from "services/actions/user";
import { getTokenFromStorage } from "utils/local-storage";
import { accessToken } from "constants/token-names";

import { appRoutes } from "constants/app-routes";

import styles from "./profile-page.module.css";

export const ProfilePage = () => {
  const { isLoading, isError } = useSelector(selectLoadingStatus);
  const { path } = useRouteMatch();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  if (isLoading) {
    return <StatusContainer title="Загрузка..." />;
  }

  if (isError && getTokenFromStorage(accessToken)) {
    return (
      <StatusContainer
        buttonText="Повторить"
        onButtonClick={() => dispatch(getUserInfo())}
        title="При запросе данных что-то пошло не так, повторить?"
      />
    );
  }

  if (isError && !getTokenFromStorage(accessToken)) {
    return <Redirect to={appRoutes.loginPage} />;
  }

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
