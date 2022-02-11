import { Action } from "redux";

import {
  WSUserOrdersReducer,
  initialState,
} from "services/reducers/ws-user-orders-reducer";
import * as types from "services/constants/ws-user-orders";

import { WSOrderList } from "mocks/order";

describe("Редьюсер вебсокета заказов пользователя", () => {
  it("должен корректно возвращать начальное состояние", () => {
    expect(WSUserOrdersReducer(undefined, {} as Action)).toEqual(initialState);
  });

  it("должен корректно возвращать статус успешного соединения с сервером", () => {
    expect(
      WSUserOrdersReducer(
        { ...initialState },
        {
          type: types.WS_USER_ORDERS_CONNECTION_SUCCESS,
        }
      )
    ).toEqual({
      ...initialState,
      isWSConnectionError: false,
      WSConnected: true,
    });
  });

  it("должен корректно возвращать статус ошибки соединения с сервером", () => {
    expect(
      WSUserOrdersReducer(
        { ...initialState },
        {
          type: types.WS_USER_ORDERS_CONNECTION_ERROR,
        }
      )
    ).toEqual({
      ...initialState,
      isWSConnectionError: true,
    });
  });

  it("должен корректно возвращать статус закрытия соединения с сервером", () => {
    expect(
      WSUserOrdersReducer(
        { ...initialState },
        {
          type: types.WS_USER_ORDERS_CONNECTION_CLOSED,
        }
      )
    ).toEqual({
      ...initialState,
      WSConnected: false,
    });
  });

  it("должен корректно возвращать новый список заказов", () => {
    expect(
      WSUserOrdersReducer(
        { ...initialState },
        {
          type: types.WS_USER_ORDERS_GET_MESSAGE,
          payload: WSOrderList,
        }
      )
    ).toEqual({
      ...initialState,
      ...WSOrderList,
    });
  });
});
