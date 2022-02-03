import { TIngredientsActions } from "services/actions/ingredients";
import { TLoadingActions } from "services/actions/loading";
import { TModalsActions } from "services/actions/modals";
import { TOrderActions } from "services/actions/order";
import { TUserActions } from "services/actions/user";
import { TWSOrderActions } from "services/actions/ws-orders";
import { TWSUserOrdersActions } from "services/actions/ws-user-orders";

export type TApplicationActions =
  | TWSOrderActions
  | TWSUserOrdersActions
  | TIngredientsActions
  | TLoadingActions
  | TModalsActions
  | TOrderActions
  | TUserActions;
