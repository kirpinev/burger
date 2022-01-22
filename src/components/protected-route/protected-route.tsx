import { FC, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

import { selectUserInfo } from "services/selectors/select-user-info";
import { getUserInfoThunk } from "services/actions/user";
import { useLoading } from "hooks/use-loading";

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
  const dispatch = useDispatch();

  const init = useCallback(async () => {
    await dispatch(getUserInfoThunk());
    setIsLoaded(true);
  }, [dispatch]);

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
