import { ApiUrls } from "enums/api-urls";
import { Token } from "enums/token-names";
import { getTokenFromStorage } from "utils/local-storage";

const JSONHeaders = {
  "Content-Type": "application/json",
};

export const getIngredientsRequest = () =>
  fetch(`${ApiUrls.Base}${ApiUrls.Ingredients}`);

export const postAnOrderRequest = async (ingredientsIds) =>
  fetch(`${ApiUrls.Base}${ApiUrls.Orders}`, {
    method: "POST",
    headers: {
      ...JSONHeaders,
      Authorization: getTokenFromStorage(Token.Access),
    },
    body: JSON.stringify({
      ingredients: ingredientsIds,
    }),
  });

export const resetPasswordRequest = async (email) =>
  fetch(`${ApiUrls.Base}${ApiUrls.PasswordReset}`, {
    method: "POST",
    headers: JSONHeaders,
    body: JSON.stringify({
      email: email,
    }),
  });

export const sendNewPasswordRequest = async (password, token) =>
  fetch(`${ApiUrls.Base}${ApiUrls.PasswordReset}${ApiUrls.NewPassword}`, {
    method: "POST",
    headers: JSONHeaders,
    body: JSON.stringify({
      password,
      token,
    }),
  });

export const registerUserRequest = async ({ name, email, password }) =>
  fetch(`${ApiUrls.Base}${ApiUrls.Register}`, {
    method: "POST",
    headers: JSONHeaders,
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

export const authorizeUserRequest = async (email, password) =>
  fetch(`${ApiUrls.Base}${ApiUrls.Login}`, {
    method: "POST",
    headers: JSONHeaders,
    body: JSON.stringify({
      email,
      password,
    }),
  });

export const updateTokensRequest = async (token) =>
  fetch(`${ApiUrls.Base}${ApiUrls.Token}`, {
    method: "POST",
    headers: JSONHeaders,
    body: JSON.stringify({
      token,
    }),
  });

export const getUserInfoRequest = async () =>
  fetch(`${ApiUrls.Base}${ApiUrls.UserInfo}`, {
    method: "GET",
    headers: {
      ...JSONHeaders,
      Authorization: getTokenFromStorage(Token.Access),
    },
  });

export const updateUserInfoRequest = async ({ name, email, password }) =>
  fetch(`${ApiUrls.Base}${ApiUrls.UserInfo}`, {
    method: "PATCH",
    headers: {
      ...JSONHeaders,
      Authorization: getTokenFromStorage(Token.Access),
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
      token: getTokenFromStorage(Token.Refresh),
    }),
  });

export const isResponseOk = (response) => response.ok;

export const getJSON = async (response) => response.json();
