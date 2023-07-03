import React, {useState} from "react";
import { setFilteredProducts } from '../store/filteredProductSlice';
import { setFilteredOrdersforSearch } from "../store/filteredOrdersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
    const { products } = useSelector((state) => state.products);
    const {orders} = useSelector((state) => state.orders);
    const dispatch = useDispatch();
    const location = useLocation();

    const handleSearch = (e) => {

        if (e.target.value === null || e.target.value === '') {
            dispatch(setFilteredProducts([...products]));
            dispatch(setFilteredOrdersforSearch(orders));
        }

        switch (location.pathname) {
            case "/":
            case "/admin/products":
                const filteredProducts = products.filter((item) =>
                    item.Name.toLowerCase().includes(e.target.value.toLowerCase())
                );
                dispatch(setFilteredProducts([...filteredProducts]))
                break;
            case "/admin/sliders":
                break;
            case "/admin/orders":
                const filteredOrders = orders.orders.filter((item) =>
                    item.UserName.toLowerCase().includes(e.target.value.toLowerCase())
                );
                dispatch(setFilteredOrdersforSearch(filteredOrders));
                break;
        }
        

    }


    return (
        <form className="flex items-center" onSubmit={handleSearch}>
            <input
                type="text"
                placeholder="Search..."
                onChange={handleSearch}
                className="border border-gray-300 rounded-lg px-4 py-2 mr-2 focus:outline-none focus:ring focus:border-blue-500"
            />
        </form>
    );
}

export default SearchBar;