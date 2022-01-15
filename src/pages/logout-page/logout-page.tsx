import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import { logoutUserThunk } from "services/actions/user";
import { selectUserInfo } from "services/selectors/select-user-info";
import { AppRoutes } from "enums/app-routes";

export const LogoutPage: FC = (): JSX.Element | null => {
  const { password, email, name } = useSelector(selectUserInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logoutUserThunk());
  }, [dispatch]);

  return password || email || name ? null : (
    <Redirect to={AppRoutes.LoginPage} />
  );
};
