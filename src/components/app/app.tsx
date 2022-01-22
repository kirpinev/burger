import { FC, useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";

import { MainPage } from "pages/main-page/main-page";
import { RegisterPage } from "pages/register-page/register-page";
import { LoginPage } from "pages/login-page/login-page";
import { ForgotPasswordPage } from "pages/forgot-password-page/forgot-password-page";
import { ResetPasswordPage } from "pages/reset-password-page/reset-password-page";
import { ProfilePage } from "pages/profile-page/profile-page";
import { LogoutPage } from "pages/logout-page/logout-page";

import { ProtectedRoute } from "components/protected-route/protected-route";
import { IngredientModal } from "components/ingredient-modal/ingredient-modal";
import { IngredientDetailsFullPage } from "components/ingredient-details-full-page/ingredient-details-full-page";
import { AppHeader } from "components/app-header/app-header";

import { useIngredients } from "hooks/use-ingredients";
import { AppRoutes } from "enums/app-routes";

interface ILocationState {
  background: {
    pathname: string;
    state: {};
    search: string;
    hash: string;
    key: string;
  };
}

export const App: FC = (): JSX.Element => {
  const location = useLocation<ILocationState>();
  const { getIngredients } = useIngredients();

  const background = location.state && location.state.background;

  useEffect(() => {
    getIngredients();
  }, [getIngredients]);

  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
        <Route exact={true} path={AppRoutes.MainPage}>
          <MainPage />
        </Route>
        <Route path={AppRoutes.RegisterPage}>
          <RegisterPage />
        </Route>
        <Route path={AppRoutes.LoginPage}>
          <LoginPage />
        </Route>
        <Route path={AppRoutes.ForgotPasswordPage}>
          <ForgotPasswordPage />
        </Route>
        <Route path={AppRoutes.ResetPasswordPage}>
          <ResetPasswordPage />
        </Route>
        <Route path={AppRoutes.LogoutPage}>
          <LogoutPage />
        </Route>
        <Route path={AppRoutes.ProfileOrders} />
        <Route path={AppRoutes.IngredientsPage}>
          <IngredientDetailsFullPage />
        </Route>
        <ProtectedRoute path={AppRoutes.ProfilePage}>
          <ProfilePage />
        </ProtectedRoute>
      </Switch>
      {background && (
        <Route path={AppRoutes.IngredientsPage}>
          <IngredientModal />
        </Route>
      )}
    </>
  );
};
