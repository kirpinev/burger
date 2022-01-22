import { useCallback } from "react";
import { useDispatch } from "react-redux";

import {
  toggleErrorModal,
  toggleIngredientModal,
  toggleSuccessOrderModal,
} from "services/actions/modals";

export const useModals = () => {
  const dispatch = useDispatch();

  const toggleSuccessModal = useCallback(
    () => dispatch(toggleSuccessOrderModal()),
    [dispatch]
  );
  const toggleModalWithError = useCallback(
    () => dispatch(toggleErrorModal()),
    [dispatch]
  );

  const toggleModalWithIngredient = useCallback(
    () => dispatch(toggleIngredientModal()),
    [dispatch]
  );

  return {
    toggleSuccessModal,
    toggleModalWithError,
    toggleModalWithIngredient,
  };
};
