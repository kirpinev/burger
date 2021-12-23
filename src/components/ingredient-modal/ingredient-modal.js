import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";

import { Modal } from "components/modal/modal";
import { IngredientDetails } from "components/ingredient-details/ingredient-details";

import { selectSelectedIngredient } from "services/selectors/select-selected-ingredient";
import { selectBurgerIngredients } from "services/selectors/select-burger-ingredients";
import { resetLoadingState } from "services/actions/loading";
import { selectLoadingStatus } from "services/selectors/select-loading-status";
import { appRoutes } from "constants/app-routes";

export const IngredientModal = () => {
  const selectedIngredient = useSelector(selectSelectedIngredient);
  const { isLoading } = useSelector(selectLoadingStatus);
  const burgerIngredients = useSelector(selectBurgerIngredients);
  const history = useHistory();
  const dispatch = useDispatch();
  const match = useRouteMatch(appRoutes.ingredientsPage);

  const requestIngredient = burgerIngredients.length
    ? burgerIngredients.find((i) => i._id === match.params.id)
    : null;

  const goBack = useCallback(() => {
    history.goBack();
  }, [history]);

  useEffect(() => {
    return () => {
      dispatch(resetLoadingState());
    };
  }, [dispatch]);

  if (isLoading) {
    return null;
  }

  return (
    <Modal handleModalCloseClick={goBack}>
      <IngredientDetails ingredient={selectedIngredient || requestIngredient} />
    </Modal>
  );
};
