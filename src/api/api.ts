import { ApiUrls } from "enums/api-urls";
import { getAccessToken, getRefreshToken } from "utils/token";
import { IUserInfo } from "types/user-info";

const JSONHeaders = {
  "Content-Type": "application/json",
};

export const getIngredientsRequest = async (): Promise<Response> =>
  fetch(`${ApiUrls.Base}${ApiUrls.Ingredients}`);

export const postAnOrderRequest = async (
  ingredientsIds: string[]
): Promise<Response> =>
  fetch(`${ApiUrls.Base}${ApiUrls.Orders}`, {
    method: "POST",
    headers: {
      ...JSONHeaders,
      Authorization: getAccessToken(),
    },
    body: JSON.stringify({
      ingredients: ingredientsIds,
    }),
  });

export const resetPasswordRequest = async (email: string): Promise<Response> =>
  fetch(`${ApiUrls.Base}${ApiUrls.PasswordReset}`, {
    method: "POST",
    headers: JSONHeaders,
    body: JSON.stringify({
      email: email,
    }),
  });

export const sendNewPasswordRequest = async (
  password: string,
  token: string
): Promise<Response> =>
  fetch(`${ApiUrls.Base}${ApiUrls.PasswordReset}${ApiUrls.NewPassword}`, {
    method: "POST",
    headers: JSONHeaders,
    body: JSON.stringify({
      password,
      token,
    }),
  });

export const registerUserRequest = async ({
  name,
  email,
  password,
}: IUserInfo): Promise<Response> =>
  fetch(`${ApiUrls.Base}${ApiUrls.Register}`, {
    method: "POST",
    headers: JSONHeaders,
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

export const authorizeUserRequest = async (
  email: string,
  password: string
): Promise<Response> =>
  fetch(`${ApiUrls.Base}${ApiUrls.Login}`, {
    method: "POST",
    headers: JSONHeaders,
    body: JSON.stringify({
      email,
      password,
    }),
  });

export const updateTokensRequest = async (token: string): Promise<Response> =>
  fetch(`${ApiUrls.Base}${ApiUrls.Token}`, {
    method: "POST",
    headers: JSONHeaders,
    body: JSON.stringify({
      token,
    }),
  });

export const getUserInfoRequest = async (): Promise<Response> =>
  fetch(`${ApiUrls.Base}${ApiUrls.UserInfo}`, {
    method: "GET",
    headers: {
      ...JSONHeaders,
      Authorization: getAccessToken(),
    },
  });

export const updateUserInfoRequest = async ({
  name,
  email,
  password,
}: IUserInfo): Promise<Response> =>
  fetch(`${ApiUrls.Base}${ApiUrls.UserInfo}`, {
    method: "PATCH",
    headers: {
      ...JSONHeaders,
      Authorization: getAccessToken(),
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

export const logoutUserRequest = async () =>
  fetch(`${ApiUrls.Base}${ApiUrls.Logout}`, {
    method: "POST",
    headers: {
      ...JSONHeaders,
    },
    body: JSON.stringify({
      token: getRefreshToken(),
    }),
  });

export const isResponseOk = (response: Response): boolean => response.ok;

export const getJSON = async <T>(response: Response): Promise<T> =>
  response.json();
