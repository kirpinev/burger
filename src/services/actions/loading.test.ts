import * as actions from "services/actions/loading";
import * as types from "services/constants/loading";

describe("Экшен криэйторы статуса загрузки", () => {
  it("должны корректно возвращать экшен со статусом загрузки", () => {
    const expectedAction = {
      type: types.LOADING,
    };

    expect(actions.setLoading()).toEqual(expectedAction);
  });

  it("должны корректно возвращать экшен со статусом ошибки", () => {
    const expectedAction = {
      type: types.ERROR,
    };

    expect(actions.setError()).toEqual(expectedAction);
  });

  it("должны корректно возвращать экшен со статусом успеха загрузки", () => {
    const expectedAction = {
      type: types.SUCCESS,
    };

    expect(actions.setSuccess()).toEqual(expectedAction);
  });

  it("должны корректно возвращать экшен с рефрешем состояния загрузки", () => {
    const expectedAction = {
      type: types.RESET_LOADING_STATE,
    };

    expect(actions.resetLoadingState()).toEqual(expectedAction);
  });
});
