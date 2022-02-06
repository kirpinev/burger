import { FC } from "react";
import { Helmet } from "react-helmet";

interface IHelmetOptions {
  readonly title?: string;
}

export const HelmetOptions: FC<IHelmetOptions> = ({
  title,
  children,
}): JSX.Element => (
  <Helmet>
    {title && <title>{title}</title>}
    {children}
  </Helmet>
);
