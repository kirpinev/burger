import { FC } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { selectBurgerIngredients } from "services/selectors/select-burger-ingredients";
import { useSelector } from "hooks/use-selector";

import styles from "./detailed-ingredient-price.module.css";

interface IDetailedIngredientPrice {
  readonly ingredientId: string;
  readonly ingredientAmount: number;
}

export const DetailedIngredientPrice: FC<IDetailedIngredientPrice> = ({
  ingredientId,
  ingredientAmount,
}): JSX.Element => {
  const ingredients = useSelector(selectBurgerIngredients);

  const ingredientPrice =
    ingredients && ingredients.length
      ? ingredients.find((ingredient) => ingredient._id === ingredientId)?.price
      : 0;

  return (
    <p className={`${styles.price} text text_type_digits-default`}>
      {ingredientAmount} x {ingredientPrice}
      <CurrencyIcon type="primary" />
    </p>
  );
};
