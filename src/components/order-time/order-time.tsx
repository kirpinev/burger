import { FC, useMemo } from "react";
import { format, formatDistance } from "date-fns";
import { ru } from "date-fns/locale";

interface IOrderTime {
  readonly createdAt: string;
}

export const OrderTime: FC<IOrderTime> = ({ createdAt }): JSX.Element => {
  const dateObject = useMemo(() => new Date(createdAt), [createdAt]);
  const stringDate = useMemo(
    () =>
      formatDistance(dateObject, new Date(), {
        addSuffix: true,
        locale: ru,
      }),
    [dateObject]
  );
  const time = useMemo(
    () =>
      format(dateObject, "p", {
        locale: ru,
      }),
    [dateObject]
  );

  return (
    <time
      className="text text_type_main-default text_color_inactive"
      dateTime={createdAt}
    >
      {stringDate}, {time} i-GMT+3
    </time>
  );
};
