import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name : "productSlice",

    // Initial state for products
    initialState : {
        allProducts : [],
        filtertedProducts : []
    },

    reducers : {

        // Set the list of all products and initialize filtered products
        setProducts : (state, action) => {
            state.allProducts = action.payload
            state.filtertedProducts = action.payload
        },

        // Filter products based on search term (title or category)
        filterProducts: (state, action) => {
            const search = action.payload.toLowerCase();

            if (!search.trim()) {
                // If search term is empty, show all products
                state.filtertedProducts = state.allProducts;
            } else {
                // Filter products by title or category
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
export const { setProducts, filterProducts } = productSlice.actions;
