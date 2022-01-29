import { FC, useMemo } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { selectBurgerIngredients } from "services/selectors/select-burger-ingredients";

import { useSelector } from "hooks/use-selector";

import styles from "./feed-list-item-price.module.css";

interface IFeedListItemPrice {
  ingredients: ReadonlyArray<string>;
}

export const FeedListItemPrice: FC<IFeedListItemPrice> = ({
  ingredients,
}): JSX.Element => {
  const constructorIngredients = useSelector(selectBurgerIngredients);

  const price = useMemo(
    () =>
      ingredients && constructorIngredients && constructorIngredients.length
        ? ingredients.reduce((acc, curr) => {
            const foundIngredient = constructorIngredients.find(
              (constructorIngredient) => constructorIngredient._id === curr
            );

            return acc + foundIngredient!.price;
          }, 0)
        : 0,
    [ingredients, constructorIngredients]
  );

  return (
    <div className={styles.container}>
      <p className="text text_type_digits-default">{price}</p>
      <CurrencyIcon type="primary" />
    </div>
  );
};
