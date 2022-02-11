import { ICreatedOrder } from "services/actions/order";

import { IWSOrderList } from "types/ws-order-list";

export const createdOrder: ICreatedOrder = {
  name: "Краторная булка N-200i",
  order: {
    number: 1234567890,
  },
};
export const createdOrderPayload = {
  name: createdOrder.name,
  number: createdOrder.order.number,
};

export const WSOrderList: IWSOrderList = {
  success: true,
  total: 9615,
  totalToday: 69,
  orders: [
    {
      createdAt: "2022-02-08T14:03:50.846Z",
      ingredients: ["60d3b41abdacab0026a733d0", "60d3b41abdacab0026a733c7"],
      name: "Минеральный флюоресцентный бургер",
      number: 9702,
      status: "done",
      updatedAt: "2022-02-08T14:03:51.089Z",
      _id: "620278466d7cd8001b2d4c0a",
    },
  ],
};
