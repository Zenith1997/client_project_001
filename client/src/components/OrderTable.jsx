import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const OrderTable = ({ items, totalAmount, isEdit }) => {
  return (
    <table className="w-full">
      <thead>
        <tr className="text-gray-300">
          <th>Item</th>
          <th className="text-center">Quantity</th>
          <th className="text-center">Price</th>
          {isEdit && <th className="text-center">Remove</th>}
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr className="text-gray-400" key={index}>
            <td>{item.ProductName}</td>
            <td className="text-center">
              <div className="flex items-center gap-4 justify-center">
                {isEdit && <FaMinus />}
                {item.Quantity}
                {isEdit && <FaPlus />}
              </div>
            </td>

            <td className="text-right">Rs. {item.Price}</td>
            {isEdit && <td className="text-right text-red-500">Remove</td>}
          </tr>
        ))}
        <tr className="text-gray-200 mt-2 border-t border-b border-t-gray-500 border-b-gray-500">
          <th>Total</th>
          <td></td>
          <td className="text-right">Rs. {totalAmount}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default OrderTable;