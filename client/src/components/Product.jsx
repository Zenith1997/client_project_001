import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import toast from "react-hot-toast";
import { FaMinus, FaPlus } from "react-icons/fa";
import { priceCalculator } from "../utility";
import "./ProductStyle.css";

const Product = ({ product, setSelectedProduct }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity: quantity }));
    // toast.success(`${product.Name} added to cart`);
  };

  function handleDecrementQuantity() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  function handleIncrementQuantity() {
    if (quantity < product.MaxLimit || !product.MaxLimit) {
      setQuantity(quantity + 1);
    } else {
      toast.error(`Maximum purchase quantity reached`);
    }
  }

  return (
    <div className="bg-gray-800 py-2 px-2 md:py-4 md:px-4 flex flex-col justify-center items-center border rounded-lg border-gray-600 bg-opacity-80 ">
      <div
        className="flex justify-center items-center w-32 min-h-[128px] md:w-32 md:h-32"
        onClick={() => setSelectedProduct(product)}
      >
        <img
          src={`${process.env.REACT_APP_BASE_URL}/assets/${product?.Image}`}
          alt="product"
          className="w-[100%] h-[100%] object-contain"
        />
      </div>
      <div className="pt-2 pb-1" onClick={() => setSelectedProduct(product)}>
        <h1 className="text-white text-[12px] md:text-[16px]  font-bold text-center">
          {product.Name}
        </h1>
        <div className="flex flex-col justify-between items-center">
          <div className="w-full flex justify-center items-center gap-2">
            {/*<span className="text-gray-400 text-[11px] md:text-sm">Price: </span>*/}
            <b className="text-white text-[12px] md:text-[16px]">
              Rs.{" "}
              {(
                priceCalculator(
                  product?.RetailPrice,
                  product?.WholesalePrice,
                  quantity,
                  product.WholesaleQty
                ) / quantity
              ).toFixed(2)}
            </b>
          </div>
          <p className="hidden sm:flex text-gray-400 text-[12px]">
            {product?.Description?.slice(0, 45)}...
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 ml-2 text-white">
        <span
          className="p-2 text-[10px] bg-gray-800 rounded-full cursor-pointer"
          onClick={handleDecrementQuantity}
        >
          <FaMinus />
        </span>
        <span className="text-lg">
          {quantity} {product.Unit}
        </span>
        <span
          className="p-2 text-[10px] bg-gray-800 rounded-full cursor-pointer"
          onClick={handleIncrementQuantity}
        >
          <FaPlus />
        </span>
      </div>
      <div className="flex justify-center items-center">
        <button
          className="outer-button"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
