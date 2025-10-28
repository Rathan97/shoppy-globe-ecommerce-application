import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name : "cartSlice",

    // Initial state of the cart
    initialState : {
        items: []
    },

    reducers : {
        // Add an item to the cart
        addItem: (state, action) => {
            const item = action.payload;
            const existing = state.items.find((i) => i.id === item.id);
            if (existing) {
                // If item already exists, increase quantity up to max 5
                if (existing.quantity === undefined) existing.quantity = 1;
                if (existing.quantity < 5) existing.quantity += 1;
            } else {
                // Add new item with default quantity 1 (or use provided quantity)
                const qty = item.quantity === undefined ? 1 : Math.min(5, Math.max(1, item.quantity));
                state.items.push({ ...item, quantity: qty });
            }
        },

        // Remove an item from the cart
        removeItem : (state, action) => {
            const id = action.payload;
            state.items = state.items.filter((p) => p.id !== id );
        },

        // Increase the quantity of a specific item
        increaseQuantity : (state, action) => {
            const id = action.payload;
            const item = state.items.find((i) => i.id === id);
            if (item) {
                if (item.quantity === undefined) {
                    item.quantity = 1;
                } else {
                    if (item.quantity < 5) item.quantity += 1;
                }
            }
        },

        // Decrease the quantity of a specific item
        decreaseQuantity : (state, action) => {
            const id = action.payload;
            const item = state.items.find((i) => i.id === id);
            if (item) {
                if (item.quantity === undefined) {
                    item.quantity = 1;
                } else {
                    if (item.quantity > 1) item.quantity -= 1;
                }
            }
        },

        // Clear all items from the cart
        clearCart : (state, action) => {
            state.items = []
        },
    }
})

export default cartSlice.reducer;
export const { addItem, removeItem, clearCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
