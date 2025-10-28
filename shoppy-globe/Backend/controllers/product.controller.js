import products from "../models/Products.js";
import "../models/dbConnection.js";

// Fetch all products from the database
export const fetchProducts = (req, res) => {

    // Query the products collection
    products.find().then((data) => {
        // If no products found, return error message
        if (!data || data.length === 0) {
            return res.status(400).send({ message: "Something went wrong" });
        }
        // Send the fetched products as response
        res.send(data);
    }).catch((error) => {
        // Handle server errors
        res.status(500).json({ message: "Internal Server Error" });
    });
};

// Fetch a single product by its ID
export const fetchProductsById = (req, res) => {
    const { id } = req.params;

    // Query products collection with the given ID
    products.find({ "id": id }).then((data) => {
        // If product not found, return 404
        if (!data || data.length === 0) {
            return res.status(404).send({ message: "Product Not Found" });
        }
        // Send the found product as response
        res.send(data);
    }).catch((error) => {
        // Handle server errors
        return res.status(500).json({ message: "Internal Server Error" });
    });
}
