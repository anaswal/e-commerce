import { combineReducers, legacy_createStore } from "redux";
import { userReducer } from "./user";
import { counterReducer } from "./counter";
import { cartReducer } from "./cart";

export const store = combineReducers({
  user: userReducer,
  counter: counterReducer,
  cart: cartReducer,
});

export const globalStore = legacy_createStore(store);
