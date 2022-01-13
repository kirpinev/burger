import { FC } from "react";

import { IBurgerIngredient } from "types/burger-ingredient";

import styles from "./ingredient-details.module.css";

interface IIngredientDetails {
  ingredient: IBurgerIngredient | null;
}

export const IngredientDetails: FC<IIngredientDetails> = ({
  ingredient,
}): JSX.Element | null => {
  return ingredient ? (
    <>
      <h4 className={`${styles.title} text text_type_main-large`}>
        Детали ингредиента
      </h4>
      <div className={styles.container}>
        <img src={ingredient.image} alt={ingredient.name} className="mb-4" />
        <p className={`${styles.name} text text_type_main-medium mb-8`}>
          {ingredient.name}
        </p>
        <ul
          className={`${styles.list} text text_type_main-default text_color_inactive mb-15`}
        >
          <li className={styles.listItem}>
            <p className={`${styles.itemText}`}>Калории, ккал</p>
            <p className={`${styles.itemText} text text_type_digits-default`}>
              {ingredient.calories}
            </p>
          </li>
          <li className={styles.listItem}>
            <p className={styles.itemText}>Белки, г</p>
            <p className={`${styles.itemText} text text_type_digits-default`}>
              {ingredient.proteins}
            </p>
          </li>
          <li className={styles.listItem}>
            <p className={styles.itemText}>Жиры, г</p>
            <p className={`${styles.itemText} text text_type_digits-default`}>
              {ingredient.fat}
            </p>
          </li>
          <li className={styles.listItem}>
            <p className={styles.itemText}>Углеводы, г</p>
            <p className={`${styles.itemText} text text_type_digits-default`}>
              {ingredient.carbohydrates}
            </p>
          </li>
        </ul>
      </div>
    </>
  ) : null;
};
