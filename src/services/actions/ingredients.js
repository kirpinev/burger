import {
  SAVE_INGREDIENTS,
  SAVE_SELECTED_INGREDIENT,
  RESET_SELECTED_INGREDIENT,
  SAVE_CONSTRUCTOR_BUN,
  SAVE_CONSTRUCTOR_INGREDIENT,
  REORDER_CONSTRUCTOR_INGREDIENTS,
  DELETE_CONSTRUCTOR_INGREDIENT,
  RESET_CONSTRUCTOR_INGREDIENTS,
} from "services/constants/ingredients";

export const saveFetchedIngredients = (ingredients) => ({
  type: SAVE_INGREDIENTS,
  payload: ingredients,
});

export const saveSelectedIngredient = (ingredient) => ({
  type: SAVE_SELECTED_INGREDIENT,
  payload: ingredient,
});

export const resetSelectedIngredient = () => ({
  type: RESET_SELECTED_INGREDIENT,
});

export const saveConstructorBun = (bun) => ({
  type: SAVE_CONSTRUCTOR_BUN,
  payload: bun,
});

export const saveConstructorIngredient = (ingredient) => ({
  type: SAVE_CONSTRUCTOR_INGREDIENT,
  payload: ingredient,
});

export const reorderConstructorIngredients = (ingredients) => ({
  type: REORDER_CONSTRUCTOR_INGREDIENTS,
  payload: ingredients,
});

export const deleteConstructorIngredient = (index) => ({
  type: DELETE_CONSTRUCTOR_INGREDIENT,
  payload: index,
});

export const resetConstructorIngredients = () => ({
  type: RESET_CONSTRUCTOR_INGREDIENTS,
});
