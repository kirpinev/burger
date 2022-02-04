import { useDispatch as dispatchHook } from "react-redux";

import { TApplicationDispatch, TApplicationThunk } from "services/types/store";

export const useDispatch = () =>
  dispatchHook<TApplicationDispatch | TApplicationThunk>();
