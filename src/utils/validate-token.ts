import jwtDecode from "jwt-decode";
import { getAccessToken } from "utils/local-storage";

export const isAccessTokenValid = () => {
  const token = getAccessToken();
  const decodedToken: "" | { exp: number } | null =
    token && jwtDecode(token.split("Bearer ")[1]);

  return decodedToken && decodedToken.exp > Date.now() / 1000;
};
