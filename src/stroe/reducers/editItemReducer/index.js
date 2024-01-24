/* eslint-disable no-unused-vars */
/* eslint-disable */

import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  editItem: {},
  printItem:{},
};

const editItemSlice = createSlice({
  name: "EditItem",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.editItem = action.payload;
    },
    setPrintItem:(state, action)=>{
      state.printItem = action.payload
    }
  },
});

export const { addItem } = editItemSlice.actions;
export default editItemSlice.reducer;
