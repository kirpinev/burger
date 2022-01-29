import { FC, useCallback, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { format, formatDistance } from "date-fns";
import { ru } from "date-fns/locale";

import { FeedItemIngredientIcon } from "components/feed-item-ingredient-icon/feed-item-ingredient-icon";
import { FeedListItemPrice } from "components/feed-list-item-price/feed-list-item-price";

import { AppRoutes } from "enums/app-routes";

import styles from "./feed-item.module.css";

interface IFeedItem {
  readonly ingredients: ReadonlyArray<string>;
  readonly _id: string;
  readonly number: number;
  readonly createdAt: string;
  readonly name: string;
}

export const FeedItem: FC<IFeedItem> = ({
  ingredients,
  _id,
  number,
  createdAt,
  name,
}): JSX.Element => {
  const history = useHistory();

  const dateObject = useMemo(() => new Date(createdAt), [createdAt]);
  const stringDate = useMemo(
    () =>
      formatDistance(dateObject, new Date(), {
        addSuffix: true,
        locale: ru,
      }),
    [dateObject]
  );
  const time = useMemo(
    () =>
      format(dateObject, "p", {
        locale: ru,
      }),
    [dateObject]
  );
  const slicedIngredients = useMemo(
    () => (ingredients.length <= 5 ? ingredients : ingredients.slice(0, 5)),
    [ingredients]
  );
  const remainIngredients = useMemo(
    () => (ingredients.length <= 5 ? [] : ingredients.slice(5)),
    [ingredients]
  );

  const goToSelectedFeed = useCallback(
    () => history.push(`${AppRoutes.FeedPage}/${_id}`),
    [history]
  );

  return (
    <div
      className={`${styles.container} mb-4 mr-2 p-6`}
      onClick={goToSelectedFeed}
    >
      <div className={`${styles.numberAndDate} mb-6`}>
        <p className="text text_type_digits-default">#{number}</p>
        <time
          className="text text_type_main-default text_color_inactive"
          dateTime={createdAt}
        >
          {stringDate}, {time} i-GMT+3
        </time>
      </div>
      <h6 className="text text_type_main-medium mb-6">{name}</h6>
      <div className={styles.ingredientsAndPrice}>
        {slicedIngredients.map((ingredient, index) => (
          <FeedItemIngredientIcon
            key={index + ingredient}
            ingredientId={ingredient}
            zIndex={index}
          />
        ))}
        {remainIngredients.length ? (
          <FeedItemIngredientIcon
            zIndex={5}
            remainIngredientsLength={remainIngredients.length}
          />
        ) : null}
        <FeedListItemPrice ingredients={ingredients} />
      </div>
    </div>
  );
};
