import { Token } from "enums/token-names";

export type TTokenNames = Token.Access | Token.Refresh;

export const getTokenFromStorage = (name: TTokenNames): string =>
  localStorage.getItem(name) || "";

export const saveTokenToStorage = (name: TTokenNames, value: string): void =>
  localStorage.setItem(name, value);

export const resetStorage = (): void => localStorage.clear();

export const getAccessToken = () => getTokenFromStorage(Token.Access);

export const getRefreshToken = () => getTokenFromStorage(Token.Refresh);
