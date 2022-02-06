import { FC, useCallback } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

import { Modal } from "components/modal/modal";
import { OrderDetails } from "components/order-details/order-details";
import { WSLoadingHandlerModal } from "components/ws-loading-handler-modal/ws-loading-handler-modal";

import { selectWSOrders } from "services/selectors/select-ws-orders";
import { selectWSUserOrders } from "services/selectors/select-ws-user-orders";

import { useSelector } from "hooks/use-selector";

import { AppRoutes } from "enums/app-routes";
import { IOrderItem } from "types/order-item";

interface IOrderModal {
  readonly userOrders?: boolean;
}

export const OrderModal: FC<IOrderModal> = ({ userOrders }) => {
  const orderList = useSelector(selectWSOrders);
  const userOrderList = useSelector(selectWSUserOrders);
  const history = useHistory();
  const match = useRouteMatch<{ id?: string }>(
    userOrders
      ? `${AppRoutes.ProfilePage}${AppRoutes.ProfileOrders}/:id`
      : AppRoutes.SelectedFeedPage
  );

  const orderItem: IOrderItem | null | undefined = userOrders
    ? userOrderList.find((i: IOrderItem) => i._id === match?.params.id)
    : orderList.find((i: IOrderItem) => i._id === match?.params.id);

  const goBack = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <WSLoadingHandlerModal>
      <Modal handleModalCloseClick={goBack}>
        <OrderDetails orderItem={orderItem} />
      </Modal>
    </WSLoadingHandlerModal>
  );
};
