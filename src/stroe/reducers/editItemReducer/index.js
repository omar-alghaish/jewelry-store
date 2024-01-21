/* eslint-disable no-unused-vars */
/* eslint-disable */

import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  editItem: {},
};

const editItemSlice = createSlice({
  name: "EditItem",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.editItem = action.payload;
    },
  },
});

export const { addItem } = editItemSlice.actions;
export default editItemSlice.reducer;
