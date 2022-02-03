import React, { FC } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { BurgerIngredients } from "components/burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "components/burger-constructor/burger-constructor";
import { HelmetOptions } from "components/helmet-options/helmet-options";
import { WSLoadingHandlerIngredients } from "components/ws-loading-handler-ingredients/ws-loading-handler-ingredients";

import styles from "./main-page.module.css";

export const MainPage: FC = (): JSX.Element => (
  <WSLoadingHandlerIngredients>
    <HelmetOptions title="Конструктор" />
    <div className="body">
      <main className={styles.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
    </div>
  </WSLoadingHandlerIngredients>
);
