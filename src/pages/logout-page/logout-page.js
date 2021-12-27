import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import { logoutUserThunk } from "services/actions/user";
import { selectUserInfo } from "services/selectors/select-user-info";
import { appRoutes } from "constants/app-routes";

export const LogoutPage = () => {
  const { password, email, name } = useSelector(selectUserInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logoutUserThunk());
  }, [dispatch]);

  return password || email || name ? null : (
    <Redirect to={appRoutes.loginPage} />
  );
};
