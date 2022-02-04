import { FC, useMemo } from "react";

import { selectBurgerIngredients } from "services/selectors/select-burger-ingredients";

import { useSelector } from "hooks/use-selector";

interface IPublicFeedDetailsIngredientName {
  readonly ingredientId: string;
}

export const IngredientName: FC<IPublicFeedDetailsIngredientName> = ({
  ingredientId,
}): JSX.Element => {
  const ingredients = useSelector(selectBurgerIngredients);

  const ingredientName = useMemo(
    () =>
      ingredients && ingredients.length
        ? ingredients.find((ingredient) => ingredient._id === ingredientId)
            ?.name
        : "",
    [ingredientId, ingredients]
  );
  return <p className="text text_type_main-default ml-3">{ingredientName}</p>;
};
