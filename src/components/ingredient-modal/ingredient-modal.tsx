import { FC, useCallback } from "react";
import { useSelector } from "hooks/use-selector";
import { useHistory, useRouteMatch } from "react-router-dom";

import { Modal } from "components/modal/modal";
import { IngredientDetails } from "components/ingredient-details/ingredient-details";
import { WSLoadingHandlerModal } from "components/ws-loading-handler-modal/ws-loading-handler-modal";

import { selectBurgerIngredients } from "services/selectors/select-burger-ingredients";

import { AppRoutes } from "enums/app-routes";
import { IBurgerIngredient } from "types/burger-ingredient";

export const IngredientModal: FC = (): JSX.Element | null => {
  const burgerIngredients = useSelector(selectBurgerIngredients);
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

  return (
    <WSLoadingHandlerModal>
      <Modal handleModalCloseClick={goBack}>
        <IngredientDetails ingredient={requestIngredient} />
      </Modal>
    </WSLoadingHandlerModal>
  );
};
