import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppHeader } from "components/app-header/app-header";
import { StatusContainer } from "components/status-container/status-container";
import { BurgerIngredients } from "components/burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "components/burger-constructor/burger-constructor";

import { getIngredients } from "services/actions/ingredients";

import styles from "./app.module.css";

export const App = () => {
  const { isLoading, isError } = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  if (isLoading) {
    return <StatusContainer title="Загрузка..." />;
  }

  if (isError) {
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
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </div>
  );
};
