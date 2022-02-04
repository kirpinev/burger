import { FC, useEffect } from "react";
import { useSelector } from "hooks/use-selector";
import { Redirect } from "react-router-dom";

import { selectUserInfo } from "services/selectors/select-user-info";
import { AppRoutes } from "enums/app-routes";
import { useUser } from "hooks/use-user";

export const LogoutPage: FC = (): JSX.Element | null => {
  const { password, email, name } = useSelector(selectUserInfo);
  const { logoutUser } = useUser();

  useEffect(() => {
    logoutUser();
  }, [logoutUser]);

  return password || email || name ? null : (
    <Redirect to={AppRoutes.LoginPage} />
  );
};
