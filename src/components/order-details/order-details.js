import PropTypes from "prop-types";

import gif from "images/done.gif";

import styles from "./order-details.module.css";

export const OrderDetails = ({ orderNumber }) => (
  <div className={`${styles.container}`}>
    <h4 className="text text_type_digits-large mt-30 mb-8">{orderNumber}</h4>
    <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
    <img
      className="mb-15"
      src={gif}
      alt="Анимация удачного заказа"
      width={120}
      height={120}
    />

    <p className="text text_type_main-default mb-2">
      Ваш заказ начали готовить
    </p>
    <p className="text text_type_main-default text_color_inactive  mb-30">
      Дождитесь готовности на орбитальной станции
    </p>
  </div>
);

OrderDetails.propTypes = {
  orderNumber: PropTypes.number.isRequired,
};
