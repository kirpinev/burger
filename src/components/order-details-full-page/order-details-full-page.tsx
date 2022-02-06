import React, { FC, useMemo } from "react";
import { useParams } from "react-router-dom";

import { OrderDetails } from "components/order-details/order-details";
import { WSLoadingHandlerWithSocket } from "components/ws-loading-handler-with-socket/ws-loading-handler-with-socket";
import { FullPageContainer } from "components/full-page-container/full-page-container";

import {
  selectWSConnectedStatus,
  selectWSConnectionErrorStatus,
  selectWSOrders,
} from "services/selectors/select-ws-orders";
import {
  selectWSUserConnectedStatus,
  selectWSUserConnectionErrorStatus,
  selectWSUserOrders,
} from "services/selectors/select-ws-user-orders";

import { useWSUserOrders } from "hooks/use-ws-user-orders";
import { useSelector } from "hooks/use-selector";
import { useWSOrders } from "hooks/use-ws-orders";

import { IOrderItem } from "types/order-item";

interface IOrderDetailsFullPage {
  readonly userOrders?: boolean;
}

export const OrderDetailsFullPage: FC<IOrderDetailsFullPage> = ({
  userOrders,
}): JSX.Element => {
  const ordersList = useSelector(selectWSOrders);
  const userOrderList = useSelector(selectWSUserOrders);
  const isWSOrdersConnected = useSelector(selectWSConnectedStatus);
  const isWSOrdersConnectionError = useSelector(selectWSConnectionErrorStatus);
  const isWSUserOrdersConnected = useSelector(selectWSUserConnectedStatus);
  const isWSUserOrdersConnectionError = useSelector(
    selectWSUserConnectionErrorStatus
  );
  const { id } = useParams<{ id?: string }>();
  const { openWsOrdersConnection, closeWsOrdersConnection } = useWSOrders();
  const { openWsUserOrdersConnection, closeWsUserOrdersConnection } =
    useWSUserOrders();

  const orderItem: IOrderItem | null | undefined = useMemo(
    () =>
      userOrders
        ? userOrderList.find((i: IOrderItem) => i._id === id)
        : ordersList.find((i: IOrderItem) => i._id === id),
    [userOrders, id, userOrderList, ordersList]
  );

  return (
    <WSLoadingHandlerWithSocket
      openConnection={
        userOrders ? openWsUserOrdersConnection : openWsOrdersConnection
      }
      closeConnection={
        userOrders ? closeWsUserOrdersConnection : closeWsOrdersConnection
      }
      isWSConnected={userOrders ? isWSUserOrdersConnected : isWSOrdersConnected}
      isWSConnectionError={
        userOrders ? isWSUserOrdersConnectionError : isWSOrdersConnectionError
      }
    >
      <FullPageContainer>
        <OrderDetails orderItem={orderItem} fullPage />
      </FullPageContainer>
    </WSLoadingHandlerWithSocket>
  );
};
