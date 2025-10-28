import { fetchProducts, fetchProductsById } from "../controllers/product.controller.js";

// Function to define all product-related routes
function productRoutes(router){
    // Route to fetch all products
    router.get("/api/products", fetchProducts);

    // Route to fetch a specific product by its ID
    router.get("/api/products/:id", fetchProductsById);
}

export default productRoutes;
