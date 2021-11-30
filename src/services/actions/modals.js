export const TOGGLE_INGREDIENT_MODAL = "TOGGLE_INGREDIENT_MODAL";
export const TOGGLE_ERROR_ORDER_MODAL = "TOGGLE_ERROR_ORDER_MODAL";
export const TOGGLE_SUCCESS_ORDER_MODAL = "TOGGLE_SUCCESS_ORDER_MODAL";

export const toggleIngredientModal = () => ({
  type: TOGGLE_INGREDIENT_MODAL,
});

export const toggleErrorOrderModal = () => ({
  type: TOGGLE_ERROR_ORDER_MODAL,
});

export const toggleSuccessOrderModal = () => ({
  type: TOGGLE_SUCCESS_ORDER_MODAL,
});
