import React, { FC } from "react";
import { useSelector } from "hooks/use-selector";
import { useParams } from "react-router-dom";

import { IngredientDetails } from "components/ingredient-details/ingredient-details";
import { WSLoadingHandlerIngredients } from "components/ws-loading-handler-ingredients/ws-loading-handler-ingredients";

import { selectBurgerIngredients } from "services/selectors/select-burger-ingredients";
import { IBurgerIngredient } from "types/burger-ingredient";

import styles from "./ingredient-details-full-page.module.css";

export const IngredientDetailsFullPage: FC = (): JSX.Element => {
  const burgerIngredients = useSelector(selectBurgerIngredients);
  const { id } = useParams<{ id?: string }>();

  const requestIngredient: IBurgerIngredient | null | undefined =
    burgerIngredients.length
      ? burgerIngredients.find((i: IBurgerIngredient) => i._id === id)
      : null;

  return (
    <WSLoadingHandlerIngredients>
      <div className="body">
        <main className={styles.container}>
          <IngredientDetails ingredient={requestIngredient} />
        </main>
      </div>
    </WSLoadingHandlerIngredients>
  );
};
