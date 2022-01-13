import jwtDecode from "jwt-decode";
import { getTokenFromStorage } from "utils/local-storage";
import { Token } from "enums/token-names";

export const isAccessTokenValid = () => {
  const token = getTokenFromStorage(Token.Access);
  const decodedToken: "" | { exp: number } | null =
    token && jwtDecode(token.split("Bearer ")[1]);

  return decodedToken && decodedToken.exp > Date.now() / 1000;
};
