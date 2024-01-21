/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import leveljs from 'level-js';
const levelup = require('levelup');
const db = levelup(leveljs('./db'));

const initialState = {
  cart: [],
};

const calculatePrice = (state) => {
  state?.cart?.map((item) => {
    item.cart_total_price = item?.elements?.reduce(
      (acc, curr) => acc + parseFloat(curr?.price) * parseInt(curr?.quantity),
      0
    );
    item.cart_total_quantity = item?.elements?.reduce(
      (acc, curr) => acc + parseFloat(curr?.quantity),
      0
    );
  });
};

const fetchCarts = createAsyncThunk("carts/fetchCarts", async () => {
  try {
    const value = await db.get("cartClients");
    console.log("JSON.parse(value)", JSON.parse(value));
    return value ? JSON.parse(value) : [];
  } catch (err) {
    console.error("Error retrieving cart data:", err);
    throw err;
  }
});

const cartSlice = createSlice({
  initialState,
  name: "cart-Slice",
  reducers: {
    addToCart: (state, action) => {
      const payload = action.payload;
      if (payload) {
        let cartElementData = {
          cart_id: state?.cart?.length + 1,
          client_id: payload?.client_id,
        };

        if (
          state?.cart?.filter((item) => item?.client_id === payload?.client_id)
            ?.length
        ) {
          state?.cart?.map((item) => {
            if (item?.client_id === payload?.client_id) {
              if (
                !item.elements.filter(
                  (item) => item?.id === payload?.element?.id
                )?.length
              ) {
                const element = {
                  ...payload.element,
                  originQuantity: payload?.element?.quantity,
                  quantity: 1,
                };

                item.elements.push(element);
              }
            }
          });
        } else {
          const element = {
            ...payload.element,
            quantity: 1,
          };
          cartElementData = {
            ...cartElementData,
            elements: [element],
          };
          state?.cart?.push(cartElementData);
        }

        calculatePrice(state);
        db.put("cartClients", JSON.stringify(state));
      }
    },
    removeFromCart: (state, action) => {
      const client_id = action?.payload?.client_id;
      const cart_id = action?.payload?.cart_id;
      const element_id = action?.payload?.element_id;
      let arr = [];
      state.cart = state.cart.map((item) => {
        if (
          parseInt(item?.client_id) === parseInt(client_id) &&
          parseInt(item?.cart_id) === parseInt(cart_id)
        ) {
          item.elements = item?.elements?.filter((f_item) => {
            return f_item?.id !== element_id;
          });
        }
        // console.log(JSON.stringify(item));
        return item;
      });
      calculatePrice(state);
    },
    updateCart: (state, action) => {
      const client_id = action?.payload?.client_id;
      const cart_id = action?.payload?.cart_id;
      const element_id = action?.payload?.element_id;
      const actionType = action?.payload?.type;
      let arr = [];
      state.cart = state.cart.map((item) => {
        if (
          parseInt(item?.client_id) === parseInt(client_id) &&
          parseInt(item?.cart_id) === parseInt(cart_id)
        ) {
          item.elements = item?.elements?.map((f_item) => {
            if (parseInt(f_item?.id) === parseInt(element_id)) {
              console.log(f_item.quantity, action?.payload?.element_quantity);
              if (
                actionType === "+" &&
                f_item.quantity < action?.payload?.element_quantity
              ) {
                f_item.quantity = 1 + parseInt(f_item.quantity);
              } else if (actionType === "-") {
                if (parseInt(f_item.quantity) > 1) {
                  f_item.quantity = parseInt(f_item.quantity) - 1;
                }
              }
            }
            return f_item;
          });
        }
        // console.log(JSON.stringify(item));
        return item;
      });
      calculatePrice(state);
      db.put("cartClients", JSON.stringify(state.cart));
    },
    removeCart: (state, action) => {
      state.cart = state?.cart?.filter(
        (item) => parseInt(item?.cart_id) !== parseInt(action.payload?.cart_id)
      );
      db.put("cartClients", JSON.stringify(state.cart));
    },
    extraReducers: (builder) => {
      builder.addCase(fetchCarts.fulfilled, (state, action) => {
        state.cart = action.payload.cart;
      });
    },
  },
});

export const { addToCart, removeFromCart, updateCart, getData, removeCart } =
  cartSlice.actions;
export { fetchCarts };
export default cartSlice.reducer;
