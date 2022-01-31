import { FC } from "react";

import { FeedItem } from "components/feed-item/feed-item";

import { selectWsPublicFeedList } from "services/selectors/select-ws-public-feed";

import { useSelector } from "hooks/use-selector";

import { IFeedItem } from "types/feed-item";

import styles from "./feed-list.module.css";

export const FeedList: FC = (): JSX.Element => {
  const feedList = useSelector(selectWsPublicFeedList);

  return (
    <section className={`${styles.section} pt-10`}>
      <h1 className="text text_type_main-large mb-5">Лента заказов</h1>
      <div className={`${styles.container} custom-scroll`}>
        <ul className={styles.feedList}>
          {feedList.map(
            (order: IFeedItem): JSX.Element => (
              <FeedItem key={order.number} {...order} />
            )
          )}
        </ul>
      </div>
    </section>
  );
};
