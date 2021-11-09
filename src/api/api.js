import { ingredientsUrl } from "../constants/ingredients-url";

const getIngredients = async () => {
  const response = await fetch(ingredientsUrl, {
    headers: {
      "Access-Control-Allow-Origin": "no-cors",
    },
  });

  if (!response.ok) {
    throw new Error();
  }

  return await response.json();
};

export const api = {
  getIngredients,
};
