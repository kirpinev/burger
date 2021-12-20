import { postAnOrderRequest, isResponseOk, getJSON } from "api/api";
import { toggleErrorModal, toggleSuccessOrderModal } from "./modals";
import { resetConstructorIngredients } from "./ingredients";

export const SAVE_ORDER = "SAVE_ORDER_NUMBER";
export const RESET_ORDER = "RESET_ORDER_NUMBER";

export const saveOrder = (orderDetails) => ({
  type: SAVE_ORDER,
  payload: {
    name: orderDetails.name,
    number: orderDetails.order.number,
  },
});

export const resetOrder = () => ({
  type: RESET_ORDER,
});

export const postAnOrderThunk = () => async (dispatch, getState) => {
  try {
    const ingredientsIds = getState().ingredients.constructorIngredients.map(
      (ingredient) => ingredient._id
    );
    const bunId = getState().ingredients.selectedBun._id;

    const response = await postAnOrderRequest([
      bunId,
      ...ingredientsIds,
      bunId,
    ]);

    if (!isResponseOk(response)) {
      throw new Error();
    }

    const orderDetails = await getJSON(response);

    dispatch(saveOrder(orderDetails));
    dispatch(toggleSuccessOrderModal());
    dispatch(resetConstructorIngredients());
  } catch (e) {
    dispatch(resetOrder());
    dispatch(toggleErrorModal());
  }
};
