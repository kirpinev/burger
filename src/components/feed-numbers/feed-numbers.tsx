import { FC } from "react";

import styles from "./feed-numbers.module.css";

import feedList from "mocks/feed-list.json";

export const FeedNumbers: FC = (): JSX.Element => {
  const doneFeed = feedList.orders.filter((order) => order.status === "done");
  const notDoneFeed = feedList.orders.filter(
    (order) => order.status === "not-done"
  );

  return (
    <section className={styles.container}>
      <div className={`${styles.readyStateContainer} mb-15`}>
        <div className={`${styles.readyState} mr-9`}>
          <h6 className="text text_type_main-medium mb-6">Готовы:</h6>
          <div className={styles.orderListContainer}>
            <ul className={styles.orderList}>
              {doneFeed.slice(0, 5).map((feed) => (
                <li
                  key={feed.number}
                  className={`${styles.readyNumber} text text_type_digits-default mb-2`}
                >
                  {feed.number}
                </li>
              ))}
            </ul>
            {doneFeed.slice(5, 10).length ? (
              <ul className={styles.orderList}>
                {doneFeed.slice(5, 10).map((feed) => (
                  <li
                    key={feed.number}
                    className={`${styles.readyNumber} text text_type_digits-default mb-2`}
                  >
                    {feed.number}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
        <div className={`${styles.readyState} mb-15`}>
          <h6 className="text text_type_main-medium mb-6">В работе:</h6>
          <div className={styles.orderListContainer}>
            <ul className={styles.orderList}>
              {notDoneFeed.slice(0, 5).map((feed) => (
                <li
                  key={feed.number}
                  className="text text_type_digits-default mb-2"
                >
                  {feed.number}
                </li>
              ))}
            </ul>
            {notDoneFeed.slice(5, 10).length ? (
              <ul className={styles.orderList}>
                {notDoneFeed.slice(5, 10).map((feed) => (
                  <li
                    key={feed.number}
                    className="text text_type_digits-default mb-2"
                  >
                    {feed.number}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
      <h6 className="text text_type_main-medium">Выполнено за все время:</h6>
      <p className="text text_type_digits-large mb-15">{feedList.total}</p>
      <h6 className="text text_type_main-medium">Выполнено сегодня:</h6>
      <p className="text text_type_digits-large mb-15">{feedList.totalToday}</p>
    </section>
  );
};
