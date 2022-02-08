import * as action from "services/actions/order";
import * as types from "services/constants/order";

import { IOrderDetails } from "services/actions/order";

describe("Экшен криэйторы заказа", () => {
  const order: IOrderDetails = {
    name: "Краторная булка N-200i",
    order: {
      number: 1234567890,
    },
  };
  const orderPayload = {
    name: order.name,
    number: order.order.number,
  };

  it("должны корректно возвращать экшен с сохраненным заказом", () => {
    const expectedAction = {
      type: types.SAVE_ORDER,
      payload: orderPayload,
    };

    expect(action.saveOrder(order)).toEqual(expectedAction);
  });

  it("должны корректно возвращать экшен с очисткой информации о заказе", () => {
    const expectedAction = {
      type: types.RESET_ORDER,
    };

    expect(action.resetOrder()).toEqual(expectedAction);
  });

  it("должны корректно возвращать экшен с информацией об оформлении заказа", () => {
    const expectedAction = {
      type: types.TOGGLE_ORDER_POSTING,
      payload: true,
    };

    expect(action.toggleOrderPosting(expectedAction.payload)).toEqual(
      expectedAction
    );
  });
});
