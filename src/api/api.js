import { apiUrls } from "constants/api-urls";
import { accessToken, refreshToken } from "constants/token-names";
import { getTokenFromStorage } from "utils/local-storage";

const JSONHeaders = {
  "Content-Type": "application/json",
};

export const getIngredientsRequest = () =>
  fetch(`${apiUrls.base}${apiUrls.ingredients}`);

export const postAnOrderRequest = async (ingredientsIds) =>
  fetch(`${apiUrls.base}${apiUrls.orders}`, {
    method: "POST",
    headers: {
      ...JSONHeaders,
      Authorization: getTokenFromStorage(accessToken),
    },
    body: JSON.stringify({
      ingredients: ingredientsIds,
    }),
  });

export const resetPasswordRequest = async (email) =>
  fetch(`${apiUrls.base}${apiUrls.passwordReset}`, {
    method: "POST",
    headers: JSONHeaders,
    body: JSON.stringify({
      email: email,
    }),
  });

export const sendNewPasswordRequest = async (password, token) =>
  fetch(`${apiUrls.base}${apiUrls.passwordReset}${apiUrls.newPassword}`, {
    method: "POST",
    headers: JSONHeaders,
    body: JSON.stringify({
      password,
      token,
    }),
  });

export const registerUserRequest = async ({ name, email, password }) =>
  fetch(`${apiUrls.base}${apiUrls.register}`, {
    method: "POST",
    headers: JSONHeaders,
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

export const authorizeUserRequest = async (email, password) =>
  fetch(`${apiUrls.base}${apiUrls.login}`, {
    method: "POST",
    headers: JSONHeaders,
    body: JSON.stringify({
      email,
      password,
    }),
  });

export const updateTokensRequest = async (token) =>
  fetch(`${apiUrls.base}${apiUrls.token}`, {
    method: "POST",
    headers: JSONHeaders,
    body: JSON.stringify({
      token,
    }),
  });

export const getUserInfoRequest = async () =>
  fetch(`${apiUrls.base}${apiUrls.userInfo}`, {
    method: "GET",
    headers: {
      ...JSONHeaders,
      Authorization: getTokenFromStorage(accessToken),
    },
  });

export const updateUserInfoRequest = async ({ name, email, password }) =>
  fetch(`${apiUrls.base}${apiUrls.userInfo}`, {
    method: "PATCH",
    headers: {
      ...JSONHeaders,
      Authorization: getTokenFromStorage(accessToken),
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

export const logoutUserRequest = async (token) =>
  fetch(`${apiUrls.base}${apiUrls.logout}`, {
    method: "POST",
    headers: {
      ...JSONHeaders,
    },
    body: JSON.stringify({
      token: getTokenFromStorage(refreshToken),
    }),
  });

export const isResponseOk = (response) => response.ok;

export const getJSON = async (response) => response.json();
