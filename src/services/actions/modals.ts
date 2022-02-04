import {
  TOGGLE_INGREDIENT_MODAL,
  TOGGLE_ERROR_ORDER_MODAL,
  TOGGLE_SUCCESS_ORDER_MODAL,
} from "services/constants/modals";

export interface IToggleIngredientModal {
  readonly type: typeof TOGGLE_INGREDIENT_MODAL;
}

export interface IToggleErrorModal {
  readonly type: typeof TOGGLE_ERROR_ORDER_MODAL;
}

export interface IToggleSuccessOrderModal {
  readonly type: typeof TOGGLE_SUCCESS_ORDER_MODAL;
}

export type TModalsActions =
  | IToggleIngredientModal
  | IToggleErrorModal
  | IToggleSuccessOrderModal;

export const toggleIngredientModal = (): IToggleIngredientModal => ({
  type: TOGGLE_INGREDIENT_MODAL,
});

export const toggleErrorModal = (): IToggleErrorModal => ({
  type: TOGGLE_ERROR_ORDER_MODAL,
});

export const toggleSuccessOrderModal = (): IToggleSuccessOrderModal => ({
  type: TOGGLE_SUCCESS_ORDER_MODAL,
});
