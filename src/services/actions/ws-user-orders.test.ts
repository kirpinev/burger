import * as actions from "services/actions/ws-user-orders";
import * as types from "services/constants/ws-user-orders";

describe("Экшен криэйторы вебсокет заказов пользователя", () => {
  it("должны корректно возвращать экшен со статусом открытия соединения", () => {
    const expectedAction = {
      type: types.WS_USER_ORDERS_CONNECTION_START,
    };

    expect(actions.openWSConnection()).toEqual(expectedAction);
  });

  it("должны корректно возвращать экшен со статусом закрытия соединения", () => {
    const expectedAction = {
      type: types.WS_USER_ORDERS_CONNECTION_CLOSED,
    };

    expect(actions.closeWSConnection()).toEqual(expectedAction);
  });
});
