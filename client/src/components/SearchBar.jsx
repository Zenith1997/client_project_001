import React, {useState} from "react";
import { setFilteredProducts } from '../store/filteredProductSlice';
import { setFilteredOrdersforSearch, setFilteredOrders } from "../store/filteredOrdersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import { setFilteredSliders } from "../store/filteredSliderSlice";

const SearchBar = () => {
    const { products } = useSelector((state) => state.products);
    const {orders} = useSelector((state) => state.orders);
    const {sliders} = useSelector((state) => state.slider);
    const dispatch = useDispatch();
    const location = useLocation();

    const handleSearch = (e) => {

        switch (location.pathname) {
            case "/":
            case "/admin/products":

                if (e.target.value === null || e.target.value === '') {
                    dispatch(setFilteredProducts([...products]));

                } else {
                    const filteredProducts = products.filter((item) =>
                        item.Name.toLowerCase().includes(e.target.value.toLowerCase())
                    );
                    dispatch(setFilteredProducts([...filteredProducts]));
                }

                break;
            case "/admin/slider":

                if (e.target.value === null || e.target.value === '') {
                    dispatch(setFilteredSliders(sliders));

                } else {
                    const filteredSlidersNew = sliders.filter((item) =>
                        item.Title.toLowerCase().includes(e.target.value.toLowerCase())
                    );
                    dispatch(setFilteredSliders(filteredSlidersNew));
                }



                break;
            case "/admin/orders":


                if (e.target.value === null || e.target.value === '') {
                    dispatch(setFilteredOrders(orders));

                } else {
                    const filteredOrders = orders.orders.filter((item) =>
                        item.UserName.toLowerCase().includes(e.target.value.toLowerCase())
                    );
                    dispatch(setFilteredOrdersforSearch(filteredOrders));
                }

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