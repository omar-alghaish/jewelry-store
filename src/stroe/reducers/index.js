import { combineReducers } from "@reduxjs/toolkit";
import clientReducer from "./clientReducer";
import clientCartReducer from "./clientCartReducer";
import editItemReducer from "./editItemReducer";

export const combinedReducers = combineReducers({
  client: clientReducer,
  cart: clientCartReducer,
  editItem: editItemReducer
});
