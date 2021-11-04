import React from "react";

import { AppHeader } from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";

import styles from "./app.module.css";

export const App = () => (
  <div className={`${styles.container} body`}>
    <AppHeader />
    <main className={styles.main}>
      <BurgerIngredients />
      <BurgerConstructor />
    </main>
  </div>
);
