import React, { FC } from "react";

import styles from "./full-page-container.module.css";

export const FullPageContainer: FC = ({ children }): JSX.Element => (
  <div className={`${styles.fullPage} body`}>
    <main className={styles.fullPageContainer}>{children}</main>
  </div>
);
