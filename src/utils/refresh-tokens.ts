import { getJSON, isResponseOk, updateTokensRequest } from "api/api";
import { Token } from "enums/token-names";
import { getTokenFromStorage, saveTokenToStorage } from "utils/local-storage";
import { ITokenTypes } from "types/token-types";

export const refreshTokens = async (): Promise<
  Promise<boolean> | undefined
> => {
  try {
    const token = getTokenFromStorage(Token.Refresh);

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
