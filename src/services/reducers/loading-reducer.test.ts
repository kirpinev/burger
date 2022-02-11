import { Action } from "redux";

import {
  loadingReducer,
  initialState,
} from "services/reducers/loading-reducer";
import * as types from "services/constants/loading";

describe("Редьюсер статуса загрузки", () => {
  it("должен корректно возвращать начальное состояние", () => {
    expect(loadingReducer(undefined, {} as Action)).toEqual(initialState);
  });

  it("должен корректно возвращать статус загрузки", () => {
    expect(
      loadingReducer(
        { ...initialState },
        {
          type: types.LOADING,
        }
      )
    ).toEqual({
      ...initialState,
      isLoading: true,
      isError: false,
      isSuccess: false,
    });
  });

  it("должен корректно возвращать статус успешной загрузки", () => {
    expect(
      loadingReducer(
        { ...initialState },
        {
          type: types.SUCCESS,
        }
      )
    ).toEqual({
      ...initialState,
      isSuccess: true,
      isError: false,
      isLoading: false,
    });
  });

  it("должен корректно возвращать статус ошибки загрузки", () => {
    expect(loadingReducer({ ...initialState }, { type: types.ERROR })).toEqual({
      ...initialState,
      isLoading: false,
      isSuccess: false,
      isError: true,
    });
  });

  it("должен корректно обнулять состояние загрузки", () => {
    expect(
      loadingReducer({ ...initialState }, { type: types.RESET_LOADING_STATE })
    ).toEqual({ ...initialState });
  });
});
