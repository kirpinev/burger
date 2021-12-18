import { BrowserRouter, Route } from "react-router-dom";

import { MainPage } from "./pages/main-page/main-page";
import { RegisterPage } from "./pages/register-page/register-page";
import { LoginPage } from "./pages/login-page/login-page";

import { appRoutes } from "./constants/app-routes";

export const App = () => {
  return (
    <BrowserRouter>
      <Route path={appRoutes.mainPage} exact={true} component={MainPage} />
      <Route
        path={appRoutes.registerPage}
        exact={true}
        component={RegisterPage}
      />
      <Route path={appRoutes.loginPage} exact={true} component={LoginPage} />
    </BrowserRouter>
  );
};
