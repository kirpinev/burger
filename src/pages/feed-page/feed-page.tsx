import React, { FC } from "react";

import { HelmetOptions } from "components/helmet-options/helmet-options";
import { OrdersList } from "components/orders-list/orders-list";
import { OrdersStatistic } from "components/orders-statistic/orders-statistic";
import { WSLoadingHandlerWithSocket } from "components/ws-loading-handler-with-socket/ws-loading-handler-with-socket";

import {
  selectWSConnectedStatus,
  selectWSConnectionErrorStatus,
  selectWSOrders,
} from "services/selectors/select-ws-orders";

import { useSelector } from "hooks/use-selector";
import { useWSOrders } from "hooks/use-ws-orders";

import styles from "./feed-page.module.css";

export const FeedPage: FC = (): JSX.Element => {
  const isWSConnected = useSelector(selectWSConnectedStatus);
  const isWSConnectionError = useSelector(selectWSConnectionErrorStatus);
  const { openWsOrdersConnection, closeWsOrdersConnection } = useWSOrders();
  const ordersList = useSelector(selectWSOrders);

  return (
    <WSLoadingHandlerWithSocket
      openConnection={openWsOrdersConnection}
      closeConnection={closeWsOrdersConnection}
      isWSConnectionError={isWSConnectionError}
      isWSConnected={isWSConnected}
    >
      <HelmetOptions title="Лента заказов" />
      <div className="body">
        <main className={styles.main}>
          <OrdersList ordersList={ordersList} />
          <OrdersStatistic />
        </main>
      </div>
    </WSLoadingHandlerWithSocket>
  );
};
