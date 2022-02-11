import { Action } from "redux";

import {
  WSOrdersReducer,
  initialState,
} from "services/reducers/ws-orders-reducer";
import * as types from "services/constants/ws-orders";

import { WSOrderList } from "mocks/order";

describe("Редьюсер вебсокета ленты заказов", () => {
  it("должен корректно возвращать начальное состояние", () => {
    expect(WSOrdersReducer(undefined, {} as Action)).toEqual(initialState);
  });

  it("должен корректно возвращать статус успешного соединения с сервером", () => {
    expect(
      WSOrdersReducer(
        { ...initialState },
        {
          type: types.WS_ORDERS_CONNECTION_SUCCESS,
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
      WSOrdersReducer(
        { ...initialState },
        {
          type: types.WS_ORDERS_CONNECTION_ERROR,
        }
      )
    ).toEqual({
      ...initialState,
      isWSConnectionError: true,
    });
  });

  it("должен корректно возвращать статус закрытия соединения с сервером", () => {
    expect(
      WSOrdersReducer(
        { ...initialState },
        {
          type: types.WS_ORDERS_CONNECTION_CLOSED,
        }
      )
    ).toEqual({
      ...initialState,
      WSConnected: false,
    });
  });

  it("должен корректно возвращать новый список заказов", () => {
    expect(
      WSOrdersReducer(
        { ...initialState },
        {
          type: types.WS_ORDERS_GET_MESSAGE,
          payload: WSOrderList,
        }
      )
    ).toEqual({
      ...initialState,
      ...WSOrderList,
    });
  });
});
