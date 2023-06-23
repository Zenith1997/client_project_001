const express = require("express");
const {
    getProducts,
    getProductsWithPagination,
    getProductById,
    updateProduct,
    deleteProduct
} = require("../controllers/products");


const router = express.Router();

router.get("/", getProducts);
router.get("/view", getProductsWithPagination);
router.get("/:id", getProductById);
router.put("/edit/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
