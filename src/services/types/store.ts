import { store } from "services/store/store";

export type TStoreState = ReturnType<typeof store.getState>;
