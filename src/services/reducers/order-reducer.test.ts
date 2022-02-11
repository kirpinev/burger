import { Action } from "redux";

import { orderReducer, initialState } from "services/reducers/order-reducer";
import * as types from "services/constants/order";

import { createdOrderPayload } from "mocks/order";

describe("Редьюсер заказов", () => {
  it("должен корректно возвращать начальное состояние", () => {
    expect(orderReducer(undefined, {} as Action)).toEqual(initialState);
  });

  it("должен корректно сохранять заказ", () => {
    expect(
      orderReducer(
        { ...initialState },
        {
          type: types.SAVE_ORDER,
          payload: createdOrderPayload,
        }
      )
    ).toEqual({ ...initialState, ...createdOrderPayload });
  });

  it("должен корректно обновлять статус оформления заказа", () => {
    expect(
      orderReducer(
        { ...initialState },
        {
          type: types.TOGGLE_ORDER_POSTING,
          payload: true,
        }
      )
    ).toEqual({ ...initialState, isOrderPosting: true });
  });

  it("должен корректно очищать заказ", () => {
    expect(
      orderReducer(
        { ...initialState },
        {
          type: types.RESET_ORDER,
        }
      )
    ).toEqual({ ...initialState });
  });
});
