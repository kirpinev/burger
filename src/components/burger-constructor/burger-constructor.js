import React, { useMemo } from "react";
import PropTypes from "prop-types";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { BurgerItem } from "../burger-item/burger-item";
import { OrderDetails } from "../order-details/order-details";
import { Modal } from "../modal/modal";

import { useModal } from "../../hooks/use-modal";

import { ingredientTypes } from "../../constants/ingredient-type";
import { ingredient } from "../../prop-types/ingredient";

import styles from "./burger-constructor.module.css";

export const BurgerConstructor = ({ ingredients }) => {
  const { isModalOpen, toggleModal } = useModal();

  const [bunType] = useMemo(() => Object.keys(ingredientTypes), []);

  return (
    <>
      {isModalOpen && (
        <Modal handleModalCloseClick={toggleModal}>
          <OrderDetails />
        </Modal>
      )}
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
          <Button type="primary" size="large" onClick={toggleModal}>
            Оформить заказ
          </Button>
        </div>
      </section>
    </>
  );
};

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredient),
};
