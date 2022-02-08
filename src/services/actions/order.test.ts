import * as action from "services/actions/order";
import * as types from "services/constants/order";

import { createdOrder, createdOrderPayload } from "mocks/order";

describe("Экшен криэйторы заказа", () => {
  it("должны корректно возвращать экшен с сохраненным заказом", () => {
    const expectedAction = {
      type: types.SAVE_ORDER,
      payload: createdOrderPayload,
    };

    expect(action.saveOrder(createdOrder)).toEqual(expectedAction);
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
