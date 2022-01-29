import { FC, useMemo } from "react";

import { selectBurgerIngredients } from "services/selectors/select-burger-ingredients";

import { useSelector } from "hooks/use-selector";

import styles from "./feed-item-ingredient-icon.module.css";

interface IFeedIngredient {
  readonly zIndex: number;

  readonly ingredientId?: string;
  readonly remainIngredientsLength?: number;
}

export const FeedItemIngredientIcon: FC<IFeedIngredient> = ({
  ingredientId,
  zIndex,
  remainIngredientsLength,
}): JSX.Element => {
  const storeIngredients = useSelector(selectBurgerIngredients);
  const maxIngredientsLength = 5;

  const ingredientObject = useMemo(
    () =>
      storeIngredients.find((ingredient) => ingredient._id === ingredientId),
    [ingredientId, storeIngredients]
  );

  return (
    <div
      className={styles.container}
      style={{ zIndex: maxIngredientsLength - zIndex }}
    >
      <div className={styles.imageContainer}>
        {remainIngredientsLength ? (
          <p className="text text_type_main-default">
            +{remainIngredientsLength}
          </p>
        ) : (
          <img
            src={ingredientObject?.image}
            alt={ingredientObject?.name}
            className={styles.image}
          />
        )}
      </div>
    </div>
  );
};
