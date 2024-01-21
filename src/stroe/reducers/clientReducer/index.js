/* eslint-disable no-unused-vars */
/* eslint-disable */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import leveljs from 'level-js';
const levelup = require('levelup');
const db = levelup(leveljs('./db'));

const fetchClients = createAsyncThunk(
  "clients/fetchClients",
  async () => {
    try {
      const value = await db.get("client");
      return value ? JSON.parse(value) : [];
    } catch (err) {
      console.error("Error retrieving client data:", err);
      throw err;
    }
  }
);

const initialState = {
  clients: []
};

const clientSlice = createSlice({
  name: "Clients",
  initialState,
  reducers: {
    addClient: (state, action) => {
      if (action.payload) {
        action.payload = {
          ...action.payload,
          client_cart_id: state.clients.length
        };
      }

      state.clients.push(action.payload);
      db.put("client", JSON.stringify(state.clients));
    },
    removeClient: (state, action) => {
      if (action.payload) {
        state.clients = state.clients.filter((item) => item.id != action.payload);
        toast.success("تمت إضافة العميل بنجاح");
        db.put("client", JSON.stringify(state.clients));
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchClients.fulfilled, (state, action) => {
      state.clients = action.payload;
    });
  }
});

export const { addClient, removeClient } = clientSlice.actions;
export { fetchClients };
export default clientSlice.reducer;