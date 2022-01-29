import { FC, useCallback, useEffect, useState } from "react";
import { useSelector } from "hooks/use-selector";
import { Redirect, Route } from "react-router-dom";

import { selectUserInfo } from "services/selectors/select-user-info";
import { useLoading } from "hooks/use-loading";
import { useUser } from "hooks/use-user";

import { AppRoutes } from "enums/app-routes";

interface IProtectedRoute {
  path: string;
}

export const ProtectedRoute: FC<IProtectedRoute> = ({
  children,
  path,
}): JSX.Element | null => {
  const { name, email, password } = useSelector(selectUserInfo);
  const [isLoaded, setIsLoaded] = useState(false);
  const { resetLoading } = useLoading();
  const { getUserInfo } = useUser();

  const init = useCallback(async () => {
    await getUserInfo();
    setIsLoaded(true);
  }, [getUserInfo]);

  useEffect(() => {
    init();

    return () => {
      resetLoading();
    };
  }, [resetLoading, init]);

  if (!isLoaded) {
    return null;
  }

  return (
    <Route
      path={path}
      render={({ location }) =>
        name || email || password ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: AppRoutes.LoginPage,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
