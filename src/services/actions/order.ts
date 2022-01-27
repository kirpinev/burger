import {
  SAVE_ORDER,
  RESET_ORDER,
  TOGGLE_ORDER_POSTING,
} from "services/constants/order";

interface IOrderDetails {
  readonly name: string;
  readonly order: {
    readonly number: number;
  };
}

export interface ISaveOrder {
  readonly type: typeof SAVE_ORDER;
  readonly payload: {
    name: string;
    number: number;
  };
}

export interface IResetOrder {
  readonly type: typeof RESET_ORDER;
}

export interface IToggleOrderPosting {
  readonly type: typeof TOGGLE_ORDER_POSTING;
  readonly payload: boolean;
}

export type TOrderActions = ISaveOrder | IResetOrder | IToggleOrderPosting;

export const saveOrder = (orderDetails: IOrderDetails): ISaveOrder => ({
  type: SAVE_ORDER,
  payload: {
    name: orderDetails.name,
    number: orderDetails.order.number,
  },
});

export const resetOrder = (): IResetOrder => ({
  type: RESET_ORDER,
});

export const toggleOrderPosting = (boolean: boolean): IToggleOrderPosting => ({
  type: TOGGLE_ORDER_POSTING,
  payload: boolean,
});
