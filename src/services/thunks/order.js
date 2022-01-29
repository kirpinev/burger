import { postAnOrderRequest, isResponseOk, getJSON } from "api/api";

import {
  toggleErrorModal,
  toggleSuccessOrderModal,
} from "services/actions/modals";
import { resetConstructorIngredients } from "services/actions/ingredients";
import { logOutUser } from "services/actions/user";
import {
  resetOrder,
  saveOrder,
  toggleOrderPosting,
} from "services/actions/order";

import { isAccessTokenValid } from "utils/validate-token";
import { resetStorage } from "utils/local-storage";
import { refreshTokens } from "utils/refresh-tokens";

export const postAnOrderThunk = () => async (dispatch, getState) => {
  try {
    const ingredientsIds = getState().ingredients.constructorIngredients.map(
      (ingredient) => ingredient._id
    );
    const bunId = getState().ingredients.selectedBun._id;

    dispatch(toggleOrderPosting(true));

    if (isAccessTokenValid()) {
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
      dispatch(toggleOrderPosting(false));
      dispatch(toggleSuccessOrderModal());
      dispatch(resetConstructorIngredients());
    } else {
      const isRefreshed = await refreshTokens();

      if (isRefreshed) {
        return dispatch(postAnOrderThunk());
      } else {
        resetStorage();
        dispatch(logOutUser());
      }
    }
  } catch (e) {
    dispatch(resetOrder());
    dispatch(toggleErrorModal());
  }
};