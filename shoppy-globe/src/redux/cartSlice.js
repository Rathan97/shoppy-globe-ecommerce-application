import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cartSlice",

  // Initial state of the cart
  initialState: {
    items: [],
  },

  reducers: {
    setCart: (state, action) => {
      state.items = action.payload;
    },

    // Add an item to the cart
    addItemLocal: (state, action) => {
      const item = action.payload;
      const existing = state.items.find(
        (i) => i.productID === item.productID && i.userID === item.userID
      );

      const quantityToAdd = item.quantity || 1;

      if (existing) {
        existing.quantity = quantityToAdd;
      } else {
        state.items.push({ ...item, quantity: quantityToAdd });
      }
    },

    // Remove an item from the cart
    removeItem : (state, action) => {
  const { productID, userID } = action.payload;


  state.items = state.items.filter(
    (item) => !(item.productID === productID && item.userID === userID)
  );


},


    // Increase the quantity of a specific item
    // increaseQuantity : (state, action) => {
    //     const id = action.payload;
    //     const item = state.items.find((i) => i.id === id);
    //     if (item) {
    //         if (item.quantity === undefined) {
    //             item.quantity = 1;
    //         } else {
    //             if (item.quantity < 5) item.quantity += 1;
    //         }
    //     }
    // },

    // // Decrease the quantity of a specific item
    // decreaseQuantity : (state, action) => {
    //     const id = action.payload;
    //     const item = state.items.find((i) => i.id === id);
    //     if (item) {
    //         if (item.quantity === undefined) {
    //             item.quantity = 1;
    //         } else {
    //             if (item.quantity > 1) item.quantity -= 1;
    //         }
    //     }
    // },

    updateQuantity: (state, action) => {
      const { productID, quantity } = action.payload;
      const item = state.items.find((i) => i.productID === productID);
      if (item) item.quantity = quantity;
    },

    // Clear all items from the cart
    clearCart: (state, action) => {
      state.items = [];
    },
  },
});

export default cartSlice.reducer;
// export const { addItem, removeItem, clearCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export const { setCart, addItemLocal, removeItem, clearCart, updateQuantity } =
  cartSlice.actions;
