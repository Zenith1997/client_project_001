import React, {useEffect, useRef} from 'react';
import {FaMinus, FaPlus, FaTimes, FaTrash} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {clearCart, removeFromCart, updateCart} from "../store/cartSlice";
import toast from "react-hot-toast";
import {priceCalculator} from "../utility";

const Cart = ({setViewCart, viewCart, setShowForm}) => {
    const dispatch = useDispatch();
    const {cart, total, subTotal} = useSelector(state => state.cart);


    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset';
        }
    })

    function handleDecrementQuantity(item) {
        if (item.quantity > 1) {
            dispatch(updateCart({product: item, quantity: item.quantity - 1}));
        }
    }

    function handleIncrementQuantity(item) {
        if (item.quantity < item.MaxLimit || !item.MaxLimit) {
            dispatch(updateCart({product: item, quantity: item.quantity + 1}));
        } else {
            toast.error(`Maximum purchase quantity reached`)
        }
    }

    function handleRemoveFromCart(item) {
        dispatch(removeFromCart(item));
        toast.success(`${item.Name} removed from cart`);
    }


    function handleCheckout() {
        setShowForm(true);
        setViewCart(false);
    }

    function handleClearCart() {
        dispatch(clearCart());
        setViewCart(false);
    }

    let menuRef = useRef();

    useEffect(() => {
        let handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setViewCart(false);
                console.log(menuRef.current);
            }
        };

        document.addEventListener("mousedown", handler);


        return () => {
            document.removeEventListener("mousedown", handler);
        }

    });


    return (
        <div className="bg-gray-900 fixed top-0 right-0 h-full w-72 p-4 text-gray-300 z-50" ref={menuRef}>
            <div className="flex justify-between items-center pb-4">
                <h2 className="text-xl font-bold text-gray-300">Cart</h2>
                <h2
                    className="text-white cursor-pointer"
                    onClick={() => setViewCart(false)}
                >
                    <FaTimes/>
                </h2>
            </div>

            <div className="flex flex-col justify-between w-full h-[95%] ">
                <div
                    className="h-full overflow-y-auto"
                >
                    {cart?.map((item) => (
                        <div key={item.ProductID} className="flex justify-start items-center mb-2 w-full">
                            <div className=" w-12 h-12 bg-gray-800 rounded-full flex justify-center items-center mr-2">
                                <img
                                    src={`${process.env.REACT_APP_BASE_URL}/assets/${item.Image}`}
                                    alt="product"
                                    className="w-10 h-10 object-cover"
                                />
                            </div>
                            <div className="flex flex-col w-full">
                                <div className="flex flex-col justify-center">
                                    <h5 className="text-[15px] capitalize">{item?.Name?.slice(0, 50)}</h5>
                                </div>
                                <div className="w-full flex flex-row justify-between items-center">
                                    <h5 className="text-sm capitalize">Rs. {(priceCalculator(item?.RetailPrice, item?.WholesalePrice, item.quantity, item.WholesaleQty) / item.quantity).toFixed(2)}</h5>
                                    <div
                                        className="flex items-center gap-3"
                                    >
                                        <span
                                            className="p-1 text-[10px] bg-gray-800 rounded-full cursor-pointer"
                                            onClick={() => handleDecrementQuantity(item)}
                                        >
                                            <FaMinus/>
                                        </span>
                                        <span className="text-sm">{item.quantity}</span>
                                        <span
                                            className="p-1 text-[10px] bg-gray-800 rounded-full cursor-pointer"
                                            onClick={() => handleIncrementQuantity(item)}
                                        >
                                            <FaPlus/>
                                        </span>
                                    </div>
                                    <div
                                        className="text-[12px] text-gray-400 cursor-pointer text-red-600"
                                        onClick={() => handleRemoveFromCart(item)}
                                    >
                                        <FaTrash/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="f">
                    <div
                        className="flex justify-between border-amber-50 border-b border-t border-double pt-1 pb-1 bottom-5 px-2">
                        <p className="font-bold">Sub Total:</p>
                        <p>Rs. {subTotal.toFixed(2)}</p>
                    </div>

                    <button
                        className="bg-gray-800 hover:bg-gray-700 duration-150 text-white hover:text-gray-300 py-2 px-4 mt-2 w-full rounded mb-2"
                        onClick={handleCheckout}
                    >
                        Checkout
                    </button>
                    <button
                        className="bg-gray-800 hover:bg-gray-700 duration-150 text-white hover:text-gray-300 py-2 px-4 w-full rounded mb-3"
                        onClick={() => handleClearCart()}
                    >
                        Clear Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
