const express = require("express");
const {
    createOrder,
    getOrderById,
    getOrders,
    updateOrder,
    updateSelectedOrder
} = require("../controllers/orders.js");

const router = express.Router();

router.get("/", getOrders);
router.get("/:id", getOrderById);
router.post("/create", createOrder);
router.put("/:id", updateOrder);
router.put("/update/:id", updateSelectedOrder);

module.exports = router;
