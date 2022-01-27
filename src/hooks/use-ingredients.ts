import { useCallback } from "react";
import { useDispatch } from "react-redux";

import {
  deleteConstructorIngredient,
  saveConstructorBun,
  saveConstructorIngredient,
  saveSelectedIngredient as saveSelectIngredient,
} from "services/actions/ingredients";
import {
  getIngredientsThunk,
  moveIngredientThunk,
} from "services/thunks/ingredients";

import { IBurgerIngredient } from "types/burger-ingredient";

export const useIngredients = () => {
  const dispatch = useDispatch();

  const getIngredients = useCallback(
    () => dispatch(getIngredientsThunk()),
    [dispatch]
  );

  const saveBun = useCallback(
    (ingredient: IBurgerIngredient) => dispatch(saveConstructorBun(ingredient)),
    [dispatch]
  );

  const saveIngredient = useCallback(
    (ingredient: IBurgerIngredient) =>
      dispatch(saveConstructorIngredient(ingredient)),
    [dispatch]
  );

  const deleteIngredient = useCallback(
    (index: number) => dispatch(deleteConstructorIngredient(index)),
    [dispatch]
  );

  const saveSelectedIngredient = useCallback(
    (ingredient: IBurgerIngredient) =>
      dispatch(saveSelectIngredient(ingredient)),
    [dispatch]
  );

  const moveIngredientToConstructor = useCallback(
    ({ item, index, monitor, ref }) =>
      dispatch(moveIngredientThunk({ item, index, monitor, ref })),
    [dispatch]
  );

  return {
    getIngredients,
    saveBun,
    saveIngredient,
    deleteIngredient,
    saveSelectedIngredient,
    moveIngredientToConstructor,
  };
};
