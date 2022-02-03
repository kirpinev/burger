import React, { FC, useEffect } from "react";

import { StatusContainer } from "components/status-container/status-container";

import { getIngredientsThunk } from "services/thunks/ingredients";
import { selectLoadingStatus } from "services/selectors/select-loading-status";

import { useSelector } from "hooks/use-selector";
import { useLoading } from "hooks/use-loading";

export const WSLoadingHandlerIngredients: FC = ({ children }): JSX.Element => {
  const { isLoading, isError } = useSelector(selectLoadingStatus);
  const { resetLoading } = useLoading();

  useEffect(() => {
    return () => {
      resetLoading();
    };
  }, [resetLoading]);

  if (isLoading) {
    return <StatusContainer title="Загрузка..." />;
  }

  if (isError) {
    return (
      <StatusContainer
        buttonText="Повторить"
        onButtonClick={getIngredientsThunk}
        title="При запросе данных что-то пошло не так, повторить?"
      />
    );
  }

  return <>{children}</>;
};
