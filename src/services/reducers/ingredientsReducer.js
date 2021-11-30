import {
  SAVE_INGREDIENTS,
  SAVE_SELECTED_INGREDIENT,
  RESET_SELECTED_INGREDIENT,
} from "services/actions/ingredients";

const initialState = {
  burgerIngredients: [],
  constructorIngredients: [],
  selectedBun: null,
  selectedIngredient: null,
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_INGREDIENTS:
      return {
        ...state,
        burgerIngredients: action.payload,
      };
    case SAVE_SELECTED_INGREDIENT:
      return {
        ...state,
        selectedIngredient: action.payload,
      };
    case RESET_SELECTED_INGREDIENT:
      return {
        ...state,
        selectedIngredient: null,
      };
    default:
      return state;
  }
};
