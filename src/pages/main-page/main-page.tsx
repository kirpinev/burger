import React, { FC, useEffect } from "react";
import { useSelector } from "hooks/use-selector";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { StatusContainer } from "components/status-container/status-container";
import { BurgerIngredients } from "components/burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "components/burger-constructor/burger-constructor";
import { HelmetOptions } from "components/helmet-options/helmet-options";

import { selectLoadingStatus } from "services/selectors/select-loading-status";
import { getIngredientsThunk } from "services/thunks/ingredients";
import { useLoading } from "hooks/use-loading";

import styles from "./main-page.module.css";

export const MainPage: FC = (): JSX.Element => {
  const { isLoading, isError } = useSelector(selectLoadingStatus);
  const { resetLoading } = useLoading();

  useEffect(() => {
    return () => {
      resetLoading();
    };
  }, [resetLoading]);

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
    <>
      <HelmetOptions title="Конструктор" />
      <div className="body">
        <main className={styles.main}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </main>
      </div>
    </>
  );
};
