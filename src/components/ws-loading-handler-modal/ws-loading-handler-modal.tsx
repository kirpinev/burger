import { FC, useEffect } from "react";

import { selectLoadingStatus } from "services/selectors/select-loading-status";

import { useSelector } from "hooks/use-selector";
import { useLoading } from "hooks/use-loading";

export const WSLoadingHandlerModal: FC = ({ children }) => {
  const { isLoading } = useSelector(selectLoadingStatus);
  const { resetLoading } = useLoading();

  useEffect(() => {
    return () => {
      resetLoading();
    };
  }, [resetLoading]);

  if (isLoading) {
    return null;
  }

  return <>{children}</>;
};
