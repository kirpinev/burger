import { Action } from "redux";

import { modalsReducer, initialState } from "services/reducers/modals-reducer";
import * as types from "services/constants/modals";

describe("Редьюсер модальных окон", () => {
  it("должен корректно возвращать начальное состояние", () => {
    expect(modalsReducer(undefined, {} as Action)).toEqual(initialState);
  });

  it("должен корректно открывать/закрывать модальное окно ингредиента", () => {
    expect(
      modalsReducer(
        { ...initialState },
        {
          type: types.TOGGLE_INGREDIENT_MODAL,
        }
      )
    ).toEqual({
      ...initialState,
      isIngredientModalOpen: !initialState.isIngredientModalOpen,
    });
  });

  it("должен корректно открывать/закрывать модальное окно с успешным оформлением заказа", () => {
    expect(
      modalsReducer(
        { ...initialState },
        {
          type: types.TOGGLE_SUCCESS_ORDER_MODAL,
        }
      )
    ).toEqual({
      ...initialState,
      isSuccessOrderModalOpen: !initialState.isSuccessOrderModalOpen,
    });
  });

  it("должен корректно открывать/закрывать модальное окно с ошибкой оформления заказа", () => {
    expect(
      modalsReducer(
        { ...initialState },
        {
          type: types.TOGGLE_ERROR_ORDER_MODAL,
        }
      )
    ).toEqual({
      ...initialState,
      isErrorModalOpen: !initialState.isErrorModalOpen,
    });
  });
});
