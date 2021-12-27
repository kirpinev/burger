import { getJSON, isResponseOk, updateTokensRequest } from "api/api";
import { accessToken, refreshToken } from "constants/token-names";
import { getTokenFromStorage, saveTokenToStorage } from "utils/local-storage";

export const refreshTokens = async () => {
  try {
    const token = getTokenFromStorage(refreshToken);

    const response = await updateTokensRequest(token);

    if (!isResponseOk(response)) {
      throw new Error();
    }

    const data = await getJSON(response);

    if (data.success) {
      saveTokenToStorage(accessToken, data[accessToken]);
      saveTokenToStorage(refreshToken, data[refreshToken]);

      return true;
    } else {
      return false;
    }
  } catch (e) {}
};
