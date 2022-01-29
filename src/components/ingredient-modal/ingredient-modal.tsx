import { FC, useCallback, useEffect } from "react";
import { useSelector } from "hooks/use-selector";
import { useHistory, useRouteMatch } from "react-router-dom";

import { Modal } from "components/modal/modal";
import { IngredientDetails } from "components/ingredient-details/ingredient-details";

import { selectSelectedIngredient } from "services/selectors/select-selected-ingredient";
import { selectBurgerIngredients } from "services/selectors/select-burger-ingredients";
import { selectLoadingStatus } from "services/selectors/select-loading-status";
import { useLoading } from "hooks/use-loading";

import { AppRoutes } from "enums/app-routes";
import { IBurgerIngredient } from "types/burger-ingredient";

export const IngredientModal: FC = (): JSX.Element | null => {
  const selectedIngredient = useSelector(selectSelectedIngredient);
  const { isLoading } = useSelector(selectLoadingStatus);
  const burgerIngredients = useSelector(selectBurgerIngredients);
  const { resetLoading } = useLoading();
  const history = useHistory();
  const match = useRouteMatch<{ id?: string }>(AppRoutes.IngredientsPage);

  const requestIngredient: IBurgerIngredient | null | undefined =
    burgerIngredients.length
      ? burgerIngredients.find(
          (i: IBurgerIngredient) => i._id === match?.params.id
        )
      : null;

  const goBack = useCallback(() => {
    history.goBack();
  }, [history]);

  useEffect(() => {
    return () => {
      resetLoading();
    };
  }, [resetLoading]);

  if (isLoading) {
    return null;
  }

  return (
    <Modal handleModalCloseClick={goBack}>
      <IngredientDetails ingredient={selectedIngredient || requestIngredient} />
    </Modal>
  );
};
