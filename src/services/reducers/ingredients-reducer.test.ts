import { Action } from "redux";

import {
  ingredientsReducer,
  initialState,
} from "services/reducers/ingredients-reducer";
import * as types from "services/constants/ingredients";

import {
  ingredient,
  ingredientIndex,
  ingredientsArray,
} from "mocks/ingredient";

describe("Редьюсер ингредиентов", () => {
  it("должен корректно возвращать начальное состояние", () => {
    expect(ingredientsReducer(undefined, {} as Action)).toEqual(initialState);
  });

  it("должен корректно обработать сохрание ингредиентов", () => {
    expect(
      ingredientsReducer(
        { ...initialState },
        {
          type: types.SAVE_INGREDIENTS,
          payload: [ingredient],
        }
      )
    ).toEqual({ ...initialState, burgerIngredients: [ingredient] });
  });

  it("должен корректно сохранять выбранный ингредиент", () => {
    expect(
      ingredientsReducer(
        { ...initialState },
        {
          type: types.SAVE_SELECTED_INGREDIENT,
          payload: ingredient,
        }
      )
    ).toEqual({ ...initialState, selectedIngredient: ingredient });
  });

  it("должен корректно удалять выбранный ингредиент", () => {
    expect(
      ingredientsReducer(
        { ...initialState, selectedIngredient: ingredient },
        {
          type: types.RESET_SELECTED_INGREDIENT,
        }
      )
    ).toEqual({
      ...initialState,
      selectedIngredient: initialState.selectedIngredient,
    });
  });

  it("должен корректно сохранять выбранную булочку", () => {
    expect(
      ingredientsReducer(
        { ...initialState },
        {
          type: types.SAVE_CONSTRUCTOR_BUN,
          payload: ingredient,
        }
      )
    ).toEqual({ ...initialState, selectedBun: ingredient });
  });

  it("должен корректно очищать ингредиенты в конструкторе", () => {
    expect(
      ingredientsReducer(
        {
          ...initialState,
          constructorIngredients: [ingredient],
          selectedBun: ingredient,
        },
        {
          type: types.RESET_CONSTRUCTOR_INGREDIENTS,
        }
      )
    ).toEqual({
      ...initialState,
      constructorIngredients: initialState.constructorIngredients,
      selectedBun: initialState.selectedBun,
    });
  });

  it("должен корректно сохранять ингредиент в конструктор", () => {
    expect(
      ingredientsReducer(
        { ...initialState },
        {
          type: types.SAVE_CONSTRUCTOR_INGREDIENT,
          payload: ingredient,
        }
      )
    ).toEqual({ ...initialState, constructorIngredients: [ingredient] });
  });

  it("должен корректно пересортировывать ингредиенты в конструкторе", () => {
    expect(
      ingredientsReducer(
        { ...initialState },
        {
          type: types.REORDER_CONSTRUCTOR_INGREDIENTS,
          payload: [ingredient],
        }
      )
    ).toEqual({ ...initialState, constructorIngredients: [ingredient] });
  });

  it("должен корректно удалять ингредиент из конструктора", () => {
    expect(
      ingredientsReducer(
        { ...initialState, constructorIngredients: ingredientsArray },
        {
          type: types.DELETE_CONSTRUCTOR_INGREDIENT,
          payload: ingredientIndex,
        }
      )
    ).toEqual({
      ...initialState,
      constructorIngredients: [ingredientsArray[0], ingredientsArray[2]],
    });
  });
});
