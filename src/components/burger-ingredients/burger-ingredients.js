import React, { useState } from "react";
import _ from "lodash";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import { IngredientCard } from "../ingredient-card/ingredient-card";

import { ingredients } from "../../utils/data";
import styles from "./burger-ingredients.module.css";

const groupedIngredients = Object.entries(_.groupBy(ingredients, "type"));
const ingredientTypes = {
  bun: "Булки",
  main: "Начинка",
  sauce: "Соусы",
};

export const BurgerIngredients = () => {
  const [current, setCurrent] = useState(ingredientTypes.bun);

  return (
    <section className={`${styles.section} pt-10`}>
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
      <div className={`${styles.tabs} mb-10`}>
        <Tab
          value={ingredientTypes.bun}
          active={current === ingredientTypes.bun}
          onClick={setCurrent}
        >
          {ingredientTypes.bun}
        </Tab>
        <Tab
          value={ingredientTypes.sauce}
          active={current === ingredientTypes.sauce}
          onClick={setCurrent}
        >
          {ingredientTypes.sauce}
        </Tab>
        <Tab
          value={ingredientTypes.main}
          active={current === ingredientTypes.main}
          onClick={setCurrent}
        >
          {ingredientTypes.main}
        </Tab>
      </div>
      <div className={`${styles.list} custom-scroll`}>
        <>
          {groupedIngredients.map(([type, ingredients]) => (
            <React.Fragment key={type}>
              <h2 className="text text_type_main-medium mb-6">
                {ingredientTypes[type]}
              </h2>
              <div className={`${styles.ingredients} mb-10`}>
                {ingredients.map((ingredient) => (
                  <IngredientCard
                    key={ingredient._id}
                    name={ingredient.name}
                    imageLink={ingredient.image}
                    price={ingredient.price}
                  />
                ))}
              </div>
            </React.Fragment>
          ))}
        </>
      </div>
    </section>
  );
};
