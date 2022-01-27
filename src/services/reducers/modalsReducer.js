import {
  TOGGLE_INGREDIENT_MODAL,
  TOGGLE_SUCCESS_ORDER_MODAL,
  TOGGLE_ERROR_ORDER_MODAL,
} from "services/constants/modals";

const initialState = {
  isIngredientModalOpen: false,
  isErrorModalOpen: false,
  isSuccessOrderModalOpen: false,
};

export const modalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_INGREDIENT_MODAL:
      return {
        ...state,
        isIngredientModalOpen: !state.isIngredientModalOpen,
      };
    case TOGGLE_SUCCESS_ORDER_MODAL: {
      return {
        ...state,
        isSuccessOrderModalOpen: !state.isSuccessOrderModalOpen,
      };
    }
    case TOGGLE_ERROR_ORDER_MODAL: {
      return {
        ...state,
        isErrorModalOpen: !state.isErrorModalOpen,
      };
    }
    default:
      return state;
  }
};
