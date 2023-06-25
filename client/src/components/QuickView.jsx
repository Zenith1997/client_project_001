import React, {useEffect, useRef, useState} from 'react';
import {FaMinus, FaPlus, FaTimes} from "react-icons/fa";
import {useDispatch} from "react-redux";
import {addToCart} from "../store/cartSlice";
import {priceCalculator} from "../utility";
import toast from "react-hot-toast";

const QuickView = ({onClose, selectedProduct}) => {
    const [quantity, setQuantity] = useState(1);
    const product = selectedProduct;
    const dispatch = useDispatch();

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [])

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

    function handleAddToCart() {
        dispatch(addToCart({product, quantity}));
        onClose();
    }

    let menuRef = useRef();

    useEffect(() => {
        let handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                onClose();
                console.log(menuRef.current);
            }
        };

        document.addEventListener("mousedown", handler);


        return () => {
            document.removeEventListener("mousedown", handler);
        }

    });

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4 z-50">
            <div
                ref={menuRef}
                //bg-white bg-opacity-20 rounded-lg p-4 shadow-lg backdrop-filter backdrop-blur-lg
                className="bg-white bg-opacity-10 min-w-[300px] shadow-gray-800 shadow-lg rounded-lg text-white border border-gray-600 p-2 backdrop-filter backdrop-blur-lg md:min-w-[600px] md:p-4 max-w-3xl">
                <div className="w-full">
                    <FaTimes className="float-right text-2xl cursor-pointer" onClick={onClose}/>
                </div>
                <div className="w-full flex flex-col md:flex-row justify-between items-center">
                    <img
                        src={`${process.env.REACT_APP_BASE_URL}/assets/${product?.Image}`}
                        alt="product" className="w-44 h-44 mx-auto "/>
                    <div
                        className="flex flex-col justify-center w-full md:w-1/2 md:justify-start items-center md:items-start">
                        <h2 className="text-xl font-bold mb-4">{product?.Name}</h2>
                        <p className="text-gray-400">{product?.Description}</p>
                        <div className="flex flex-col items-center gap-1 md:flex-row md:gap-4 text-white mt-2">
                            <b className="text-gray-300">Price: Rs. {
                                (priceCalculator(product?.RetailPrice, product?.WholesalePrice, quantity, product?.WholesaleQty) / quantity).toFixed(2)
                            }</b>
                            {/*<b className="text-gray-300">Unit Price: Rs. {product?.WholesalePrice}</b>*/}
                        </div>
                        <div className="flex items-center  mt-2">
                            <h2 className="font-semibold text-[15px]">Quantity:</h2>

                            <div className="flex items-center gap-3 ml-2">
                                <span
                                    className="p-2 text-[10px] bg-gray-800 rounded-full cursor-pointer"
                                    onClick={handleDecrementQuantity}
                                >
                                    <FaMinus/>
                                </span>
                                <span className="text-lg">
                                    {quantity} {product.Unit}
                                </span>
                                <span
                                    className="p-2 text-[10px] bg-gray-800 rounded-full cursor-pointer"
                                    onClick={handleIncrementQuantity}
                                >
                                    <FaPlus/>
                                </span>

                            </div>
                        </div>

                        {/*<div className="flex items-center gap-2 mt-1">*/}
                        {/*    <h2 className="font-semibold text-[14px]">Per {product.Unit}:</h2>*/}
                        {/*    <h2 className="text-[16] text-gray-400">Rs. {*/}
                        {/*        priceCalculator(product?.RetailPrice, product?.WholesalePrice, quantity) / quantity*/}
                        {/*    }</h2>*/}
                        {/*</div>*/}

                        {quantity >= 1 && (
                            <div className="flex items-center gap-2">
                                <h2 className="font-semibold text-[14px]">Discounted Price:</h2>
                                <h2 className={`text-[17]`}>Rs. {
                                    (priceCalculator(product?.RetailPrice, product?.WholesalePrice, quantity, product?.WholesaleQty)).toFixed(2)
                                }</h2>
                            </div>
                        )}

                        <button className="outer-button"
                                onClick={handleAddToCart}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuickView;
