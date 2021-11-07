import React, { useMemo } from "react";
import PropTypes from "prop-types";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { BurgerItem } from "../burger-item/burger-item";

import { ingredientTypes } from "../../constants/ingredient-type";
import styles from "./burger-constructor.module.css";

export const BurgerConstructor = ({ ingredients }) => {
  const [bunType] = useMemo(() => Object.keys(ingredientTypes), []);

  return (
    <section className={`${styles.section} pt-25`}>
      <div className="ml-8 mb-4 pl-4 pr-4">
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${ingredients[0].name} (верх)`}
          price={ingredients[0].price}
          thumbnail={ingredients[0].image}
        />
      </div>
      <div className={`${styles.ingredientsList} custom-scroll`}>
        {ingredients
          .filter((ingredient) => ingredient.type !== bunType)
          .map((ingredient) => (
            <BurgerItem
              key={ingredient._id}
              image={ingredient.image}
              price={ingredient.price}
              name={ingredient.name}
            />
          ))}
      </div>
      <div className="ml-8 mb-10 mt-4 pl-4 pr-4">
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${ingredients[0].name} (низ)`}
          price={ingredients[0].price}
          thumbnail={ingredients[0].image}
        />
      </div>
      <div className={`${styles.priceButtonContainer} mr-4`}>
        <div className={`${styles.priceContainer} mr-10`}>
          <p className="text text_type_digits-medium mr-1">610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      proteins: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      carbohydrates: PropTypes.number.isRequired,
      calories: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      image_mobile: PropTypes.string.isRequired,
      image_large: PropTypes.string.isRequired,
      __v: PropTypes.number.isRequired,
    })
  ),
};
