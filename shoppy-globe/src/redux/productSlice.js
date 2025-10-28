import { createSlice } from "@reduxjs/toolkit";



const productSlice = createSlice({
    name : "productSlice",
    initialState : {
        allProducts : [],
        filtertedProducts : []
    },

    reducers : {

        setProducts : (state,action)=>{
            state.allProducts = action.payload
            state.filtertedProducts = action.payload
        },

      filterProducts: (state, action) => {
  const search = action.payload.toLowerCase();

  if (!search.trim()) {
  
    state.filtertedProducts = state.allProducts;
  } else {
    state.filtertedProducts = state.allProducts.filter(
      (p) =>
        p.title.toLowerCase().includes(search) ||
        p.category.toLowerCase().includes(search)
    );
  }
}

    }
})


export default productSlice.reducer;
export const {setProducts, filterProducts} = productSlice.actions;