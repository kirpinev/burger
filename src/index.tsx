import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "@ya.praktikum/react-developer-burger-ui-components";

import { App } from "components/app/app";
import { ErrorBoundary } from "components/error-boundary/error-boundary";

import { store } from "services/store/store";

import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <ErrorBoundary>
    <Provider store={store}>
      <BrowserRouter basename="/burger">
        <App />
      </BrowserRouter>
    </Provider>
  </ErrorBoundary>,
  document.getElementById("root")
);

reportWebVitals();
