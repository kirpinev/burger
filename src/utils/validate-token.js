import jwtDecode from "jwt-decode";
import { getTokenFromStorage } from "utils/local-storage";
import { Token } from "constants/token-names";

export const isAccessTokenValid = () => {
  const token = getTokenFromStorage(Token.Access);

  return token && jwtDecode(token.split("Bearer ")[1]).exp > Date.now() / 1000;
};
