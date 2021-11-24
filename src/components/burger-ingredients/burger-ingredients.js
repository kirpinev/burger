import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import { Modal } from "components/modal/modal";
import { IngredientDetails } from "components/ingredient-details/ingredient-details";
import { IngredientList } from "components/ingredient-list/ingredient-list";

import { useModal } from "hooks/use-modal";
import { useOnScreen } from "hooks/use-on-screen";

import { ingredientTypes } from "constants/ingredient-type";
import { ingredient } from "prop-types/ingredient";
import { BurgerIngredientsContext } from "context/burger-ingredients-context";

import styles from "./burger-ingredients.module.css";

export const BurgerIngredients = () => {
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [currentIngredientType, setCurrentIngredientType] = useState(
    ingredientTypes.bun
  );
  const ingredients = useContext(BurgerIngredientsContext);

  const [isIngredientModalOpen, toggleIngredientModal] = useModal();

  const bunRef = useRef();
  const mainRef = useRef();
  const sauceRef = useRef();

  const isBunsOnScreen = useOnScreen(bunRef);
  const isMainsOnScreen = useOnScreen(mainRef);
  const isSaucesOnScreen = useOnScreen(sauceRef);

  const [bunIngredients, mainIngredients, sauceIngredients] = useMemo(
    () => Object.entries(_.groupBy(ingredients, "type")),
    [ingredients]
  );
  const [bunType, mainType, sauceType] = useMemo(
    () => Object.keys(ingredientTypes),
    []
  );

  const selectIngredientAndOpenModal = useCallback(
    (ingredient) => {
      setSelectedIngredient(ingredient);
      toggleIngredientModal();
    },
    [toggleIngredientModal]
  );

  const setRefForIngredientType = useCallback(
    (name) => {
      if (name === bunType) {
        return bunRef;
      } else if (name === mainType) {
        return mainRef;
      } else if (name === sauceType) {
        return sauceRef;
      }
    },
    [bunType, mainType, sauceType]
  );

  const scrollIntoIngredient = useCallback((type) => {
    if (type === ingredientTypes.bun) {
      bunRef.current.scrollIntoView();
    } else if (type === ingredientTypes.main) {
      mainRef.current.scrollIntoView();
    } else if (type === ingredientTypes.sauce) {
      sauceRef.current.scrollIntoView();
    }
  }, []);

  const setSelectedTab = useCallback(() => {
    if (isBunsOnScreen && isSaucesOnScreen) {
      setCurrentIngredientType(ingredientTypes.bun);
    } else if (!isBunsOnScreen && isSaucesOnScreen) {
      setCurrentIngredientType(ingredientTypes.sauce);
    } else if (!isSaucesOnScreen && isMainsOnScreen) {
      setCurrentIngredientType(ingredientTypes.main);
    }
  }, [isBunsOnScreen, isMainsOnScreen, isSaucesOnScreen]);

  useEffect(() => {
    setSelectedTab();
  }, [setSelectedTab]);

  return (
    <>
      {isIngredientModalOpen && (
        <Modal handleModalCloseClick={toggleIngredientModal}>
          <IngredientDetails ingredient={selectedIngredient} />
        </Modal>
      )}
      <section className={`${styles.section} pt-10`}>
        <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
        <div className={`${styles.tabs} mb-10`}>
          <Tab
            value={ingredientTypes.bun}
            active={currentIngredientType === ingredientTypes.bun}
            onClick={scrollIntoIngredient}
          >
            {ingredientTypes.bun}
          </Tab>
          <Tab
            value={ingredientTypes.sauce}
            active={currentIngredientType === ingredientTypes.sauce}
            onClick={scrollIntoIngredient}
          >
            {ingredientTypes.sauce}
          </Tab>
          <Tab
            value={ingredientTypes.main}
            active={currentIngredientType === ingredientTypes.main}
            onClick={scrollIntoIngredient}
          >
            {ingredientTypes.main}
          </Tab>
        </div>
        <div className={`${styles.container} custom-scroll`}>
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
