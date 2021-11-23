import React, { useCallback, useEffect, useReducer, useState } from "react";

import { AppHeader } from "../app-header/app-header";
import { StatusContainer } from "../status-container/status-container";
import { Constructor } from "../constructor/constructor";

import { BurgerIngredientsContext } from "../../context/burger-ingredients-context";
import { OrderContext } from "../../context/order-context";
import { isResponseOk, getJSON, getAllIngredients } from "../../api/api";

import styles from "./app.module.css";

const loadingActionTypes = {
  loading: "loading",
  success: "success",
  error: "error",
};

const loadingInitialState = {
  isLoading: true,
  isError: false,
  isSuccess: false,
};

const loadingReducer = (state, action) => {
  switch (action.type) {
    case loadingActionTypes.loading:
      return {
        isLoading: true,
        isError: false,
        isSuccess: false,
      };
    case loadingActionTypes.success:
      return {
        isSuccess: true,
        isError: false,
        isLoading: false,
      };
    case loadingActionTypes.error:
      return {
        isLoading: false,
        isSuccess: false,
        isError: true,
      };
    default:
      return state;
  }
};

const initialOrderState = {
  number: null,
};

const orderActionTypes = {
  save: "save",
  reset: "reset",
};

const orderReducer = (state, action) => {
  switch (action.type) {
    case orderActionTypes.save:
      return { number: action.payload };
    case orderActionTypes.reset:
      return initialOrderState;
    default:
      return state;
  }
};

export const App = () => {
  const [ingredients, setIngredients] = useState([]);
  const [order, dispatchOrder] = useReducer(
    orderReducer,
    initialOrderState,
    undefined
  );
  const [loadingStatus, dispatchLoadingStatus] = useReducer(
    loadingReducer,
    loadingInitialState,
    undefined
  );

  const getIngredients = useCallback(async () => {
    try {
      dispatchLoadingStatus({ type: loadingActionTypes.loading });

      const response = await getAllIngredients();

      if (!isResponseOk(response)) {
        throw new Error();
      }

      const { data: ingredientsList } = await getJSON(response);

      setIngredients(ingredientsList);
      dispatchLoadingStatus({
        type: loadingActionTypes.success,
      });
    } catch (e) {
      dispatchLoadingStatus({ type: loadingActionTypes.error });
    }
  }, []);

  useEffect(() => {
    getIngredients();
  }, [getIngredients]);

  if (loadingStatus.isLoading) {
    return <StatusContainer title="Загрузка..." />;
  }

  if (loadingStatus.isError) {
    return (
      <StatusContainer
        buttonText="Повторить"
        onButtonClick={getIngredients}
        title="При запросе данных что-то пошло не так, повторить?"
      />
    );
  }

  return (
    <div className={`${styles.container} body`}>
      <AppHeader />
      <BurgerIngredientsContext.Provider value={ingredients}>
        <OrderContext.Provider
          value={{ order, dispatchOrder, orderActionTypes }}
        >
          <main className={styles.main}>
            <Constructor />
          </main>
        </OrderContext.Provider>
      </BurgerIngredientsContext.Provider>
    </div>
  );
};
