import { postAnOrderRequest, isResponseOk, getJSON } from "api/api";

import {
  toggleErrorModal,
  toggleSuccessOrderModal,
} from "services/actions/modals";
import { resetConstructorIngredients } from "services/actions/ingredients";
import { logOutUser } from "services/actions/user";
import {
  ICreatedOrder,
  resetOrder,
  saveOrder,
  toggleOrderPosting,
} from "services/actions/order";
import { TStoreState, TApplicationThunk } from "services/types/store";

import { resetStorage, refreshTokens, isAccessTokenValid } from "utils/token";

export const postAnOrderThunk: TApplicationThunk =
  () => async (dispatch, getState) => {
    try {
      const state = getState() as unknown as TStoreState;
      const ingredientsIds = state.ingredients.constructorIngredients.map(
        (ingredient) => ingredient._id
      );
      const bunId = state.ingredients.selectedBun!._id;

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

        const orderDetails = (await getJSON(response)) as ICreatedOrder;

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
