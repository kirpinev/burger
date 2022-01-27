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

import { IBurgerIngredient } from "types/burger-ingredient";

export interface ISaveFetchedIngredients {
  readonly type: typeof SAVE_INGREDIENTS;
  readonly payload: IBurgerIngredient[];
}

export interface ISaveSelectedIngredient {
  readonly type: typeof SAVE_SELECTED_INGREDIENT;
  readonly payload: IBurgerIngredient;
}

export interface IResetSelectedIngredient {
  readonly type: typeof RESET_SELECTED_INGREDIENT;
}

export interface ISaveConstructorBun {
  readonly type: typeof SAVE_CONSTRUCTOR_BUN;
  readonly payload: IBurgerIngredient;
}

export interface ISaveConstructorIngredient {
  readonly type: typeof SAVE_CONSTRUCTOR_INGREDIENT;
  readonly payload: IBurgerIngredient;
}

export interface IReorderConstructorIngredients {
  readonly type: typeof REORDER_CONSTRUCTOR_INGREDIENTS;
  readonly payload: IBurgerIngredient[];
}

export interface IDeleteConstructorIngredient {
  readonly type: typeof DELETE_CONSTRUCTOR_INGREDIENT;
  readonly payload: number;
}

export interface IResetConstructorIngredients {
  readonly type: typeof RESET_CONSTRUCTOR_INGREDIENTS;
}

export type TIngredientsActions =
  | ISaveFetchedIngredients
  | ISaveSelectedIngredient
  | IResetSelectedIngredient
  | ISaveConstructorBun
  | ISaveConstructorIngredient
  | IReorderConstructorIngredients
  | IDeleteConstructorIngredient
  | IResetConstructorIngredients;

export const saveFetchedIngredients = (
  ingredients: IBurgerIngredient[]
): ISaveFetchedIngredients => ({
  type: SAVE_INGREDIENTS,
  payload: ingredients,
});

export const saveSelectedIngredient = (
  ingredient: IBurgerIngredient
): ISaveSelectedIngredient => ({
  type: SAVE_SELECTED_INGREDIENT,
  payload: ingredient,
});

export const resetSelectedIngredient = (): IResetSelectedIngredient => ({
  type: RESET_SELECTED_INGREDIENT,
});

export const saveConstructorBun = (
  ingredient: IBurgerIngredient
): ISaveConstructorBun => ({
  type: SAVE_CONSTRUCTOR_BUN,
  payload: ingredient,
});

export const saveConstructorIngredient = (
  ingredient: IBurgerIngredient
): ISaveConstructorIngredient => ({
  type: SAVE_CONSTRUCTOR_INGREDIENT,
  payload: ingredient,
});

export const reorderConstructorIngredients = (
  ingredients: IBurgerIngredient[]
): IReorderConstructorIngredients => ({
  type: REORDER_CONSTRUCTOR_INGREDIENTS,
  payload: ingredients,
});

export const deleteConstructorIngredient = (
  index: number
): IDeleteConstructorIngredient => ({
  type: DELETE_CONSTRUCTOR_INGREDIENT,
  payload: index,
});

export const resetConstructorIngredients =
  (): IResetConstructorIngredients => ({
    type: RESET_CONSTRUCTOR_INGREDIENTS,
  });
