import { postAnOrder, isResponseOk, getJSON } from "api/api";
import { toggleErrorOrderModal, toggleSuccessOrderModal } from "./modals";
import { resetConstructorIngredients } from "./ingredients";

export const SAVE_ORDER_NUMBER = "SAVE_ORDER_NUMBER";
export const RESET_ORDER_NUMBER = "RESET_ORDER_NUMBER";

export const saveOrderNumber = (orderDetails) => ({
  type: SAVE_ORDER_NUMBER,
  payload: {
    name: orderDetails.name,
    number: orderDetails.order.number,
  },
});

export const resetOrderNumber = () => ({
  type: RESET_ORDER_NUMBER,
});

export const makeAnOrderRequest = () => async (dispatch, getState) => {
  try {
    const ingredientsIds = getState().ingredients.constructorIngredients.map(
      (ingredient) => ingredient._id
    );
    const bunId = getState().ingredients.selectedBun._id;

    const response = await postAnOrder([bunId, ...ingredientsIds, bunId]);

    if (!isResponseOk(response)) {
      throw new Error();
    }

    const orderDetails = await getJSON(response);

    dispatch(saveOrderNumber(orderDetails));
    dispatch(toggleSuccessOrderModal());
    dispatch(resetConstructorIngredients());
  } catch (e) {
    dispatch(resetOrderNumber());
    dispatch(toggleErrorOrderModal());
  }
};
