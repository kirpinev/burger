import { TIngredientsActions } from "services/actions/ingredients";
import { TLoadingActions } from "services/actions/loading";
import { TModalsActions } from "services/actions/modals";
import { TOrderActions } from "services/actions/order";
import { TUserActions } from "services/actions/user";

export type TApplicationActions =
  | TIngredientsActions
  | TLoadingActions
  | TModalsActions
  | TOrderActions
  | TUserActions;
