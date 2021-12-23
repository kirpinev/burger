import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { IngredientDetails } from "components/ingredient-details/ingredient-details";
import { StatusContainer } from "components/status-container/status-container";

import { selectBurgerIngredients } from "services/selectors/select-burger-ingredients";
import { selectLoadingStatus } from "services/selectors/select-loading-status";
import { getIngredientsThunk } from "services/actions/ingredients";
import { resetLoadingState } from "services/actions/loading";

import styles from "./ingredient-details-full-page.module.css";

export const IngredientDetailsFullPage = () => {
  const { isLoading, isError } = useSelector(selectLoadingStatus);
  const burgerIngredients = useSelector(selectBurgerIngredients);
  const dispatch = useDispatch();
  const { id } = useParams();

  const requestIngredient = burgerIngredients.length
    ? burgerIngredients.find((i) => i._id === id)
    : null;

  useEffect(() => {
    return () => {
      dispatch(resetLoadingState());
    };
  }, [dispatch]);

  if (isLoading) {
    return <StatusContainer title="Загрузка..." />;
  }

  if (isError) {
    return (
      <StatusContainer
        buttonText="Повторить"
        onButtonClick={getIngredientsThunk}
        title="При запросе данных что-то пошло не так, повторить?"
      />
    );
  }

  return (
    <div className="body">
      <main className={styles.container}>
        <IngredientDetails ingredient={requestIngredient} />
      </main>
    </div>
  );
};
