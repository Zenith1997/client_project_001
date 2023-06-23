import {createSlice} from "@reduxjs/toolkit";
import {priceCalculator} from "../utility/index";
import toast from "react-hot-toast";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        total: 0,
        subTotal: 0,
        totalItems: 0,
    },

    reducers: {

        addToCart: (state, action) => {
            const {product, quantity} = action.payload;

            const productInCart = state.cart.find(item => item.ProductID === product.ProductID);

            if (productInCart) {
                // Check if the product has a max limit
                if (product.MaxLimit !== null && productInCart.quantity + quantity > product.MaxLimit) {
                    toast.error('Maximum purchase quantity reached.');
                    return;
                }
                toast.success('Product added to cart.');
                const prevQuantity = productInCart.quantity;
                productInCart.quantity += quantity;
                state.totalItems += quantity;
                state.total += productInCart.RetailPrice * quantity;

                // Subtract the previous subtotal for the updated quantity
                state.subTotal -= priceCalculator(productInCart.RetailPrice, productInCart.WholesalePrice, prevQuantity, productInCart.WholesaleQty);
                // Add the new subtotal for the updated quantity
                state.subTotal += priceCalculator(productInCart.RetailPrice, productInCart.WholesalePrice, productInCart.quantity, productInCart.WholesaleQty);
            } else {
                toast.success('Product added to cart.');
                state.cart.push({...product, quantity});
                state.totalItems += quantity;
                state.total += product.RetailPrice * quantity;
                state.subTotal += priceCalculator(product.RetailPrice, product.WholesalePrice, quantity, product.WholesaleQty);
            }
        },

        // addToCart(state, action) {
        //     const { product, quantity } = action.payload;
        //
        //     // Check if the product has a max limit
        //     if (product.MaxLimit !== undefined && quantity > product.MaxLimit) {
        //         console.log('Quantity exceeds the max limit.');
        //         return;
        //     }
        //
        //     // Check if the product already exists in the cart
        //     const existingProduct = state.products.find((p) => p.id === product.id);
        //     if (existingProduct) {
        //         // Calculate the new quantity and apply the max limit if necessary
        //         const newQuantity = existingProduct.quantity + quantity;
        //         existingProduct.quantity = product.maxLimit !== undefined ? Math.min(newQuantity, product.maxLimit) : newQuantity;
        //     } else {
        //         // Add the product to the cart
        //         const newProduct = {
        //             ...product,
        //             quantity: product.maxLimit !== undefined ? Math.min(quantity, product.maxLimit) : quantity,
        //         };
        //         state.products.push(newProduct);
        //     }
        // },


        removeFromCart: (state, action) => {
            const {ProductID} = action.payload;
            const productInCart = state.cart.find(item => item.ProductID === ProductID);
            if (productInCart) {
                state.totalItems -= productInCart.quantity;
                state.total -= productInCart.RetailPrice * productInCart.quantity;
                state.subTotal -= productInCart.RetailPrice * productInCart.quantity;
                state.cart = state.cart.filter(item => item.ProductID !== ProductID);
            }
        },


        clearCart: (state) => {
            state.cart = [];
            state.total = 0;
            state.subTotal = 0;
            state.totalItems = 0;
        },


        updateCart: (state, action) => {
            const {product, quantity} = action.payload;
            const productInCart = state.cart.find(item => item.ProductID === product.ProductID);

            if (productInCart) {
                state.totalItems -= productInCart.quantity;
                state.total -= productInCart.RetailPrice * productInCart.quantity;
                state.subTotal -= priceCalculator(productInCart.RetailPrice, productInCart.WholesalePrice, productInCart.quantity, productInCart.WholesaleQty);

                productInCart.quantity = quantity;

                state.totalItems += quantity;
                state.total += productInCart.RetailPrice * quantity;
                state.subTotal += priceCalculator(productInCart.RetailPrice, productInCart.WholesalePrice, quantity, productInCart.WholesaleQty);
            } else {
                state.cart.push({...product, quantity});

                state.totalItems += quantity;
                state.total += product.RetailPrice * quantity;
                state.subTotal += priceCalculator(product.RetailPrice, product.WholesalePrice, quantity, product.WholesaleQty);
            }
        }


    }
});

export const {addToCart, removeFromCart, clearCart, updateCart, deleteFromCart} = cartSlice.actions;
export const CartSlice = cartSlice.reducer;