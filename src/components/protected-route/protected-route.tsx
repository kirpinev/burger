import { FC, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

import { selectUserInfo } from "services/selectors/select-user-info";
import { getUserInfoThunk } from "services/actions/user";
import { resetLoadingState } from "services/actions/loading";

import { AppRoutes } from "constants/app-routes";

export const ProtectedRoute: FC = ({
  children,
  ...rest
}): JSX.Element | null => {
  const { name, email, password } = useSelector(selectUserInfo);
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();

  const init = useCallback(async () => {
    await dispatch(getUserInfoThunk());
    setIsLoaded(true);
  }, [dispatch]);

  useEffect(() => {
    init();

    return () => {
      dispatch(resetLoadingState());
    };
  }, [dispatch, init]);

  if (!isLoaded) {
    return null;
  }

  return (
    <Route
      {...rest}
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
