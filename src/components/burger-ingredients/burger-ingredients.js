import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import _ from "lodash";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import { IngredientCard } from "../ingredient-card/ingredient-card";

import { ingredients } from "../../mocks/data";
import { ingredientTypes } from "../../constants/ingredient-type";
import styles from "./burger-ingredients.module.css";

export const BurgerIngredients = () => {
  const [currentIngredientType, setCurrentIngredientType] = useState(
    ingredientTypes.bun
  );

  const bunRef = useRef();
  const mainRef = useRef();
  const sauceRef = useRef();

  const groupedIngredients = useMemo(
    () => Object.entries(_.groupBy(ingredients, "type")),
    []
  );
  const [bunType, mainType, sauceType] = useMemo(
    () => Object.keys(ingredientTypes),
    []
  );

  const setRefForIngredientType = useCallback(
    (name) => {
      if (name === bunType) {
        return bunRef;
      }
      if (name === mainType) {
        return mainRef;
      }
      if (name === sauceType) {
        return sauceRef;
      }
    },
    [bunType, mainType, sauceType]
  );

  const scrollIntoIngredient = useCallback(() => {
    if (currentIngredientType === ingredientTypes.bun) {
      bunRef.current.scrollIntoView();
    }
    if (currentIngredientType === ingredientTypes.main) {
      mainRef.current.scrollIntoView();
    }
    if (currentIngredientType === ingredientTypes.sauce) {
      sauceRef.current.scrollIntoView();
    }
  }, [currentIngredientType]);

  useEffect(() => {
    scrollIntoIngredient();
  }, [currentIngredientType, scrollIntoIngredient]);

  return (
    <section className={`${styles.section} pt-10`}>
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
      <div className={`${styles.tabs} mb-10`}>
        <Tab
          value={ingredientTypes.bun}
          active={currentIngredientType === ingredientTypes.bun}
          onClick={setCurrentIngredientType}
        >
          {ingredientTypes.bun}
        </Tab>
        <Tab
          value={ingredientTypes.main}
          active={currentIngredientType === ingredientTypes.main}
          onClick={setCurrentIngredientType}
        >
          {ingredientTypes.main}
        </Tab>
        <Tab
          value={ingredientTypes.sauce}
          active={currentIngredientType === ingredientTypes.sauce}
          onClick={setCurrentIngredientType}
        >
          {ingredientTypes.sauce}
        </Tab>
      </div>
      <div className={`${styles.container} custom-scroll`}>
        <ul className={styles.ingredientsList}>
          {groupedIngredients.map(([type, ingredients]) => (
            <li className="mb-10" key={type}>
              <h2
                ref={setRefForIngredientType(type)}
                className="text text_type_main-medium mb-6"
              >
                {ingredientTypes[type]}
              </h2>
              <ul className={`${styles.ingredientsListByType}`}>
                {ingredients.map((ingredient) => (
                  <li key={ingredient._id}>
                    <IngredientCard
                      name={ingredient.name}
                      imageLink={ingredient.image}
                      price={ingredient.price}
                    />
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
