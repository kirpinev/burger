import {
  TOGGLE_INGREDIENT_MODAL,
  TOGGLE_ERROR_ORDER_MODAL,
  TOGGLE_SUCCESS_ORDER_MODAL,
} from "services/constants/modals";

export const toggleIngredientModal = () => ({
  type: TOGGLE_INGREDIENT_MODAL,
});

export const toggleErrorModal = () => ({
  type: TOGGLE_ERROR_ORDER_MODAL,
});

export const toggleSuccessOrderModal = () => ({
  type: TOGGLE_SUCCESS_ORDER_MODAL,
});
