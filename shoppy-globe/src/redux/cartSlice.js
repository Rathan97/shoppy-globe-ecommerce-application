import { createSlice } from "@reduxjs/toolkit";




const cartSlice = createSlice({
    name : "cartSlice",
    initialState : {
        items: []
    },

    reducers : {
       addItem: (state, action) => {
      const item = action.payload;
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        // ensure quantity exists and increase up to max 5
        if (existing.quantity === undefined) existing.quantity = 1;
        if (existing.quantity < 5) existing.quantity += 1;
      } else {
        // add item, ensure quantity defaults to 1 (or use item.quantity if provided)
        const qty = item.quantity === undefined ? 1 : Math.min(5, Math.max(1, item.quantity));
        state.items.push({ ...item, quantity: qty });
      }
    },

        removeItem : (state,action)=>{
            const id = action.payload;
            state.items = state.items.filter((p)=>p.id !== id )
        },

        increaseQuantity : (state,action)=>{
                 const id = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        if (item.quantity === undefined) {
          // if missing, treat as 1 -> increase to 2
          item.quantity = 1;
        } else {
          if (item.quantity < 5) item.quantity += 1;
        }
      }
        },


         decreaseQuantity : (state,action)=>{
              const id = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        if (item.quantity === undefined) {
          // if missing, treat as 1 (can't go below 1)
          item.quantity = 1;
        } else {
          if (item.quantity > 1) item.quantity -= 1;
        }
      }

        },

        
        

        clearCart : (state,action)=>{
            state.items = []
        },


    }
})


export default cartSlice.reducer;
export const {addItem, removeItem,clearCart, increaseQuantity,decreaseQuantity} = cartSlice.actions;