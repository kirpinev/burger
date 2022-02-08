import {
  UPDATE_USER_NAME,
  UPDATE_USER_PASSWORD,
  UPDATE_USER_EMAIL,
  UPDATE_USER_TOKEN,
  UPDATE_USER_EDIT_STATUS,
  RESET_USER_EDIT_STATUS,
  RESET_USER_PASSWORD,
  LOG_IN_USER,
  LOG_OUT_USER,
  EMAIL_SENT,
  PASSWORD_SENT,
} from "services/constants/user";

export interface IUpdateUserName {
  readonly type: typeof UPDATE_USER_NAME;
  readonly payload: string;
}

export interface IUpdateUserPassword {
  readonly type: typeof UPDATE_USER_PASSWORD;
  readonly payload: string;
}

export interface IUpdateUserEmail {
  readonly type: typeof UPDATE_USER_EMAIL;
  readonly payload: string;
}

export interface IUpdateUserToken {
  readonly type: typeof UPDATE_USER_TOKEN;
  readonly payload: string;
}

export interface IUpdateUserEditStatus {
  readonly type: typeof UPDATE_USER_EDIT_STATUS;
}

export interface IResetUserEditStatus {
  readonly type: typeof RESET_USER_EDIT_STATUS;
}

export interface IResetUserPassword {
  readonly type: typeof RESET_USER_PASSWORD;
}

export interface ILogInUser {
  readonly type: typeof LOG_IN_USER;
}

export interface ILogOutUser {
  readonly type: typeof LOG_OUT_USER;
}

export interface IEmailSent {
  readonly type: typeof EMAIL_SENT;
}

export interface IPasswordSent {
  readonly type: typeof PASSWORD_SENT;
}

export type TUserActions =
  | IUpdateUserName
  | IUpdateUserPassword
  | IUpdateUserEmail
  | IUpdateUserToken
  | IUpdateUserEditStatus
  | IResetUserEditStatus
  | IResetUserPassword
  | ILogInUser
  | ILogOutUser
  | IEmailSent
  | IPasswordSent;

export const updateUserName = (name: string): IUpdateUserName => ({
  type: UPDATE_USER_NAME,
  payload: name,
});

export const updateUserPassword = (password: string): IUpdateUserPassword => ({
  type: UPDATE_USER_PASSWORD,
  payload: password,
});

export const updateUserEmail = (email: string): IUpdateUserEmail => ({
  type: UPDATE_USER_EMAIL,
  payload: email,
});

export const updateUserToken = (token: string): IUpdateUserToken => ({
  type: UPDATE_USER_TOKEN,
  payload: token,
});

export const updateUserEditStatus = (): IUpdateUserEditStatus => ({
  type: UPDATE_USER_EDIT_STATUS,
});

export const resetUserEditStatus = (): IResetUserEditStatus => ({
  type: RESET_USER_EDIT_STATUS,
});

export const resetUserPassword = (): IResetUserPassword => ({
  type: RESET_USER_PASSWORD,
});

export const logInUser = (): ILogInUser => ({
  type: LOG_IN_USER,
});

export const logOutUser = (): ILogOutUser => ({
  type: LOG_OUT_USER,
});

export const sendEmail = (): IEmailSent => ({
  type: EMAIL_SENT,
});

export const sendPassword = (): IPasswordSent => ({
  type: PASSWORD_SENT,
});
