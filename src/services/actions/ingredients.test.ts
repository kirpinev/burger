import * as actions from "services/actions/ingredients";
import * as types from "services/constants/ingredients";

import { IBurgerIngredient } from "types/burger-ingredient";

describe("Экшен криэйтеры ингредиентов", () => {
  const ingredient: IBurgerIngredient = {
    _id: "60d3b41abdacab0026a733c6",
    name: "Краторная булка N-200i",
    type: "bun",
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    __v: 0,
  };
  const ingredientIndex = 1;

  it("должны корректно возвращать экшен с полученными игредиентами от сервера", () => {
    const expectedAction = {
      type: types.SAVE_INGREDIENTS,
      payload: [ingredient],
    };

    expect(actions.saveFetchedIngredients([ingredient])).toEqual(
      expectedAction
    );
  });

  it("должны корректно возвращать экшен с выбранным ингредиентом", () => {
    const expectedAction = {
      type: types.SAVE_SELECTED_INGREDIENT,
      payload: ingredient,
    };

    expect(actions.saveSelectedIngredient(ingredient)).toEqual(expectedAction);
  });

  it("должны корректно возвращать экшен ресета выбранного ингредиента", () => {
    const expectedAction = {
      type: types.RESET_SELECTED_INGREDIENT,
    };

    expect(actions.resetSelectedIngredient()).toEqual(expectedAction);
  });

  it("должны корректно возвращать экшен выбранной булочки", () => {
    const expectedAction = {
      type: types.SAVE_CONSTRUCTOR_BUN,
      payload: ingredient,
    };

    expect(actions.saveConstructorBun(ingredient)).toEqual(expectedAction);
  });

  it("должны корректно возвращать экшен выбранного ингредиента", () => {
    const expectedAction = {
      type: types.SAVE_CONSTRUCTOR_INGREDIENT,
      payload: ingredient,
    };

    expect(actions.saveConstructorIngredient(ingredient)).toEqual(
      expectedAction
    );
  });

  it("должны корректно возвращать экшен отсортированных ингредиентов", () => {
    const expectedAction = {
      type: types.REORDER_CONSTRUCTOR_INGREDIENTS,
      payload: [ingredient],
    };

    expect(actions.reorderConstructorIngredients([ingredient])).toEqual(
      expectedAction
    );
  });

  it("должны корректно возвращать экшен удаления ингредиента из конструктора", () => {
    const expectedAction = {
      type: types.DELETE_CONSTRUCTOR_INGREDIENT,
      payload: ingredientIndex,
    };

    expect(actions.deleteConstructorIngredient(ingredientIndex)).toEqual(
      expectedAction
    );
  });

  it("должны корректно возвращать экшен удаления ингредиентов из конструктора", () => {
    const expectedAction = {
      type: types.RESET_CONSTRUCTOR_INGREDIENTS,
    };

    expect(actions.resetConstructorIngredients()).toEqual(expectedAction);
  });
});
