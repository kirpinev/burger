import { FC } from "react";
import { ConnectDropTarget } from "react-dnd";

import styles from "./empty-constructor.module.css";

interface IEmptyConstructor {
  readonly dropRef: ConnectDropTarget;
  readonly isHover: boolean;
}

export const EmptyConstructor: FC<IEmptyConstructor> = ({
  dropRef,
  isHover,
}): JSX.Element => (
  <div
    ref={dropRef}
    className={`${styles.emptyContainer} mt-25`}
    style={{
      borderColor: isHover ? "#8585ad" : "",
      color: isHover ? "#8585ad" : "",
    }}
  >
    <p className={`${styles.text} text text_type_main-medium mb-8`}>
      Перенесите сюда вашу любимую булочку и ингредиенты
    </p>
  </div>
);
