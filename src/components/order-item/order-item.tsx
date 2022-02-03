import { FC, useMemo } from "react";
import { useLocation, Link } from "react-router-dom";

import { OrderIngredientIcon } from "components/order-ingredient-icon/order-ingredient-icon";
import { OrderPrice } from "components/order-price/order-price";
import { OrderTime } from "components/order-time/order-time";

import { AppRoutes } from "enums/app-routes";

import styles from "./order-item.module.css";

export type TOrderStatus = "done" | "created" | "pending";

interface IOrdersItem {
  readonly ingredients: ReadonlyArray<string>;
  readonly _id: string;
  readonly number: number;
  readonly createdAt: string;
  readonly name: string;

  readonly showStatus?: boolean;
  readonly status?: TOrderStatus;
}

const statusRuType = {
  done: "Выполнен",
  created: "Создан",
  pending: "В работе",
};

export const OrderItem: FC<IOrdersItem> = ({
  ingredients,
  _id,
  number,
  createdAt,
  name,
  status,
  showStatus,
}): JSX.Element => {
  const location = useLocation();

  const slicedIngredients = useMemo(
    () => (ingredients.length <= 5 ? ingredients : ingredients.slice(0, 5)),
    [ingredients]
  );
  const remainIngredients = useMemo(
    () => (ingredients.length <= 5 ? [] : ingredients.slice(5)),
    [ingredients]
  );

  return (
    <Link
      className={styles.link}
      to={{
        pathname: showStatus
          ? `${AppRoutes.ProfilePage}${AppRoutes.ProfileOrders}/${_id}`
          : `${AppRoutes.FeedPage}/${_id}`,
        state: { order: location },
      }}
    >
      <div className={`${styles.container} mb-4 mr-2 p-6`}>
        <div className={`${styles.numberAndDate} mb-6`}>
          <p className="text text_type_digits-default">#{number}</p>
          <OrderTime createdAt={createdAt} />
        </div>
        <h6
          className={`${
            showStatus ? "mb-2" : "mb-6"
          } text text_type_main-medium`}
        >
          {name}
        </h6>
        {status && showStatus && (
          <p
            className={`${
              status === "done" && styles.done
            } text text_type_main-default mb-5`}
          >
            {statusRuType[status]}
          </p>
        )}
        <div className={styles.ingredientsAndPrice}>
          {slicedIngredients.map((ingredient, index) => (
            <OrderIngredientIcon
              key={index + ingredient}
              ingredientId={ingredient}
              zIndex={index}
            />
          ))}
          {remainIngredients.length ? (
            <OrderIngredientIcon
              zIndex={5}
              remainIngredientsLength={remainIngredients.length}
            />
          ) : null}
          <OrderPrice ingredients={ingredients} />
        </div>
      </div>
    </Link>
  );
};
