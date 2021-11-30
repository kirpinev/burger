import { postAnOrder, isResponseOk, getJSON } from "api/api";
import { toggleErrorOrderModal, toggleSuccessOrderModal } from "./modals";

export const SAVE_ORDER_NUMBER = "SAVE_ORDER_NUMBER";

export const saveOrderNumber = (orderDetails) => ({
  type: SAVE_ORDER_NUMBER,
  payload: {
    name: orderDetails.name,
    number: orderDetails.order.number,
  },
});

export const makeAnOrderRequest = () => async (dispatch, getState) => {
  try {
    const ingredients = getState().ingredients.burgerIngredients;
    const ingredientsIds = ingredients.map((ingredient) => ingredient._id);

    const response = await postAnOrder(ingredientsIds);

    if (!isResponseOk(response)) {
      throw new Error();
    }

    const orderDetails = await getJSON(response);

    dispatch(saveOrderNumber(orderDetails));
    dispatch(toggleSuccessOrderModal());
  } catch (e) {
    dispatch(toggleErrorOrderModal());
  }
};
