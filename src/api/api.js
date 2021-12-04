import { apiUrls } from "constants/api-urls";

export const getIngredientsRequest = () =>
  fetch(`${apiUrls.base}${apiUrls.ingredients}`);

export const postAnOrderRequest = async (ingredientsIds) =>
  fetch(`${apiUrls.base}${apiUrls.orders}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: ingredientsIds,
    }),
  });

export const isResponseOk = (response) => response.ok;

export const getJSON = async (response) => response.json();
