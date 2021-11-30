import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { BurgerItem } from "components/burger-item/burger-item";
import { OrderDetails } from "components/order-details/order-details";
import { Modal } from "components/modal/modal";
import { OrderErrorDetails } from "components/order-error-details/order-error-details";

import { ingredientTypes } from "constants/ingredient-type";
import { ingredient } from "prop-types/ingredient";
import { makeAnOrderRequest } from "services/actions/order";
import {
  toggleErrorOrderModal,
  toggleSuccessOrderModal,
} from "services/actions/modals";

import styles from "./burger-constructor.module.css";

export const BurgerConstructor = () => {
  const { burgerIngredients } = useSelector((state) => state.ingredients);
  const orderNumber = useSelector((state) => state.order.number);
  const { isErrorOrderModalOpen, isSuccessOrderModalOpen } = useSelector(
    (state) => state.modals
  );
  const dispatch = useDispatch();

  const [bunType] = useMemo(() => Object.keys(ingredientTypes), []);
  const totalSum = useMemo(
    () => burgerIngredients.reduce((acc, curr) => acc + curr.price, 0),
    [burgerIngredients]
  );

  const toggleSuccessModal = useCallback(
    () => dispatch(toggleSuccessOrderModal()),
    [dispatch]
  );
  const toggleErrorModal = useCallback(
    () => dispatch(toggleErrorOrderModal()),
    [dispatch]
  );

  const makeAnOrder = useCallback(
    () => dispatch(makeAnOrderRequest()),
    [dispatch]
  );

  return (
    <>
      {isSuccessOrderModalOpen && (
        <Modal handleModalCloseClick={toggleSuccessModal}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
      {isErrorOrderModalOpen && (
        <Modal handleModalCloseClick={toggleErrorModal}>
          <OrderErrorDetails />
        </Modal>
      )}
      <section className={`${styles.section} pt-25`}>
        <div className="ml-8 mb-4 pl-4 pr-4">
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${burgerIngredients[0].name} (верх)`}
            price={burgerIngredients[0].price}
            thumbnail={burgerIngredients[0].image}
          />
        </div>
        <div className={`${styles.ingredientsList} custom-scroll`}>
          {burgerIngredients
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
            text={`${burgerIngredients[0].name} (низ)`}
            price={burgerIngredients[0].price}
            thumbnail={burgerIngredients[0].image}
          />
        </div>
        <div className={`${styles.priceButtonContainer} mr-4`}>
          <div className={`${styles.priceContainer} mr-10`}>
            <p className="text text_type_digits-medium mr-1">{totalSum}</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button type="primary" size="large" onClick={makeAnOrder}>
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
