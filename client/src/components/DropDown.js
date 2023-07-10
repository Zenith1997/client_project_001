import React from "react";

const DropDown = ({ products, selectedOrder, setSelectedOrder }) => {
  const handleChange = (event) => {
    const selectedProductId = event.target.value;

    products.forEach((product) => {
      if (product.ProductID === parseInt(selectedProductId)) {
        console.log("Product selected");
        console.log(product);

        const newItem = {
          ProductName: product.Name,
          ProductID: product.ProductID,
          Quantity: 1,
          Price: product.RetailPrice,
          Subtotal: product.RetailPrice,
        };

        // Cannot add property 2, object is not extensible
        // TypeError: Cannot add property 2, object is not extensible
        //     at Array.push (<anonymous>)
// The error message you encountered, "Cannot add property 2, object is not extensible," suggests that the selectedOrder object has been defined with the Object.preventExtensions() method, preventing any further addition of properties or extension of the object.

// To resolve this issue, you can either remove the Object.preventExtensions() call from the code that defines the selectedOrder object or create a new object that allows for property additions. Here's an example:
// // Option 1: Remove the Object.preventExtensions() call

// Option 2: Create a new object that allows for property additions
        const newSelectedOrder = {
          ...selectedOrder, // Copy the existing properties from selectedOrder
          items: [...selectedOrder.items], // Copy the existing items array from selectedOrder
        };

        newSelectedOrder.items.push(newItem);

        console.log(newSelectedOrder);
       
         setSelectedOrder(newSelectedOrder);
      }
    });

    // console.log(selectedOrder);
  };

  return (
    <div className="relative w-full lg:max-w-lg">
      <div className="overflow-y-auto max-h-60">
        <select
          onChange={handleChange}
          className="w-full bg-[#111827] p-1 text-gray-500 h-full bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
        >
          {products.map((p) => (
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
