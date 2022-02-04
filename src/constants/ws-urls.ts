export interface IWSUrls {
  orders: string;
  userOrders: string;
}

export const WSUrls: IWSUrls = {
  orders: "wss://norma.nomoreparties.space/orders/all",
  userOrders: "wss://norma.nomoreparties.space/orders",
};
