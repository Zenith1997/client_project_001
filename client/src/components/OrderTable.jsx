import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { priceCalculator, returnTotalPrice } from "../utility";

const OrderTable = ({ products, items, totalAmount, isEdit, setSelectedOrder }) => {

  function handleDecrementQuantity(item) {
    if(item.Quantity > 0){
      setSelectedOrder((prevOrder) => {
        const updatedItems = prevOrder.items.map((prevItem) => {
          if (prevItem.ProductID === item.ProductID) {
            return { ...prevItem, Quantity: prevItem.Quantity - 1 };
          }
          return prevItem;
        });
    
        return { ...prevOrder, items: updatedItems };
      });
    }
  }

  function handleIncrementQuantity(item) {
    if(item.Quantity < 10){
      setSelectedOrder((prevOrder) => {
        const updatedItems = prevOrder.items.map((prevItem) => {
          if (prevItem.ProductID === item.ProductID) {
            return { ...prevItem, Quantity: prevItem.Quantity + 1 };
          }
          return prevItem;
        });
    
        return { ...prevOrder, items: updatedItems };
      });
    }
  }

  function handleRemoveItem(item) {
    setSelectedOrder((prevOrder) => {
      const updatedItems = prevOrder.items.filter((prevItem) => prevItem.ProductID !== item.ProductID);
      return { ...prevOrder, items: updatedItems };
    });
  }

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
                {isEdit && <FaMinus onClick={()=>handleDecrementQuantity(item)}/>}
                {item.Quantity}
                {isEdit && <FaPlus onClick={()=>handleIncrementQuantity(item)}/>}
              </div>
            </td>

            <td className="text-right">Rs. {priceCalculator(item.Price, item.Subtotal, item.Quantity, 1)}</td>
            {isEdit && <td onClick={()=>handleRemoveItem(item)} className="text-right text-red-500 cursor-pointer">Remove</td>}
          </tr>
        ))}
        <tr className="text-gray-200 mt-2 border-t border-b border-t-gray-500 border-b-gray-500">
          <th>Total</th>
          <td></td>
          <td className="text-right">Rs. {returnTotalPrice(items)}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default OrderTable;