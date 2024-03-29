import {combineReducers, configureStore} from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import {CartSlice} from "./cartSlice";
import {ProductReducer} from "./productSlice";
import {OrderSlice} from "./orderSlice";
import SliderSlice from "./sliderSlice";

const RootReducer = combineReducers({
    products: ProductReducer,
    cart: CartSlice,
    orders: OrderSlice,
    slider: SliderSlice,
});

const store = configureStore({
    reducer: RootReducer,
    middleware: [thunkMiddleware],
    devTools: process.env.NODE_ENV !== "production",
});

export default store;
