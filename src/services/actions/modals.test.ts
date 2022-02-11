import * as actions from "services/actions/modals";
import * as types from "services/constants/modals";

describe("Экшен криэйторы модальных окон", () => {
  it("должны корректно возвращать экшен открытия/закрытия модального окна ингредиента", () => {
    const expectedAction = {
      type: types.TOGGLE_INGREDIENT_MODAL,
    };

    expect(actions.toggleIngredientModal()).toEqual(expectedAction);
  });

  it("должны корректно возвращать экшен открытия/закрытия модального окна ошибки заказа", () => {
    const expectedAction = {
      type: types.TOGGLE_ERROR_ORDER_MODAL,
    };

    expect(actions.toggleErrorModal()).toEqual(expectedAction);
  });

  it("должны корректно возвращать экшен открытия/закрытия модального окна c информацией об успешном заказе", () => {
    const expectedAction = {
      type: types.TOGGLE_SUCCESS_ORDER_MODAL,
    };

    expect(actions.toggleSuccessOrderModal()).toEqual(expectedAction);
  });
});
