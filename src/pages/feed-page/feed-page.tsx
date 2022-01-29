import React, { FC, useEffect } from "react";

import { HelmetOptions } from "components/helmet-options/helmet-options";
import { FeedList } from "components/feed-list/feed-list";
import { FeedNumbers } from "components/feed-numbers/feed-numbers";
import { StatusContainer } from "components/status-container/status-container";

import { getIngredientsThunk } from "services/thunks/ingredients";
import { selectLoadingStatus } from "services/selectors/select-loading-status";

import { useSelector } from "hooks/use-selector";
import { useLoading } from "hooks/use-loading";

import styles from "./feed-page.module.css";

export const FeedPage: FC = (): JSX.Element => {
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

  return (
    <>
      <HelmetOptions title="Лента заказов" />
      <div className="body">
        <main className={styles.main}>
          <FeedList />
          <FeedNumbers />
        </main>
      </div>
    </>
  );
};
