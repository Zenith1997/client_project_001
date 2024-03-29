const db = require("../database/db.js");
const getProducts = async (req, res) => {
  try {
    const q = "SELECT * FROM products";
    const result = await executeQuery(q);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

const getProductsWithPagination = async (req, res) => {
  const { page, limit } = req.query;
  const offset = (page - 1) * limit;

  try {
    const q = "SELECT * FROM products ORDER BY (CASE WHEN priority IS NOT NULL THEN 0 ELSE 1 END), priority LIMIT ? OFFSET ?";
    const values = [Number(limit), Number(offset)];
    const result = await executeQuery(q, values);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const q = "SELECT * FROM products WHERE ProductID = ?";
    const result = await executeQuery(q, [id]);

    if (result.length === 0) {
      return res.status(404).send("Product not found");
    }

    return res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

// function is updated, need to update server
// wholesaleQty = quantity
const addProduct = async (req, res) => {
  const { name, retailPrice, wholesalePrice, desc, quantity, unit, maxLimit, priority } =
    req.body;

  try {
    const q =
      "INSERT INTO products (Name, Description, RetailPrice, WholesalePrice, Image, WholesaleQty, Unit, MaxLimit,priority) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
      name,
      desc,
      retailPrice,
      wholesalePrice,
      req.file.filename,
      quantity,
      unit,
      maxLimit || 0,
      priority
    ];
    await executeQuery(q, values);
    return res.status(201).send("Product added!");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    // Delete child records first
    const deleteOrderItemsQuery = "DELETE FROM orderitems WHERE ProductID = ?";
    await executeQuery(deleteOrderItemsQuery, [id]);

    // Delete the parent record
    const deleteProductQuery = "DELETE FROM products WHERE ProductID = ?";
    await executeQuery(deleteProductQuery, [id]);

    return res.status(200).send("Product deleted!");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, retailPrice, wholesalePrice, desc, quantity, unit, priority } = req.body;
  try {
    const q =
      "UPDATE products SET name = ?, description = ?, retailPrice = ?, wholesalePrice = ?, WholesaleQty = ?, Unit = ?, priority = ? WHERE ProductID = ?";
    const values = [
      name,
      desc,
      retailPrice,
      wholesalePrice,
      quantity,
      unit,
      priority,
      id,
    ];

    await executeQuery(q, values);
    return res.status(200).send("Product updated!");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

const executeQuery = (q, values = []) => {
  return new Promise((resolve, reject) => {
    db.query(q, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = {
  getProducts,
  getProductsWithPagination,
  getProductById,
  addProduct,
  deleteProduct,
  updateProduct,
};
