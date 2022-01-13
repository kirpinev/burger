import { ChangeEvent } from "react";

export const getInputValue = (e: ChangeEvent<HTMLInputElement>): string =>
  e.target.value;
