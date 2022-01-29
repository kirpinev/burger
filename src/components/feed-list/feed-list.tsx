import { FC } from "react";

import { FeedItem } from "components/feed-item/feed-item";

import feedList from "mocks/feed-list.json";

import styles from "./feed-list.module.css";

export const FeedList: FC = (): JSX.Element => {
  return (
    <section className={`${styles.section} pt-10`}>
      <h1 className="text text_type_main-large mb-5">Лента заказов</h1>
      <div className={`${styles.container} custom-scroll`}>
        <ul className={styles.feedList}>
          {feedList.orders.map((order) => (
            <FeedItem key={order.number} {...order} />
          ))}
        </ul>
      </div>
    </section>
  );
};
