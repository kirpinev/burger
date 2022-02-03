import { FC, useMemo } from "react";

import { selectBurgerIngredients } from "services/selectors/select-burger-ingredients";

import { useSelector } from "hooks/use-selector";

import styles from "./order-ingredient-icon.module.css";

interface IOrderIngredient {
  readonly zIndex: number;

  readonly ingredientId?: string;
  readonly remainIngredientsLength?: number;
}

export const OrderIngredientIcon: FC<IOrderIngredient> = ({
  ingredientId,
  zIndex,
  remainIngredientsLength,
}): JSX.Element => {
  const storeIngredients = useSelector(selectBurgerIngredients);
  const maxIngredientsLength = 100;

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
