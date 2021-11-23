import React, { useCallback, useContext, useMemo } from "react";
import PropTypes from "prop-types";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { BurgerItem } from "../burger-item/burger-item";
import { OrderDetails } from "../order-details/order-details";
import { Modal } from "../modal/modal";
import { OrderErrorDetails } from "../order-error-details/order-error-details";

import { useModal } from "../../hooks/use-modal";

import { ingredientTypes } from "../../constants/ingredient-type";
import { ingredient } from "../../prop-types/ingredient";
import { BurgerIngredientsContext } from "../../context/burger-ingredients-context";
import { OrderContext } from "../../context/order-context";
import { getJSON, isResponseOk, postAnOrder } from "../../api/api";

import styles from "./burger-constructor.module.css";

export const BurgerConstructor = () => {
  const [isSuccessModalOpen, toggleSuccessModal] = useModal();
  const [isErrorModalOpen, toggleErrorModal] = useModal();
  const ingredients = useContext(BurgerIngredientsContext);
  const { order, dispatchOrder, orderActionTypes } = useContext(OrderContext);

  const [bunType] = useMemo(() => Object.keys(ingredientTypes), []);

  const totalSum = useMemo(
    () => ingredients.reduce((acc, curr) => acc + curr.price, 0),
    [ingredients]
  );

  const ingredientsIds = useMemo(
    () => ingredients.map((ingredient) => ingredient._id),
    [ingredients]
  );

  const saveOrder = useCallback(
    (orderDetails) => ({
      type: orderActionTypes.save,
      payload: orderDetails.order.number,
    }),
    [orderActionTypes]
  );

  const makeAnOrder = async () => {
    try {
      const response = await postAnOrder(ingredientsIds);

      if (!isResponseOk(response)) {
        throw new Error();
      }

      const orderDetails = await getJSON(response);

      dispatchOrder(saveOrder(orderDetails));
      toggleSuccessModal();
    } catch (e) {
      toggleErrorModal();
    }
  };

  return (
    <>
      {isSuccessModalOpen && (
        <Modal handleModalCloseClick={toggleSuccessModal}>
          <OrderDetails orderNumber={order.number} />
        </Modal>
      )}
      {isErrorModalOpen && (
        <Modal handleModalCloseClick={toggleErrorModal}>
          <OrderErrorDetails />
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
