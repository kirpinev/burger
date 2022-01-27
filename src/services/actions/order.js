import {
  SAVE_ORDER,
  RESET_ORDER,
  TOGGLE_ORDER_POSTING,
} from "services/constants/order";

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

export const toggleOrderPosting = (boolean) => ({
  type: TOGGLE_ORDER_POSTING,
  payload: boolean,
});
