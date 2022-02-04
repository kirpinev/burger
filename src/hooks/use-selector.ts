import { TypedUseSelectorHook, useSelector as selectorHook } from "react-redux";
import { TStoreState } from "services/types/store";

export const useSelector: TypedUseSelectorHook<TStoreState> = selectorHook;
