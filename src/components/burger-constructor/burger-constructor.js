import React from "react";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { BurgerItem } from "../burger-item/burger-item";

import { ingredients } from "../../mocks/data";
import styles from "./burger-constructor.module.css";

export const BurgerConstructor = () => (
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
      {ingredients.map((ingredient) => (
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
