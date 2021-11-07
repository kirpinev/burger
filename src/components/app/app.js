import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

import { AppHeader } from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";

import { ingredientsUrl } from "../../constants/ingredients-url";
import styles from "./app.module.css";

export const App = () => {
  const [ingredientsState, setIngredientsState] = useState({
    data: [],
    isLoading: true,
    isError: false,
    isSuccess: false,
  });

  const getIngredients = useCallback(async () => {
    try {
      setIngredientsState({
        ...ingredientsState,
        isLoading: true,
        isError: false,
        isSuccess: false,
      });

      const response = await fetch(ingredientsUrl, {
        headers: {
          "Access-Control-Allow-Origin": "no-cors",
        },
      });
      const ingredients = await response.json();

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
  }, [ingredientsState]);

  useEffect(() => {
    getIngredients();
  }, []);

  if (ingredientsState.isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <p className="text text_type_main-large">Загрузка...</p>
      </div>
    );
  }

  if (ingredientsState.isError) {
    return (
      <div className={styles.loadingContainer}>
        <p className="text text_type_main-large mb-10">
          При запросе данных что-то пошло не так, повторить?
        </p>
        <Button type="primary" size="large" onClick={getIngredients}>
          Повторить
        </Button>
      </div>
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
