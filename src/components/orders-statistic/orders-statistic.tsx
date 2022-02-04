import { FC } from "react";

import {
  selectWSPublicDoneFeed,
  selectWSPublicFeedTotal,
  selectWSPublicFeedTotalToday,
  selectWSPublicNotDoneFeed,
} from "services/selectors/select-ws-orders";

import { useSelector } from "hooks/use-selector";

import styles from "./orders-statistic.module.css";

export const OrdersStatistic: FC = (): JSX.Element => {
  const total = useSelector(selectWSPublicFeedTotal);
  const totalToday = useSelector(selectWSPublicFeedTotalToday);
  const doneOrders = useSelector(selectWSPublicDoneFeed);
  const notDoneOrders = useSelector(selectWSPublicNotDoneFeed);

  return (
    <section className={styles.container}>
      <div className={`${styles.readyStateContainer} mb-15`}>
        <div className={`${styles.readyState} mr-6`}>
          <h6 className="text text_type_main-medium mb-6">Готовы:</h6>
          <div className={styles.orderListContainer}>
            <ul className={styles.orderList}>
              {doneOrders.slice(0, 10).map((order) => (
                <li
                  key={order.number}
                  className={`${styles.readyNumber} text text_type_digits-default mb-2`}
                >
                  {order.number}
                </li>
              ))}
            </ul>
            <ul className={styles.orderList}>
              {doneOrders.slice(10, 20).map((order) => (
                <li
                  key={order.number}
                  className={`${styles.readyNumber} text text_type_digits-default mb-2`}
                >
                  {order.number}
                </li>
              ))}
            </ul>
            <ul className={styles.orderList}>
              {doneOrders.slice(20, 30).map((order) => (
                <li
                  key={order.number}
                  className={`${styles.readyNumber} text text_type_digits-default mb-2`}
                >
                  {order.number}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={`${styles.readyState} mb-15`}>
          <h6 className="text text_type_main-medium mb-6">В работе:</h6>
          <div className={styles.orderListContainer}>
            <ul className={styles.orderList}>
              {notDoneOrders.slice(0, 10).map((order) => (
                <li
                  key={order.number}
                  className="text text_type_digits-default mb-2"
                >
                  {order.number}
                </li>
              ))}
            </ul>
            <ul className={styles.orderList}>
              {notDoneOrders.slice(10, 20).map((order) => (
                <li
                  key={order.number}
                  className="text text_type_digits-default mb-2"
                >
                  {order.number}
                </li>
              ))}
            </ul>
            <ul className={styles.orderList}>
              {notDoneOrders.slice(20, 30).map((order) => (
                <li
                  key={order.number}
                  className="text text_type_digits-default mb-2"
                >
                  {order.number}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <h6 className="text text_type_main-medium">Выполнено за все время:</h6>
      <p className={`${styles.totalNumber} text text_type_digits-large mb-15`}>
        {total}
      </p>

      <h6 className="text text_type_main-medium">Выполнено сегодня:</h6>
      <p className={`${styles.totalNumber} text text_type_digits-large mb-15`}>
        {totalToday}
      </p>
    </section>
  );
};
