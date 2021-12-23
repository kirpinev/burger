import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { StatusContainer } from "components/status-container/status-container";
import { BurgerIngredients } from "components/burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "components/burger-constructor/burger-constructor";

import { getIngredientsThunk } from "services/actions/ingredients";
import { selectLoadingStatus } from "services/selectors/select-loading-status";
import { resetLoadingState } from "services/actions/loading";

import styles from "./main-page.module.css";

export const MainPage = () => {
  const { isLoading, isError } = useSelector(selectLoadingStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredientsThunk());

    return () => {
      dispatch(resetLoadingState());
    };
  }, [dispatch]);

  if (isLoading) {
    return <StatusContainer title="Загрузка..." />;
  }

  if (isError) {
    return (
      <StatusContainer
        buttonText="Повторить"
        onButtonClick={getIngredientsThunk}
        title="При запросе данных что-то пошло не так, повторить?"
      />
    );
  }

  return (
    <div className="body">
      <main className={styles.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
    </div>
  );
};
