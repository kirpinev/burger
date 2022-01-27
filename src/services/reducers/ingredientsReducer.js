import {
  SAVE_INGREDIENTS,
  SAVE_SELECTED_INGREDIENT,
  RESET_SELECTED_INGREDIENT,
  SAVE_CONSTRUCTOR_BUN,
  RESET_CONSTRUCTOR_INGREDIENTS,
  SAVE_CONSTRUCTOR_INGREDIENT,
  DELETE_CONSTRUCTOR_INGREDIENT,
  REORDER_CONSTRUCTOR_INGREDIENTS,
} from "services/constants/ingredients";

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
        selectedIngredient: initialState.selectedIngredient,
      };
    case SAVE_CONSTRUCTOR_BUN:
      return {
        ...state,
        selectedBun: action.payload,
      };
    case RESET_CONSTRUCTOR_INGREDIENTS:
      return {
        ...state,
        constructorIngredients: initialState.constructorIngredients,
        selectedBun: initialState.selectedBun,
      };
    case SAVE_CONSTRUCTOR_INGREDIENT:
      return {
        ...state,
        constructorIngredients: [
          ...state.constructorIngredients,
          action.payload,
        ],
      };
    case REORDER_CONSTRUCTOR_INGREDIENTS:
      return {
        ...state,
        constructorIngredients: action.payload,
      };
    case DELETE_CONSTRUCTOR_INGREDIENT:
      return {
        ...state,
        constructorIngredients: [
          ...state.constructorIngredients.slice(0, action.payload),
          ...state.constructorIngredients.slice(action.payload + 1),
        ],
      };
    default:
      return state;
  }
};
