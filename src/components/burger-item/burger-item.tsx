import { FC, useMemo, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useIngredients } from "hooks/use-ingredients";
import { DndTypes } from "enums/dnd-types";
import { IBurgerIngredient } from "types/burger-ingredient";

import styles from "./burger-item.module.css";

interface IBurgerItem {
  readonly ingredient: IBurgerIngredient;
  readonly deleteIngredient: () => void;
  readonly index: number;
}

export const BurgerItem: FC<IBurgerItem> = ({
  ingredient,
  deleteIngredient,
  index,
}): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  const { moveIngredientToConstructor } = useIngredients();

  const [{ handlerId, isHover }, drop] = useDrop({
    accept: DndTypes.ConstructorItem,
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
      isHover: monitor.isOver(),
    }),
    drop: (item, monitor) => {
      moveIngredientToConstructor({ item, index, monitor, ref });
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: DndTypes.ConstructorItem,
    item: () => {
      return { index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = useMemo(
    () => (isDragging || isHover ? 0.5 : 1),
    [isDragging, isHover]
  );

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`${styles.ingredientContainer} mr-1`}
      style={{ opacity }}
      data-handler-id={handlerId}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={deleteIngredient}
      />
    </div>
  );
};
