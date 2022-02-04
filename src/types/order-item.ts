import { TOrderStatus } from "components/order-item/order-item";

export interface IOrderItem {
  readonly _id: string;
  readonly status: TOrderStatus;
  readonly name: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly number: number;
  readonly ingredients: ReadonlyArray<string>;
}
