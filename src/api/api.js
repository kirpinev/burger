import { apiUrls } from "constants/api-urls";

const JSONHeaders = {
  "Content-Type": "application/json",
};

export const getIngredientsRequest = () =>
  fetch(`${apiUrls.base}${apiUrls.ingredients}`);

export const postAnOrderRequest = async (ingredientsIds) =>
  fetch(`${apiUrls.base}${apiUrls.orders}`, {
    method: "POST",
    headers: JSONHeaders,
    body: JSON.stringify({
      ingredients: ingredientsIds,
    }),
  });

export const resetPassword = async (email) =>
  fetch(`${apiUrls.base}${apiUrls.passwordReset}`, {
    method: "POST",
    headers: JSONHeaders,
    body: JSON.stringify({
      email: email,
    }),
  });

export const isResponseOk = (response) => response.ok;

export const getJSON = async (response) => response.json();
