import { FC, RefObject } from "react";
import { Link, useLocation } from "react-router-dom";

import { IngredientCard } from "components/ingredient-card/ingredient-card";

import { ingredientTypes } from "constants/ingredient-type";
import { IBurgerIngredient } from "types/burger-ingredient";
import { TIngredientType } from "types/ingredient-type";

import styles from "./ingredient-list.module.css";

interface IIngredientList {
  setRefForIngredientType: (
    type: TIngredientType
  ) => RefObject<HTMLHeadingElement>;
  type: TIngredientType;
  ingredients: IBurgerIngredient[];
  selectIngredientAndOpenModal: (ingredient: IBurgerIngredient) => void;
}

export const IngredientList: FC<IIngredientList> = ({
  setRefForIngredientType,
  type,
  ingredients,
  selectIngredientAndOpenModal,
}): JSX.Element => {
  const location = useLocation();

  return (
    <>
      <h2
        ref={setRefForIngredientType(type)}
        className="text text_type_main-medium mb-6"
      >
        {ingredientTypes.ru[type]}
      </h2>
      <ul className={`${styles.ingredientsListByType}`}>
        {ingredients.map((ingredient) => (
          <li
            key={ingredient._id}
            onClick={() => selectIngredientAndOpenModal(ingredient)}
          >
            <Link
              className={styles.link}
              to={{
                pathname: `/ingredients/${ingredient._id}`,
                state: { background: location },
              }}
            >
              <IngredientCard ingredient={ingredient} />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};
