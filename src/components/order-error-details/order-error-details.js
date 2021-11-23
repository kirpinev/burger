import React from "react";

import styles from "./order-error-details.module.css";

export const OrderErrorDetails = () => (
  <>
    <h4 className={`${styles.title} text text_type_main-large`}>
      Что-то пошло не так :(
    </h4>
    <p className="text text_type_main-default text_color_inactive mt-15 mb-15">
      Попробуйте оформить заказ снова
    </p>
  </>
);
