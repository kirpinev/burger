import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
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
import { EmptyConstructor } from "components/empty-constructor/empty-constructor";

import { makeAnOrderRequest } from "services/actions/order";
import {
  toggleErrorOrderModal,
  toggleSuccessOrderModal,
} from "services/actions/modals";
import {
  saveConstructorBun,
  saveConstructorIngredient,
  deleteConstructorIngredient,
} from "services/actions/ingredients";

import { ingredient } from "prop-types/ingredient";
import { dndTypes } from "constants/dnd-types";

import styles from "./burger-constructor.module.css";

export const BurgerConstructor = () => {
  const { constructorIngredients, selectedBun } = useSelector(
    (state) => state.ingredients
  );
  const orderNumber = useSelector((state) => state.order.number);
  const { isErrorOrderModalOpen, isSuccessOrderModalOpen } = useSelector(
    (state) => state.modals
  );
  const dispatch = useDispatch();
  const [{ isHover }, dropRef] = useDrop(
    {
      accept: dndTypes.ingredientItem,
      drop: (ingredient) => {
        ingredient.type === "bun"
          ? dispatch(saveConstructorBun(ingredient))
          : dispatch(saveConstructorIngredient(ingredient));
      },
      collect: (monitor) => ({
        isHover: monitor.isOver(),
      }),
    },
    []
  );

  const ingredientsSum = useMemo(
    () => constructorIngredients.reduce((acc, curr) => acc + curr.price, 0),
    [constructorIngredients]
  );
  const bunSum = useMemo(
    () => (selectedBun ? selectedBun.price * 2 : 0),
    [selectedBun]
  );

  const opacity = useMemo(() => (isHover ? 0.8 : 1), [isHover]);

  const toggleSuccessModal = useCallback(
    () => dispatch(toggleSuccessOrderModal()),
    [dispatch]
  );
  const toggleErrorModal = useCallback(
    () => dispatch(toggleErrorOrderModal()),
    [dispatch]
  );

  const makeAnOrder = useCallback(() => {
    dispatch(makeAnOrderRequest());
  }, [dispatch]);

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
      {!selectedBun && constructorIngredients.length === 0 ? (
        <EmptyConstructor dropRef={dropRef} isHover={isHover} />
      ) : (
        <section ref={dropRef} className={`${styles.section} pt-25`}>
          <div className="ml-8 mb-4 pl-4 pr-4" style={{ opacity }}>
            {selectedBun && (
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${selectedBun.name} (верх)`}
                price={selectedBun.price}
                thumbnail={selectedBun.image}
              />
            )}
          </div>
          <div
            className={`${styles.ingredientsList} custom-scroll`}
            style={{ opacity }}
          >
            {constructorIngredients.map((ingredient, index) => (
              <BurgerItem
                key={ingredient._id + index}
                index={index}
                ingredient={ingredient}
                deleteIngredient={() =>
                  dispatch(deleteConstructorIngredient(index))
                }
              />
            ))}
          </div>
          <div className="ml-8 mb-10 mt-4 pl-4 pr-4" style={{ opacity }}>
            {selectedBun && (
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${selectedBun.name} (низ)`}
                price={selectedBun.price}
                thumbnail={selectedBun.image}
              />
            )}
          </div>
          <div className={`${styles.priceButtonContainer} mr-4`}>
            <div className={`${styles.priceContainer} mr-10`}>
              <p className="text text_type_digits-medium mr-1">
                {ingredientsSum + bunSum}
              </p>
              <CurrencyIcon type="primary" />
            </div>
            {selectedBun && constructorIngredients.length !== 0 && (
              <Button type="primary" size="large" onClick={makeAnOrder}>
                Оформить заказ
              </Button>
            )}
          </div>
        </section>
      )}
    </>
  );
};

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredient),
};
