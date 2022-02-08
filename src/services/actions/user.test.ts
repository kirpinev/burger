import * as actions from "services/actions/user";
import * as types from "services/constants/user";

describe("Экшен криэйторы пользователя", () => {
  const userName = "Cat";
  const userPassword = "qwerty";
  const userEmail = "catcat@cat.ru";
  const token = "sdsjgh11t2hkdbhhb644hkbjk6jkb6";

  it("должны корректно возвращать экшен с обновленным именем", () => {
    const expectedAction = {
      type: types.UPDATE_USER_NAME,
      payload: userName,
    };

    expect(actions.updateUserName(userName)).toEqual(expectedAction);
  });

  it("должны корректно возвращать экшен с обновленным паролем", () => {
    const expectedAction = {
      type: types.UPDATE_USER_PASSWORD,
      payload: userPassword,
    };

    expect(actions.updateUserPassword(userPassword)).toEqual(expectedAction);
  });

  it("должны корректно возвращать экшен с обновленной почтой", () => {
    const expectedAction = {
      type: types.UPDATE_USER_EMAIL,
      payload: userEmail,
    };

    expect(actions.updateUserEmail(userEmail)).toEqual(expectedAction);
  });

  it("должны корректно возвращать экшен с обновленным токеном", () => {
    const expectedAction = {
      type: types.UPDATE_USER_TOKEN,
      payload: token,
    };

    expect(actions.updateUserToken(token)).toEqual(expectedAction);
  });

  it("должны корректно возвращать экшен со статусом обновления информации о пользователе", () => {
    const expectedAction = {
      type: types.UPDATE_USER_EDIT_STATUS,
    };

    expect(actions.updateUserEditStatus()).toEqual(expectedAction);
  });

  it("должны корректно возвращать экшен со статусом ресета обновления информации о пользователе", () => {
    const expectedAction = {
      type: types.RESET_USER_EDIT_STATUS,
    };

    expect(actions.resetUserEditStatus()).toEqual(expectedAction);
  });

  it("должны корректно возвращать экшен со статусом ресета обновления пароля пользователя", () => {
    const expectedAction = {
      type: types.RESET_USER_PASSWORD,
    };

    expect(actions.resetUserPassword()).toEqual(expectedAction);
  });

  it("должны корректно возвращать экшен со статусом входа пользователя в систему", () => {
    const expectedAction = {
      type: types.LOG_IN_USER,
    };

    expect(actions.logInUser()).toEqual(expectedAction);
  });

  it("должны корректно возвращать экшен со статусом выхода пользователя из системы", () => {
    const expectedAction = {
      type: types.LOG_OUT_USER,
    };

    expect(actions.logOutUser()).toEqual(expectedAction);
  });

  it("должны корректно возвращать экшен со статусом отправки сообщения на почту", () => {
    const expectedAction = {
      type: types.EMAIL_SENT,
    };

    expect(actions.sendEmail()).toEqual(expectedAction);
  });

  it("должны корректно возвращать экшен со статусом отправки пароля", () => {
    const expectedAction = {
      type: types.PASSWORD_SENT,
    };

    expect(actions.sendPassword()).toEqual(expectedAction);
  });
});
