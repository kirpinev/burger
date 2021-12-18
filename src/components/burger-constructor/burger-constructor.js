import { useCallback, useMemo } from "react";
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
import { RequestErrorDetails } from "components/request-error-details/request-error-details";
import { EmptyConstructor } from "components/empty-constructor/empty-constructor";

import { postAnOrder } from "services/actions/order";
import {
  toggleErrorModal,
  toggleSuccessOrderModal,
} from "services/actions/modals";
import {
  saveConstructorBun,
  saveConstructorIngredient,
  deleteConstructorIngredient,
} from "services/actions/ingredients";
import { selectBurgerPrice } from "services/selectors/select-burger-price";
import { selectOrderNumber } from "services/selectors/select-order-number";
import { selectModalStatus } from "services/selectors/select-modal-status";
import { selectConstructorIngredients } from "services/selectors/select-constructor-ingredients";

import { ingredient } from "prop-types/ingredient";
import { dndTypes } from "constants/dnd-types";

import styles from "./burger-constructor.module.css";

export const BurgerConstructor = () => {
  const burgerPrice = useSelector(selectBurgerPrice);
  const { constructorIngredients, selectedBun } = useSelector(
    selectConstructorIngredients
  );
  const orderNumber = useSelector(selectOrderNumber);
  const { isErrorModalOpen, isSuccessOrderModalOpen } =
    useSelector(selectModalStatus);
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

  const toggleSuccessModal = useCallback(
    () => dispatch(toggleSuccessOrderModal()),
    [dispatch]
  );
  const toggleModalWithError = useCallback(
    () => dispatch(toggleErrorModal()),
    [dispatch]
  );

  const makeAnOrder = useCallback(() => dispatch(postAnOrder()), [dispatch]);

  const opacity = useMemo(() => (isHover ? 0.8 : 1), [isHover]);

  return (
    <>
      {isSuccessOrderModalOpen && (
        <Modal handleModalCloseClick={toggleSuccessModal}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
      {isErrorModalOpen && (
        <Modal handleModalCloseClick={toggleModalWithError}>
          <RequestErrorDetails
            title="Что-то пошло не так :("
            subtitle="Попробуйте оформить заказ снова"
          />
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
              <p className="text text_type_digits-medium mr-1">{burgerPrice}</p>
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
