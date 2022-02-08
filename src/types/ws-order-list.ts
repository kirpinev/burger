import { IOrderItem } from "types/order-item";

export interface IWSOrderList {
  readonly success: boolean;
  readonly total: number;
  readonly totalToday: number;
  readonly orders: ReadonlyArray<IOrderItem>;
}
