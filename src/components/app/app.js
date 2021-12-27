import { useEffect } from "react";
import { useDispatch } from "react-redux";
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
import { getIngredientsThunk } from "services/actions/ingredients";
import { appRoutes } from "constants/app-routes";

export const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(getIngredientsThunk());
  }, [dispatch]);

  return (
    <>
      <AppHeader />

      <Switch location={background || location}>
        <Route exact={true} path={appRoutes.mainPage}>
          <MainPage />
        </Route>
        <Route path={appRoutes.registerPage}>
          <RegisterPage />
        </Route>
        <Route path={appRoutes.loginPage}>
          <LoginPage />
        </Route>
        <Route path={appRoutes.forgotPasswordPage}>
          <ForgotPasswordPage />
        </Route>
        <Route path={appRoutes.resetPasswordPage}>
          <ResetPasswordPage />
        </Route>
        <Route path={appRoutes.logoutPage}>
          <LogoutPage />
        </Route>
        <Route path={appRoutes.profileOrders} />
        <Route path={appRoutes.ingredientsPage}>
          <IngredientDetailsFullPage />
        </Route>
        <ProtectedRoute path={appRoutes.profilePage}>
          <ProfilePage />
        </ProtectedRoute>
      </Switch>

      {background && (
        <Route path={appRoutes.ingredientsPage}>
          <IngredientModal />
        </Route>
      )}
    </>
  );
};
