import React, { useCallback, useEffect, useReducer, useState } from "react";

import { AppHeader } from "../app-header/app-header";
import { StatusContainer } from "../status-container/status-container";

import { ingredientsUrl } from "../../constants/ingredients-url";
import { isResponseOk, getJSON } from "../../api/api";

import styles from "./app.module.css";
import { Constructor } from "../constructor/constructor";

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
      throw new Error(`Что-то не так с типом экшена: ${action.type}`);
  }
};

export const App = () => {
  const [ingredients, setIngredients] = useState([]);
  const [loadingStatus, dispatchLoadingStatus] = useReducer(
    loadingReducer,
    loadingInitialState,
    undefined
  );

  const getIngredients = useCallback(async () => {
    try {
      dispatchLoadingStatus({ type: loadingActionTypes.loading });

      const response = await fetch(ingredientsUrl);

      if (!isResponseOk(response)) {
        throw new Error();
      }

      const ingredientsList = await getJSON(response);

      setIngredients(ingredientsList.data);
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
      <main className={styles.main}>
        <Constructor ingredients={ingredients} />
      </main>
    </div>
  );
};
