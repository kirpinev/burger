import { isResponseOk, getJSON, getAllIngredients } from "api/api";
import { setError, setLoading, setSuccess } from "services/actions/loading";

export const SAVE_INGREDIENTS = "FETCH_INGREDIENTS";
export const SAVE_SELECTED_INGREDIENT = "SAVE_SELECTED_INGREDIENT";
export const RESET_SELECTED_INGREDIENT = "RESET_SELECTED_INGREDIENT";
export const SAVE_CONSTRUCTOR_BUN = "SAVE_SELECTED_BUN";
export const SAVE_CONSTRUCTOR_INGREDIENT = "SAVE_CONSTRUCTOR_INGREDIENT";
export const RESET_CONSTRUCTOR_INGREDIENTS = "RESET_CONSTRUCTOR_INGREDIENTS";
export const DELETE_CONSTRUCTOR_INGREDIENT = "DELETE_CONSTRUCTOR_INGREDIENT";

const saveFetchedIngredients = (ingredients) => ({
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

export const deleteConstructorIngredient = (index) => ({
  type: DELETE_CONSTRUCTOR_INGREDIENT,
  payload: index,
});

export const resetConstructorIngredients = () => ({
  type: RESET_CONSTRUCTOR_INGREDIENTS,
});

export const getIngredients = () => async (dispatch) => {
  try {
    dispatch(setLoading());

    const response = await getAllIngredients();

    if (!isResponseOk(response)) {
      throw new Error();
    }

    const { data: ingredientsList } = await getJSON(response);

    dispatch(saveFetchedIngredients(ingredientsList));
    dispatch(setSuccess());
  } catch (e) {
    dispatch(setError());
  }
};
