import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";

import { selectUserInfo } from "services/selectors/select-user-info";
import { getUserInfoThunk } from "services/actions/user";
import { appRoutes } from "constants/app-routes";
import { resetLoadingState } from "services/actions/loading";

export const ProtectedRoute = ({ children, ...rest }) => {
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
              pathname: appRoutes.loginPage,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired,
};
