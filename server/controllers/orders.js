const { select } = require("react-cookies");
const db = require("../database/db.js");

function priceCalculator(retailPrice, wholesalePrice, quantity, wholesaleQty) {
    let calculatedPrice;

    if (quantity >= wholesaleQty) {
        calculatedPrice = wholesalePrice * quantity;
    } else if (quantity > 1) {
        const unitPriceRange = (wholesalePrice - retailPrice) / wholesaleQty - 1;
        const unitPrice = retailPrice + (unitPriceRange * (quantity - 1));
        calculatedPrice = unitPrice * quantity;
    } else {
        calculatedPrice = retailPrice * quantity;
    }

    return Number(calculatedPrice.toFixed(2));
}

// updated, need replace that function to server side
exports.createOrder = (req, res) => {
    const {name, contactNumber, address, email, subTotal, items, note = 'No Note'} = req.body;

    try {
        db.beginTransaction((err) => {
            if (err) {
                console.error("Error starting database transaction: ", err);
                return res.status(500).json({error: "Database transaction error"});
            }

            const orderQuery =
                "INSERT INTO orders (OrderDate, TotalAmount, Status, UserName, ContactNo, ShippingAddress, Email, Note) VALUES (NOW(), ?, ?, ?, ?, ?, ?, ?)";
            const orderValues = [
                subTotal,
                "pending",
                name,
                contactNumber,
                address,
                email,
                note
            ];

            db.query(orderQuery, orderValues, (err, result) => {
                if (err) {
                    console.error("Error inserting order details: ", err);
                    db.rollback(() => {
                        return res.status(500).json({error: "Error creating order"});
                    });
                }

                const orderID = result.insertId;

                const orderItemsQuery =
                    "INSERT INTO orderitems (OrderID, ProductID, Quantity, Price, Subtotal) VALUES ?";


                const orderItemsValues = items.map((item) => [
                    orderID,
                    item.ProductID,
                    item.quantity,
                    priceCalculator(item.RetailPrice, item.WholesalePrice, item.quantity, item.WholesaleQty) / item.quantity,
                    priceCalculator(item.RetailPrice, item.WholesalePrice, item.quantity, item.WholesaleQty),
                ]);

                db.query(orderItemsQuery, [orderItemsValues], (err) => {
                    if (err) {
                        console.error("Error inserting order items: ", err);
                        db.rollback(() => {
                            return res.status(500).json({error: "Error creating order"});
                        });
                    }

                    db.commit((err) => {
                        if (err) {
                            console.error("Error committing transaction: ", err);
                            db.rollback(() => {
                                return res.status(500).json({error: "Error creating order"});
                            });
                        }

                        return res
                            .status(200)
                            .json({message: "Order created successfully"});
                    });
                });
            });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
};

exports.getOrders = (req, res) => {
    const query = `
    SELECT
      p.Name AS ProductName,
      o.OrderID,
      o.OrderDate,
      o.TotalAmount,
      o.Status,
      o.UserName,
      o.ContactNo,
      o.ShippingAddress,
      o.Email,
      oi.ProductID,
      oi.Quantity,
      oi.Price,
      oi.Subtotal
    FROM
      orders AS o
      INNER JOIN orderitems AS oi ON o.OrderID = oi.OrderID
      INNER JOIN products AS p ON oi.ProductID = p.ProductID
    ORDER BY
      o.OrderDate DESC
  `;

    try {
        db.query(query, (err, results) => {
            if (err) {
                console.error(
                    "Error retrieving product details with order details: ",
                    err
                );
                return res.status(500).json({
                    error: "Error retrieving product details with order details",
                });
            }

            const orders = [];
            let currentOrder = null;

            for (const row of results) {
                if (!currentOrder || currentOrder.OrderID !== row.OrderID) {
                    currentOrder = {
                        OrderID: row.OrderID,
                        OrderDate: row.OrderDate,
                        TotalAmount: row.TotalAmount,
                        Status: row.Status,
                        UserName: row.UserName,
                        ContactNo: row.ContactNo,
                        ShippingAddress: row.ShippingAddress,
                        Email: row.Email,
                        Note: row.Note,
                        items: [],
                    };
                    orders.push(currentOrder);
                }

                currentOrder.items.push({
                    ProductName: row.ProductName,
                    ProductID: row.ProductID,
                    Quantity: row.Quantity,
                    Price: row.Price,
                    Subtotal: row.Subtotal,
                });
            }

            return res.status(200).json({orders});
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
};

exports.getOrderById = (req, res) => {
    const {id} = req.params;
    const q = "SELECT * FROM orders WHERE OrderID = ?";

    try {
        db.query(q, [id], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Internal Server Error");
            }

            if (result.length === 0) {
                return res.status(404).send("Order not found");
            }

            return res.status(200).json(result[0]);
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
};

exports.updateSelectedOrder = (req, res) => {
    const {id} = req.params;
    const {selectedOrder} = req.body;

    const orderUpdateQuery = "Update orders SET UserName = ?, ContactNo = ?, ShippingAddress = ?, Email = ?, Note = ? WHERE OrderID = ?";

    const orderItemsDeleteQuery = "DELETE FROM orderitems WHERE OrderID = ?";

    const orderItemsQuery = "INSERT INTO orderitems (OrderID, ProductID, Quantity, Price, Subtotal) VALUES ?";

    const orderItemsValues = selectedOrder.items.map((item) => [
        orderID,
        item.ProductID,
        item.quantity,
        item.Price,
        item.Subtotal
    ]);

    try {
        db.query(orderUpdateQuery, [selectedOrder.UserName, selectedOrder.ContactNo, selectedOrder.ShippingAddress, selectedOrder.Email, selectedOrder.Note, id], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Internal Server Error");
            }

            if (result.affectedRows === 0) {
                return res.status(404).send("Order not found");
            }
        });

        db.query(orderItemsDeleteQuery, [id], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Internal Server Error");
            }

            if (result.affectedRows === 0) {
                return res.status(404).send("Order not found");
            }
        });

        db.query(orderItemsQuery, [orderItemsValues], (err) => {
            if (err) {
                console.error("Error inserting order items: ", err);
                db.rollback(() => {
                    return res.status(500).json({ error: "Error creating order" });
                });
            }
    
            db.commit((err) => {
                if (err) {
                    console.error("Error committing transaction: ", err);
                    db.rollback(() => {
                        return res.status(500).json({ error: "Error creating order" });
                    });
                }
    
                return res
                    .status(200)
                    .json({ message: "Order created successfully" });
            });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
}

exports.updateOrder = (req, res) => {
    const {id} = req.params;
    const {status} = req.body;

    console.log(status)

    const q = "UPDATE orders SET Status = ? WHERE OrderID = ?";

    try {
        db.query(q, [status, id], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Internal Server Error");
            }

            if (result.affectedRows === 0) {
                return res.status(404).send("Order not found");
            }

            return res.status(200).send("Order updated!");
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
};
