import { useDispatch as dispatchHook } from "react-redux";
import { TApplicationDispatch } from "services/types/dispatch";
import { TApplicationThunk } from "services/types/thunk";

export const useDispatch = () =>
  dispatchHook<TApplicationDispatch | TApplicationThunk>();
