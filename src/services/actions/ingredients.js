import { isResponseOk, getJSON, getIngredientsRequest } from "api/api";
import { setError, setLoading, setSuccess } from "services/actions/loading";

export const SAVE_INGREDIENTS = "FETCH_INGREDIENTS";
export const SAVE_SELECTED_INGREDIENT = "SAVE_SELECTED_INGREDIENT";
export const RESET_SELECTED_INGREDIENT = "RESET_SELECTED_INGREDIENT";
export const SAVE_CONSTRUCTOR_BUN = "SAVE_SELECTED_BUN";
export const SAVE_CONSTRUCTOR_INGREDIENT = "SAVE_CONSTRUCTOR_INGREDIENT";
export const REORDER_CONSTRUCTOR_INGREDIENTS =
  "REORDER_CONSTRUCTOR_INGREDIENTS";
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

export const getIngredients = () => async (dispatch) => {
  try {
    dispatch(setLoading());

    const response = await getIngredientsRequest();

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

export const moveIngredient =
  ({ item, index, monitor, ref }) =>
  (dispatch, getState) => {
    if (!ref.current) {
      return;
    }
    const dragIndex = item.index;
    const hoverIndex = index;

    if (dragIndex === hoverIndex) {
      return;
    }

    const hoverBoundingRect = ref.current?.getBoundingClientRect();
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    const clientOffset = monitor.getClientOffset();
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    const constructorIngredients =
      getState().ingredients.constructorIngredients;
    const dragCard = constructorIngredients[dragIndex];
    const filteredIngredients = constructorIngredients.filter(
      (_, index) => index !== dragIndex
    );

    dispatch(
      reorderConstructorIngredients([
        ...filteredIngredients.slice(0, hoverIndex),
        dragCard,
        ...filteredIngredients.slice(hoverIndex),
      ])
    );

    item.index = hoverIndex;
  };
