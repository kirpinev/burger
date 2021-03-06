import { FC, useCallback, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "hooks/use-dispatch";
import { useSelector } from "hooks/use-selector";
import { useDrop } from "react-dnd";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { BurgerItem } from "components/burger-item/burger-item";
import { CreatedOrder } from "components/created-order/created-order";
import { Modal } from "components/modal/modal";
import { RequestErrorDetails } from "components/request-error-details/request-error-details";
import { EmptyConstructor } from "components/empty-constructor/empty-constructor";

import { postAnOrderThunk } from "services/thunks/order";
import { selectBurgerPrice } from "services/selectors/select-burger-price";
import {
  selectOrderNumber,
  selectOrderPostingStatus,
} from "services/selectors/select-order-number";
import { selectModalStatus } from "services/selectors/select-modal-status";
import { selectConstructorIngredients } from "services/selectors/select-constructor-ingredients";
import { logOutUser } from "services/actions/user";

import { getAccessToken, getRefreshToken } from "utils/token";
import { useModals } from "hooks/use-modals";
import { useIngredients } from "hooks/use-ingredients";
import { AppRoutes } from "enums/app-routes";
import { DndTypes } from "enums/dnd-types";
import { IBurgerIngredient } from "types/burger-ingredient";

import styles from "./burger-constructor.module.css";

export const BurgerConstructor: FC = (): JSX.Element => {
  const burgerPrice = useSelector(selectBurgerPrice);
  const { constructorIngredients, selectedBun } = useSelector(
    selectConstructorIngredients
  );
  const orderNumber = useSelector(selectOrderNumber);
  const isOrderPosting = useSelector(selectOrderPostingStatus);
  const { isErrorModalOpen, isSuccessOrderModalOpen } =
    useSelector(selectModalStatus);
  const { toggleModalWithError, toggleSuccessModal } = useModals();
  const { saveBun, saveIngredient, deleteIngredient } = useIngredients();
  const dispatch = useDispatch();
  const history = useHistory();
  const [{ isHover }, dropRef] = useDrop(
    {
      accept: DndTypes.IngredientItem,
      drop: (ingredient: IBurgerIngredient) => {
        ingredient.type === "bun"
          ? saveBun(ingredient)
          : saveIngredient(ingredient);
      },
      collect: (monitor) => ({
        isHover: monitor.isOver(),
      }),
    },
    []
  );

  const makeAnOrder = useCallback(() => {
    if (!getAccessToken() && !getRefreshToken()) {
      dispatch(logOutUser());
      history.push(AppRoutes.LoginPage);
    } else {
      dispatch(postAnOrderThunk());
    }
  }, [dispatch, history]);

  const opacity = useMemo(() => (isHover ? 0.8 : 1), [isHover]);

  return (
    <>
      {isSuccessOrderModalOpen && (
        <Modal handleModalCloseClick={toggleSuccessModal}>
          <CreatedOrder orderNumber={orderNumber} />
        </Modal>
      )}
      {isErrorModalOpen && (
        <Modal handleModalCloseClick={toggleModalWithError}>
          <RequestErrorDetails
            title="??????-???? ?????????? ???? ?????? :("
            subtitle="???????????????????? ???????????????? ?????????? ??????????"
          />
        </Modal>
      )}
      {!selectedBun && constructorIngredients.length === 0 ? (
        <EmptyConstructor dropRef={dropRef} isHover={isHover} />
      ) : (
        <section ref={dropRef} className={`${styles.burgerConstructor} pt-25`}>
          <div className="ml-8 mb-4 pl-4 pr-4" style={{ opacity }}>
            {selectedBun && (
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${selectedBun.name} (????????)`}
                price={selectedBun.price}
                thumbnail={selectedBun.image}
              />
            )}
          </div>
          <div
            className={`${styles.ingredientsList} custom-scroll`}
            style={{ opacity }}
          >
            {constructorIngredients.map(
              (ingredient: IBurgerIngredient, index: number) => (
                <BurgerItem
                  key={ingredient._id + index}
                  index={index}
                  ingredient={ingredient}
                  deleteIngredient={() => deleteIngredient(index)}
                />
              )
            )}
          </div>
          <div className="ml-8 mb-10 mt-4 pl-4 pr-4" style={{ opacity }}>
            {selectedBun && (
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${selectedBun.name} (??????)`}
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
                {isOrderPosting ? "??????????????????..." : "???????????????? ??????????"}
              </Button>
            )}
          </div>
        </section>
      )}
    </>
  );
};
