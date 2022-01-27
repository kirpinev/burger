import { isResponseOk, getJSON, getIngredientsRequest } from "api/api";

import { setError, setLoading, setSuccess } from "services/actions/loading";
import {
  reorderConstructorIngredients,
  saveFetchedIngredients,
} from "services/actions/ingredients";

export const getIngredientsThunk = () => async (dispatch, getState) => {
  try {
    const ingredients = getState().ingredients.burgerIngredients;

    if (ingredients.length !== 0) {
      return;
    }

    dispatch(setLoading());

    const response = await getIngredientsRequest();

    if (!isResponseOk(response)) {
      throw new Error();
    }

    const { data } = await getJSON(response);

    dispatch(saveFetchedIngredients(data));
    dispatch(setSuccess());
  } catch (e) {
    dispatch(setError());
  }
};

export const moveIngredientThunk =
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
