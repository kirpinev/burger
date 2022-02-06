import jwtDecode from "jwt-decode";

import { getJSON, isResponseOk, updateTokensRequest } from "api/api";

import { Token } from "enums/token-names";
import { ITokenTypes } from "types/token-types";

export type TTokenNames = Token.Access | Token.Refresh;

export const getTokenFromStorage = (name: TTokenNames): string =>
  localStorage.getItem(name) || "";

export const saveTokenToStorage = (name: TTokenNames, value: string): void =>
  localStorage.setItem(name, value);

export const resetStorage = (): void => localStorage.clear();

export const getAccessToken = (): string => getTokenFromStorage(Token.Access);

export const getRefreshToken = (): string => getTokenFromStorage(Token.Refresh);

export const refreshTokens = async (): Promise<
  Promise<boolean> | undefined
> => {
  try {
    const token = getRefreshToken();

    const response = await updateTokensRequest(token);

    if (!isResponseOk(response)) {
      throw new Error();
    }

    const data = await getJSON<ITokenTypes>(response);

    if (data.success) {
      saveTokenToStorage(Token.Access, data[Token.Access]);
      saveTokenToStorage(Token.Refresh, data[Token.Refresh]);

      return true;
    } else {
      return false;
    }
  } catch (e) {}
};

export const isAccessTokenValid = () => {
  const token = getAccessToken();
  const decodedToken: "" | { exp: number } | null =
    token && jwtDecode(token.split("Bearer ")[1]);

  return decodedToken && decodedToken.exp > Date.now() / 1000;
};
