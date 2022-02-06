import React, { FC, useCallback, useEffect } from "react";

import { StatusContainer } from "components/status-container/status-container";

import { getIngredientsThunk } from "services/thunks/ingredients";
import { selectLoadingStatus } from "services/selectors/select-loading-status";

import { useSelector } from "hooks/use-selector";
import { useLoading } from "hooks/use-loading";

interface IWSLoadingHandlerWithSocket {
  readonly openConnection: () => void;
  readonly closeConnection: () => void;
  readonly isWSConnectionError: boolean;
  readonly isWSConnected: boolean;
}

export const WSLoadingHandlerWithSocket: FC<IWSLoadingHandlerWithSocket> = ({
  children,
  openConnection,
  closeConnection,
  isWSConnectionError,
  isWSConnected,
}): JSX.Element => {
  const { isLoading, isError } = useSelector(selectLoadingStatus);
  const { resetLoading } = useLoading();

  const fetchDataAgain = useCallback(async () => {
    await getIngredientsThunk();
    openConnection();
  }, [openConnection]);

  useEffect(() => {
    openConnection();

    return () => {
      resetLoading();
      closeConnection();
    };
  }, [resetLoading, openConnection, closeConnection]);

  useEffect(() => {
    if (isWSConnectionError) {
      openConnection();
    }

    if (isError) {
      fetchDataAgain();
    }
  }, [isWSConnectionError, openConnection, fetchDataAgain, isError]);

  if (isLoading || !isWSConnected) {
    return <StatusContainer title="Загрузка..." />;
  }

  return <>{children}</>;
};
