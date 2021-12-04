import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import _ from "lodash";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import { Modal } from "components/modal/modal";
import { IngredientDetails } from "components/ingredient-details/ingredient-details";
import { IngredientList } from "components/ingredient-list/ingredient-list";

import { ingredientTypes } from "constants/ingredient-type";
import { ingredient } from "prop-types/ingredient";
import {
  saveSelectedIngredient,
  resetSelectedIngredient,
} from "services/actions/ingredients";
import { toggleIngredientModal } from "services/actions/modals";

import styles from "./burger-ingredients.module.css";

export const BurgerIngredients = () => {
  const [currentIngredientType, setCurrentIngredientType] = useState(
    ingredientTypes.ru.bun
  );
  const { isIngredientModalOpen } = useSelector((state) => state.modals);
  const { burgerIngredients, selectedIngredient } = useSelector(
    (state) => state.ingredients
  );
  const dispatch = useDispatch();

  const tabContainerRef = useRef();
  const scrollContainerRef = useRef();
  const bunRef = useRef();
  const mainRef = useRef();
  const sauceRef = useRef();

  const [bunIngredients, mainIngredients, sauceIngredients] = useMemo(
    () => Object.entries(_.groupBy(burgerIngredients, "type")),
    [burgerIngredients]
  );

  const selectIngredientAndOpenModal = useCallback(
    (ingredient) => {
      dispatch(saveSelectedIngredient(ingredient));
      dispatch(toggleIngredientModal());
    },
    [dispatch]
  );

  const closeIngredientModal = useCallback(() => {
    dispatch(toggleIngredientModal());
    dispatch(resetSelectedIngredient());
  }, [dispatch]);

  const setRefForIngredientType = useCallback((name) => {
    if (name === ingredientTypes.eng.bun) {
      return bunRef;
    } else if (name === ingredientTypes.eng.main) {
      return mainRef;
    } else if (name === ingredientTypes.eng.sauce) {
      return sauceRef;
    }
  }, []);

  const scrollIntoIngredient = useCallback((type) => {
    if (type === ingredientTypes.ru.bun) {
      bunRef.current.scrollIntoView();
    } else if (type === ingredientTypes.ru.main) {
      mainRef.current.scrollIntoView();
    } else if (type === ingredientTypes.ru.sauce) {
      sauceRef.current.scrollIntoView();
    }
  }, []);

  const isDistanceValid = useCallback(
    (container, ingredient, distance = 150) =>
      Math.abs(ingredient - container) <= distance,
    []
  );

  const selectTab = useCallback(() => {
    const tabCoords = tabContainerRef.current.getBoundingClientRect().bottom;
    const bunCoords = bunRef.current.getBoundingClientRect().top;
    const mainCoords = mainRef.current.getBoundingClientRect().top;
    const sauceCoords = sauceRef.current.getBoundingClientRect().top;

    if (isDistanceValid(tabCoords, bunCoords)) {
      setCurrentIngredientType(ingredientTypes.ru.bun);
    } else if (isDistanceValid(tabCoords, sauceCoords)) {
      setCurrentIngredientType(ingredientTypes.ru.sauce);
    } else if (isDistanceValid(tabCoords, mainCoords)) {
      setCurrentIngredientType(ingredientTypes.ru.main);
    }
  }, [isDistanceValid]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    scrollContainer.addEventListener("scroll", selectTab);

    return () => {
      scrollContainer.removeEventListener("scroll", selectTab);
    };
  }, [selectTab]);

  return (
    <>
      {isIngredientModalOpen && (
        <Modal handleModalCloseClick={closeIngredientModal}>
          <IngredientDetails ingredient={selectedIngredient} />
        </Modal>
      )}
      <section className={`${styles.section} pt-10`}>
        <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
        <div ref={tabContainerRef} className={`${styles.tabs} mb-10`}>
          <Tab
            value={ingredientTypes.ru.bun}
            active={currentIngredientType === ingredientTypes.ru.bun}
            onClick={scrollIntoIngredient}
          >
            {ingredientTypes.ru.bun}
          </Tab>
          <Tab
            value={ingredientTypes.ru.sauce}
            active={currentIngredientType === ingredientTypes.ru.sauce}
            onClick={scrollIntoIngredient}
          >
            {ingredientTypes.ru.sauce}
          </Tab>
          <Tab
            value={ingredientTypes.ru.main}
            active={currentIngredientType === ingredientTypes.ru.main}
            onClick={scrollIntoIngredient}
          >
            {ingredientTypes.ru.main}
          </Tab>
        </div>
        <div
          ref={scrollContainerRef}
          className={`${styles.container} custom-scroll`}
        >
          <ul className={styles.ingredientsList}>
            {[bunIngredients, sauceIngredients, mainIngredients].map(
              ([type, ingredients]) => (
                <li className="mb-10" key={type}>
                  <IngredientList
                    setRefForIngredientType={setRefForIngredientType}
                    ingredients={ingredients}
                    type={type}
                    selectIngredientAndOpenModal={selectIngredientAndOpenModal}
                  />
                </li>
              )
            )}
          </ul>
        </div>
      </section>
    </>
  );
};

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredient),
};
