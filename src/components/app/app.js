import React from "react";

import { AppHeader } from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";

import styles from "./app.module.css";

export const App = () => {
  return (
    <div className={`${styles.app} body`}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients />
      </main>
    </div>
  );
};
