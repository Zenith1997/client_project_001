import React from "react";

const DropDown = ({ products, selectedOrder, setSelectedOrder }) => {

  const filteredProducts = products.filter(product => {
    return !selectedOrder.items.some(item => item.ProductID === product.ProductID);
  });

  const handleChange = (event) => {

    const selectedProduct = products.find((product) => product.ProductID === Number(event.target.value));

    const newItem = {
      ProductName: selectedProduct.Name,
      ProductID: selectedProduct.ProductID,
      Quantity: 1,
      Price: selectedProduct.RetailPrice,
      Subtotal: selectedProduct.RetailPrice,
      WholesaleQty: selectedProduct.WholesaleQty
    };

    setSelectedOrder((prevOrder) => {
      const updatedItems = [...prevOrder.items, newItem];
      return { ...prevOrder, items: updatedItems };
    });
  };

  return (
    <div className="relative w-full lg:max-w-lg">
      <div className="overflow-y-auto max-h-60">
        <select
          onChange={handleChange}
          className="w-full bg-[#111827] p-1 text-gray-500 h-full bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
        >
          {filteredProducts.map((p) => (
            <option key={p.ProductID} value={p.ProductID}>
              {p.Name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DropDown;
