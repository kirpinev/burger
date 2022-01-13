import { FC, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";

import { Modal } from "components/modal/modal";
import { IngredientDetails } from "components/ingredient-details/ingredient-details";

import { selectSelectedIngredient } from "services/selectors/select-selected-ingredient";
import { selectBurgerIngredients } from "services/selectors/select-burger-ingredients";
import { resetLoadingState } from "services/actions/loading";
import { selectLoadingStatus } from "services/selectors/select-loading-status";

import { AppRoutes } from "enums/app-routes";
import { IBurgerIngredient } from "types/burger-ingredient";

export const IngredientModal: FC = (): JSX.Element | null => {
  const selectedIngredient = useSelector(selectSelectedIngredient);
  const { isLoading } = useSelector(selectLoadingStatus);
  const burgerIngredients = useSelector(selectBurgerIngredients);
  const history = useHistory();
  const dispatch = useDispatch();
  const match = useRouteMatch<{ id?: string }>(AppRoutes.IngredientsPage);

  const requestIngredient: IBurgerIngredient | null = burgerIngredients.length
    ? burgerIngredients.find(
        (i: IBurgerIngredient) => i._id === match?.params.id
      )
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
