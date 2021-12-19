import jwtDecode from "jwt-decode";

export const isAccessTokenValid = (token) => {
  return jwtDecode(token.split("Bearer ")[1]).exp > Date.now() / 1000;
};
