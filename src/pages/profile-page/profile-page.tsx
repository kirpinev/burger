import React, { FC, useEffect } from "react";
import { Route, Switch, useLocation, useRouteMatch } from "react-router-dom";

import { ProfileForm } from "components/profile-form/profile-form";
import { ProfileNavigation } from "components/profile-navigation/profile-navigation";
import { HelmetOptions } from "components/helmet-options/helmet-options";
import { OrdersList } from "components/orders-list/orders-list";
import { WSLoadingHandlerWithSocket } from "components/ws-loading-handler-with-socket/ws-loading-handler-with-socket";
import { OrderModal } from "components/order-modal/order-modal";
import { OrderDetailsFullPage } from "components/order-details-full-page/order-details-full-page";

import {
  selectWSUserConnectedStatus,
  selectWSUserConnectionErrorStatus,
  selectWSUserOrders,
} from "services/selectors/select-ws-user-orders";

import { useLoading } from "hooks/use-loading";
import { useUser } from "hooks/use-user";
import { useSelector } from "hooks/use-selector";
import { useWSUserOrders } from "hooks/use-ws-user-orders";

import { AppRoutes } from "enums/app-routes";
import { ILocationState } from "types/location-state";

import styles from "./profile-page.module.css";

export const ProfilePage: FC = (): JSX.Element => {
  const { path } = useRouteMatch();
  const { resetLoading } = useLoading();
  const { getUserInfo } = useUser();
  const location = useLocation<ILocationState>();
  const isWSConnectionError = useSelector(selectWSUserConnectionErrorStatus);
  const isWSConnected = useSelector(selectWSUserConnectedStatus);
  const { openWsUserOrdersConnection, closeWsUserOrdersConnection } =
    useWSUserOrders();
  const userOrderList = useSelector(selectWSUserOrders);

  const order = location.state && location.state.order;

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
        <Switch location={order || location}>
          <Route path={path} exact={true}>
            <ProfileNavigation />
            <ProfileForm />
          </Route>
          <Route path={`${path}${AppRoutes.ProfileOrders}`} exact={true}>
            <ProfileNavigation />
            <WSLoadingHandlerWithSocket
              openConnection={openWsUserOrdersConnection}
              closeConnection={closeWsUserOrdersConnection}
              isWSConnectionError={isWSConnectionError}
              isWSConnected={isWSConnected}
            >
              <OrdersList
                hideTitle
                showStatus
                userOrders
                ordersList={userOrderList}
              />
            </WSLoadingHandlerWithSocket>
          </Route>
          <Route path={`${path}${AppRoutes.ProfileOrders}/:id`}>
            <OrderDetailsFullPage userOrders />
          </Route>
        </Switch>
        {order && (
          <Route path={`${path}${AppRoutes.ProfileOrders}/:id`}>
            <OrderModal userOrders />
          </Route>
        )}
      </section>
    </>
  );
};
