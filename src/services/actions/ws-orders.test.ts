import * as actions from "services/actions/ws-orders";
import * as types from "services/constants/ws-orders";

describe("Экшен криэйторы вебсокет заказов", () => {
  it("должны корректно возвращать экшен со статусом открытия соединения", () => {
    const expectedAction = {
      type: types.WS_ORDERS_CONNECTION_START,
    };

    expect(actions.openWSConnection()).toEqual(expectedAction);
  });

  it("должны корректно возвращать экшен со статусом закрытия соединения", () => {
    const expectedAction = {
      type: types.WS_ORDERS_CONNECTION_CLOSED,
    };

    expect(actions.closeWSConnection()).toEqual(expectedAction);
  });
});
