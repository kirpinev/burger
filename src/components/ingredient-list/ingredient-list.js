import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";

import { IngredientCard } from "components/ingredient-card/ingredient-card";

import { ingredientTypes } from "constants/ingredient-type";
import { ingredient } from "prop-types/ingredient";

import styles from "./ingredient-list.module.css";

export const IngredientList = ({
  setRefForIngredientType,
  type,
  ingredients,
  selectIngredientAndOpenModal,
}) => {
  const location = useLocation();

  return (
    <>
      <h2
        ref={setRefForIngredientType(type)}
        className="text text_type_main-medium mb-6"
      >
        {ingredientTypes.ru[type]}
      </h2>
      <ul className={`${styles.ingredientsListByType}`}>
        {ingredients.map((ingredient) => (
          <li
            key={ingredient._id}
            onClick={() => selectIngredientAndOpenModal(ingredient)}
          >
            <Link
              className={styles.link}
              to={{
                pathname: `/ingredients/${ingredient._id}`,
                state: { background: location },
              }}
            >
              <IngredientCard
                ingredient={ingredient}
                name={ingredient.name}
                imageLink={ingredient.image}
                price={ingredient.price}
                handleModalOpen={selectIngredientAndOpenModal}
              />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

IngredientList.propTypes = {
  setRefForIngredientType: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(ingredient).isRequired,
  selectIngredientAndOpenModal: PropTypes.func.isRequired,
};
