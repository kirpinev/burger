import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { AppHeader } from "components/app-header/app-header";
import { StatusContainer } from "components/status-container/status-container";
import { BurgerIngredients } from "components/burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "components/burger-constructor/burger-constructor";

import { getIngredients } from "services/actions/ingredients";
import { selectLoadingStatus } from "services/selectors/select-loading-status";
import { resetLoadingState } from "services/actions/loading";

import styles from "./main-page.module.css";

export const MainPage = () => {
  const { isLoading, isError } = useSelector(selectLoadingStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());

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
        onButtonClick={getIngredients}
        title="При запросе данных что-то пошло не так, повторить?"
      />
    );
  }

  return (
    <div className={`${styles.container} body`}>
      <AppHeader />
      <main className={styles.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
    </div>
  );
};
