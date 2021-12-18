import { BrowserRouter, Route } from "react-router-dom";

import { MainPage } from "./pages/main-page/main-page";

import { appRoutes } from "./constants/app-routes";

export const App = () => {
  return (
    <BrowserRouter>
      <Route path={appRoutes.mainPage} exact={true} component={MainPage} />
    </BrowserRouter>
  );
};
