import { useMemo, useRef } from "react";
import PropTypes from "prop-types";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { moveIngredient } from "services/actions/ingredients";

import { ingredient } from "prop-types/ingredient";
import { dndTypes } from "constants/dnd-types";

import styles from "./burger-item.module.css";

export const BurgerItem = ({ ingredient, deleteIngredient, index }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const [{ handlerId, isHover }, drop] = useDrop({
    accept: dndTypes.constructorItem,
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
      isHover: monitor.isOver(),
    }),
    drop: (item, monitor) => {
      dispatch(moveIngredient({ item, index, monitor, ref }));
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: dndTypes.constructorItem,
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

BurgerItem.propTypes = {
  ingredient: ingredient.isRequired,
  deleteIngredient: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};
