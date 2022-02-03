import { FC, useMemo } from "react";
import _ from "lodash";

import { OrderIngredientIcon } from "components/order-ingredient-icon/order-ingredient-icon";
import { IngredientName } from "components/ingredient-name/ingredient-name";
import { DetailedIngredientPrice } from "components/detailed-ingredient-price/detailed-ingredient-price";
import { OrderTime } from "components/order-time/order-time";
import { OrderPrice } from "components/order-price/order-price";

import { IOrderItem } from "types/order-item";

import styles from "./order-details.module.css";

interface IOrderDetails {
  readonly orderItem: IOrderItem | null | undefined;

  readonly fullPage?: boolean;
}

export const OrderDetails: FC<IOrderDetails> = ({
  orderItem,
  fullPage,
}): JSX.Element | null => {
  const groupedIngredients = useMemo(
    () => (orderItem ? Object.entries(_.groupBy(orderItem.ingredients)) : []),
    [orderItem]
  );

  return orderItem ? (
    <div className={styles.container}>
      <p
        className="text text_type_digits-default mt-15 mb-10"
        style={{ textAlign: fullPage ? "center" : "left" }}
      >
        # {orderItem.number}
      </p>
      <h6 className="text text_type_main-medium mb-2">{orderItem.name}</h6>
      <p className={`${styles.ready} text text_type_main-default mb-15`}>
        {orderItem.status === "done" ? "Выполнен" : "Готовится"}
      </p>
      <p className="text text_type_main-medium mb-5">Состав:</p>
      <ul className={`${styles.list} custom-scroll mb-9`}>
        {groupedIngredients.map(
          ([ingredientId, ingredientAmountArray], index) => (
            <li key={ingredientId} className={`${styles.listItem} mb-3 mr-3`}>
              <OrderIngredientIcon zIndex={index} ingredientId={ingredientId} />
              <IngredientName ingredientId={ingredientId} />
              <DetailedIngredientPrice
                ingredientId={ingredientId}
                ingredientAmount={ingredientAmountArray.length}
              />
            </li>
          )
        )}
      </ul>
      <div className={`${styles.timeAndPrice} mb-9`}>
        <OrderTime createdAt={orderItem.createdAt} />
        <OrderPrice ingredients={orderItem.ingredients} />
      </div>
    </div>
  ) : null;
};
