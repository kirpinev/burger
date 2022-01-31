import { TIngredientsActions } from "services/actions/ingredients";
import { TLoadingActions } from "services/actions/loading";
import { TModalsActions } from "services/actions/modals";
import { TOrderActions } from "services/actions/order";
import { TUserActions } from "services/actions/user";
import { TWSActions } from "services/actions/ws-public-feed";

export type TApplicationActions =
  | TWSActions
  | TIngredientsActions
  | TLoadingActions
  | TModalsActions
  | TOrderActions
  | TUserActions;
