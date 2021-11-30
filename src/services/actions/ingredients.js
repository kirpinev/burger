import { isResponseOk, getJSON, getAllIngredients } from "api/api";
import { setError, setLoading, setSuccess } from "services/actions/loading";

export const SAVE_INGREDIENTS = "FETCH_INGREDIENTS";
export const SAVE_SELECTED_INGREDIENT = "SAVE_SELECTED_INGREDIENT";
export const RESET_SELECTED_INGREDIENT = "RESET_SELECTED_INGREDIENT";

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
