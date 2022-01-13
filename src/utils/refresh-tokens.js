import { getJSON, isResponseOk, updateTokensRequest } from "api/api";
import { Token } from "constants/token-names";
import { getTokenFromStorage, saveTokenToStorage } from "utils/local-storage";

export const refreshTokens = async () => {
  try {
    const token = getTokenFromStorage(Token.Refresh);

    const response = await updateTokensRequest(token);

    if (!isResponseOk(response)) {
      throw new Error();
    }

    const data = await getJSON(response);

    if (data.success) {
      saveTokenToStorage(Token.Access, data[Token.Access]);
      saveTokenToStorage(Token.Refresh, data[Token.Refresh]);

      return true;
    } else {
      return false;
    }
  } catch (e) {}
};
