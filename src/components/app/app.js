import React, { useCallback, useEffect, useState } from "react";

import { AppHeader } from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { StatusContainer } from "../status-container/status-container";

import { ingredientsUrl } from "../../constants/ingredients-url";

import styles from "./app.module.css";

export const App = () => {
  const [ingredientsState, setIngredientsState] = useState({
    data: [],
    isLoading: true,
    isError: false,
    isSuccess: false,
  });

  const isResponseOk = useCallback((response) => response.ok, []);

  const getJSON = useCallback(async (response) => response.json(), []);

  const getIngredients = useCallback(async () => {
    try {
      setIngredientsState({
        ...ingredientsState,
        isLoading: true,
        isError: false,
        isSuccess: false,
      });

      const response = await fetch(ingredientsUrl);

      if (!isResponseOk(response)) {
        throw new Error();
      }

      const ingredients = await getJSON(response);

      setIngredientsState({
        data: ingredients.data,
        isSuccess: true,
        isError: false,
        isLoading: false,
      });
    } catch (e) {
      setIngredientsState({
        ...ingredientsState,
        isLoading: false,
        isSuccess: false,
        isError: true,
      });
    }
  }, [ingredientsState, isResponseOk, getJSON]);

  useEffect(() => {
    getIngredients();
  }, []);

  if (ingredientsState.isLoading) {
    return <StatusContainer title="Загрузка..." />;
  }

  if (ingredientsState.isError) {
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
        <BurgerIngredients ingredients={ingredientsState.data} />
        <BurgerConstructor ingredients={ingredientsState.data} />
      </main>
    </div>
  );
};
