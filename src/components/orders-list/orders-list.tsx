import { FC } from "react";

import { OrderItem } from "components/order-item/order-item";

import { IOrderItem } from "types/order-item";

import styles from "./orders-list.module.css";

interface IOrdersList {
  ordersList: ReadonlyArray<IOrderItem>;

  readonly hideTitle?: boolean;
  readonly showStatus?: boolean;
  readonly userOrders?: boolean;
}

export const OrdersList: FC<IOrdersList> = ({
  hideTitle,
  showStatus,
  userOrders,
  ordersList,
}): JSX.Element => {
  return (
    <section
      className={`${
        userOrders ? styles.userOrdersSection : styles.ordersSection
      } pt-10`}
    >
      {!hideTitle && (
        <h1 className="text text_type_main-large mb-5">Лента заказов</h1>
      )}
      <div
        className={`${
          userOrders ? styles.userContainer : styles.ordersContainer
        } custom-scroll`}
      >
        <ul className={styles.ordersList}>
          {ordersList.map(
            (order: IOrderItem): JSX.Element => (
              <OrderItem
                key={order.number}
                {...order}
                showStatus={showStatus}
              />
            )
          )}
        </ul>
      </div>
    </section>
  );
};
