import { Action } from "redux";

import { userReducer, initialState } from "services/reducers/user-reducer";
import * as types from "services/constants/user";

import { token, userEmail, userName, userPassword } from "mocks/user";

describe("Редьюсер пользователя", () => {
  it("должен корректно возвращать начальное состояние", () => {
    expect(userReducer(undefined, {} as Action)).toEqual(initialState);
  });

  it("должен корректно обновлять имя", () => {
    expect(
      userReducer(
        { ...initialState },
        {
          type: types.UPDATE_USER_NAME,
          payload: userName,
        }
      )
    ).toEqual({ ...initialState, name: userName });
  });

  it("должен корректно обновлять почту", () => {
    expect(
      userReducer(
        { ...initialState },
        {
          type: types.UPDATE_USER_EMAIL,
          payload: userEmail,
        }
      )
    ).toEqual({ ...initialState, email: userEmail });
  });

  it("должен корректно обновлять пароль", () => {
    expect(
      userReducer(
        { ...initialState },
        {
          type: types.UPDATE_USER_PASSWORD,
          payload: userPassword,
        }
      )
    ).toEqual({ ...initialState, password: userPassword });
  });

  it("должен корректно обновлять токен", () => {
    expect(
      userReducer(
        { ...initialState },
        {
          type: types.UPDATE_USER_TOKEN,
          payload: token,
        }
      )
    ).toEqual({ ...initialState, token });
  });

  it("должен корректно обновлять статус редактирования профиля", () => {
    expect(
      userReducer(
        { ...initialState },
        {
          type: types.UPDATE_USER_EDIT_STATUS,
        }
      )
    ).toEqual({ ...initialState, isUserInfoEdit: true });
  });

  it("должен корректно сбрасывать статус редактирования профиля", () => {
    expect(
      userReducer(
        { ...initialState },
        {
          type: types.RESET_USER_EDIT_STATUS,
        }
      )
    ).toEqual({ ...initialState, isUserInfoEdit: false });
  });

  it("должен корректно обновлять статус входа пользователя в систему", () => {
    expect(
      userReducer(
        { ...initialState },
        {
          type: types.LOG_IN_USER,
        }
      )
    ).toEqual({ ...initialState, isLoggedIn: true });
  });

  it("должен корректно обновлять статус выхода пользователя в систему", () => {
    expect(
      userReducer(
        { ...initialState },
        {
          type: types.LOG_OUT_USER,
        }
      )
    ).toEqual({ ...initialState });
  });

  it("должен корректно обновлять статус отправки почты", () => {
    expect(
      userReducer(
        { ...initialState },
        {
          type: types.EMAIL_SENT,
        }
      )
    ).toEqual({ ...initialState, isEmailSent: true });
  });

  it("должен корректно обновлять статус отправки пароля", () => {
    expect(
      userReducer(
        { ...initialState },
        {
          type: types.PASSWORD_SENT,
        }
      )
    ).toEqual({ ...initialState, isPasswordSent: true });
  });
});
