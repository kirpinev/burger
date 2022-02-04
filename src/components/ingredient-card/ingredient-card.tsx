import { FC, useMemo } from "react";
import { useDrag } from "react-dnd";
import { useSelector } from "hooks/use-selector";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { selectConstructorIngredients } from "services/selectors/select-constructor-ingredients";

import { IBurgerIngredient } from "types/burger-ingredient";
import { DndTypes } from "enums/dnd-types";

import styles from "./ingredient-card.module.css";

interface IIngredientCard {
  ingredient: IBurgerIngredient;
}

export const IngredientCard: FC<IIngredientCard> = ({
  ingredient,
}): JSX.Element => {
  const [{ isDragging }, dragRef] = useDrag(
    {
      type: DndTypes.IngredientItem,
      item: { ...ingredient },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    },
    []
  );
  const { selectedBun, constructorIngredients } = useSelector(
    selectConstructorIngredients
  );

  const bunCount = useMemo(
    () =>
      ingredient.type === "bun" &&
      selectedBun &&
      selectedBun._id === ingredient._id,
    [ingredient._id, ingredient.type, selectedBun]
  );
  const ingredientCount = useMemo(
    () =>
      ingredient.type !== "bun"
        ? constructorIngredients.filter(
            (constructorIngredient: IBurgerIngredient) =>
              constructorIngredient._id === ingredient._id
          ).length
        : 0,
    [constructorIngredients, ingredient._id, ingredient.type]
  );

  const opacity = useMemo(() => (isDragging ? 0.5 : 1), [isDragging]);

  return (
    <div className={styles.container} style={{ opacity }}>
      {bunCount && <Counter count={2} size="default" />}
      {ingredientCount > 0 && (
        <Counter count={ingredientCount} size="default" />
      )}
      <img
        ref={dragRef}
        className={`${styles.image} mb-2`}
        src={ingredient.image}
        alt={ingredient.name}
      />
      <div className={`${styles.group} mb-2`}>
        <p className="text text_type_digits-default mr-1">{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <h3 className={`${styles.name} text text_type_main-default`}>
        {ingredient.name}
      </h3>
    </div>
  );
};
