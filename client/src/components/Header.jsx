import React, { useEffect, useState } from 'react';
import { BsCartFill } from "react-icons/bs";
import { SiWhatsapp } from "react-icons/si"
import { IoMdExit } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useLocation, Link } from 'react-router-dom';
import { setFilteredProducts } from '../store/filteredProductSlice';
import { useDispatch, useSelector } from "react-redux";
import logo from '../assets/janajaya.png';
import logoWhite from '../assets/janajayaWhite.png';

const Header = ({ setViewCart }) => {
    const [isAdmin, setIsAdmin] = useState("");
    const [userName, setUserName] = useState("");
    const [viewMenu, setViewMenu] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const { filteredProducts } = useSelector(state => state.filteredProducts);
    const { products } = useSelector((state) => state.products);
    const { totalItems } = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        setIsAdmin(localStorage.getItem('isAdmin'));
        setUserName(localStorage.getItem('userName'));
    }, [isAdmin, userName]);

    const handleLogout = async () => {
        localStorage.removeItem('userName');
        localStorage.removeItem('isAdmin');
        window.location.href = '/login';
    }

    const handleSearch = () => {

        if(searchTerm === null || searchTerm.length <= 2){
            dispatch(setFilteredProducts([...products]));
        }

        const filteredItemsNew = products.filter((item) =>
            item.Name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        dispatch(setFilteredProducts([...filteredItemsNew]));

    }

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    }

    return (
        <div className="w-full bg-gray-900 shadow-lg sticky top-0 z-10">
            <div className="px-2 container mx-auto flex justify-between items-center py-2 z-10">
                <a href="/" className="text-xl font-bold text-white">
                    <img src={logoWhite} alt="Janajaya"
                        className="w-32"
                    />
                </a>
                {isAdmin ? (
                    <>
                        {location.pathname === "/admin/products" ? (
                            <form className="flex items-center" onSubmit={handleSearch}>
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    onChange={handleChange}
                                    onKeyDown={handleSearch}
                                    value={searchTerm}
                                    className="border border-gray-300 rounded-lg px-4 py-2 mr-2 focus:outline-none focus:ring focus:border-blue-500"
                                />
                            </form>
                        ): <></>}
                        <div className="relative">
                            <div
                                onClick={() => setViewMenu(!viewMenu)}
                                className="text-white px-4 capitalize font-semibold hover:text-gray-300 cursor-pointer flex items-center gap-2"
                            >
                                {userName} <FaBars />
                            </div>
                            {viewMenu && (
                                <div
                                    className="absolute top-10 right-0 bg-gray-800 w-32 py-2 rounded shadow-lg"
                                >
                                    <div className="flex flex-col items-end gap-2 pr-6">
                                        <NavLink
                                            className={({ isActive, isPending }) =>
                                                isPending ? "text-white" : isActive ? "text-gray-400" : "text-white"
                                            }
                                            to="/admin/orders"
                                            onClick={() => setViewMenu(false)}
                                        >
                                            Orders
                                        </NavLink>
                                        <NavLink
                                            className={({ isActive, isPending }) =>
                                                isPending ? "text-white" : isActive ? "text-gray-400" : "text-white"
                                            }
                                            to="/admin/products"
                                            onClick={() => setViewMenu(false)}
                                        >
                                            Products
                                        </NavLink>
                                        <NavLink
                                            className={({ isActive, isPending }) =>
                                                isPending ? "text-white" : isActive ? "text-gray-400" : "text-white"
                                            }
                                            to="/admin/slider"
                                            onClick={() => setViewMenu(false)}
                                        >
                                            Slider
                                        </NavLink>
                                        <button className="relative text-white cursor-pointer flex items-center gap-2 mb-2"
                                            onClick={() => handleLogout()}>
                                            LogOut <IoMdExit className="text-white text-lg" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>

                ) : (
                    <>
                        
                        <form className="flex items-center" onSubmit={handleSearch}>
                            <input
                                type="text"
                                placeholder="Search..."
                                onChange={handleChange}
                                onKeyDown={handleSearch}
                                value={searchTerm}
                                className="border border-gray-300 rounded-lg px-4 py-2 mr-2 focus:outline-none focus:ring focus:border-blue-500"
                            />
                        </form>
                        <div
                            className="flex items-center w-1 h-14 rounded-lg bg-gray-900 hover:bg-gray-800 cursor-pointer grid place-items-center"
                            onClick={() => setViewCart(true)}
                        >
                            <button className="relative">
                                <span
                                    className="absolute top-[-5px] right-[-5px] h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
                                >
                                    {totalItems}
                                </span>
                                <BsCartFill
                                    className="text-white text-xl cursor-pointer"

                                />
                            </button>
                            <div className='absolute top-[33px] right-[100px] flex items-center justify-center'><Link to= {"/contact"} className="text-white text-3xl hover:text-gray-400"><SiWhatsapp /></Link></div>
                        </div>
                        
                        
                    </>
                )}
            </div>
        </div>
    )
}

export default Header;
