
import React, { useEffect, useState } from "react";
import { BsCartFill } from "react-icons/bs";
import { IoMdExit } from "react-icons/io";
import {NavLink, useLocation} from "react-router-dom";
import { FaBars } from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import logo from "../assets/janajaya.png";
import logoWhite from "../assets/janajayaWhite.png";
import phone from "../assets/phone.png";
import { setFilteredProducts } from '../store/filteredProductSlice';
import {FcSearch} from "react-icons/fc";
import {FcCancel} from "react-icons/fc";

import googleTranslateElementInit from "./googleTranslateElementInit";

const Header = ({ setViewCart }) => {



        const [isAdmin, setIsAdmin] = useState("");
        const [userName, setUserName] = useState("");
        const [viewMenu, setViewMenu] = useState(false);
        const [searchTerm, setSearchTerm] = useState('');
        const [imageVisible, setImageVisible] = useState(true);
        const { filteredProducts } = useSelector(state => state.filteredProducts);
        const { products } = useSelector((state) => state.products);
        const { totalItems } = useSelector(state => state.cart);
        const dispatch = useDispatch();
        const location = useLocation();


  useEffect(() => {
    setIsAdmin(localStorage.getItem("isAdmin"));
    setUserName(localStorage.getItem("userName"));
  }, [isAdmin, userName]);
    const handleSearch = () => {
        if (searchTerm === null || searchTerm.length <= 2) {
            dispatch(setFilteredProducts([...products]));
        } else {
            const filteredItemsNew = products.filter((item) =>
                item.Name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            dispatch(setFilteredProducts([...filteredItemsNew]));
        }
    };


    const clearSearchTerm = () => {
        setSearchTerm('null');
    };
  const handleLogout = async () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("isAdmin");
    window.location.href = "/login";
  };
    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    }
  const isMobileView = window.innerWidth <= 600;

  return (
    <div  className=" w-full bg-gray-900 shadow-lg opacity-90 sticky top-0 z-10 ">



        {/*isAdmin  (*/}
        {/*  <div className="relative">*/}
        {/*    <div*/}
        {/*      onClick={() => setViewMenu(!viewMenu)}*/}
        {/*      className="text-white px-4 capitalize font-semibold hover:text-gray-300 cursor-pointer flex items-center gap-2"*/}
        {/*    >*/}
        {/*      {userName} <FaBars />*/}
        {/*    </div>*/}
        {/*    {viewMenu && (*/}
        {/*      <div className="absolute top-10 right-0 bg-gray-800 w-32 py-2 rounded shadow-lg">*/}
        {/*        <div className="flex flex-col items-end gap-2 pr-6">*/}
        {/*          <NavLink*/}
        {/*            className={({ isActive, isPending }) =>*/}
        {/*              isPending*/}
        {/*                ? "text-white"*/}
        {/*                : isActive*/}
        {/*                ? "text-gray-400"*/}
        {/*                : "text-white"*/}
        {/*            }*/}
        {/*            to="/admin/orders"*/}
        {/*            onClick={() => setViewMenu(false)}*/}
        {/*          >*/}
        {/*            Orders*/}
        {/*          </NavLink>*/}
        {/*          <NavLink*/}
        {/*            className={({ isActive, isPending }) =>*/}
        {/*              isPending*/}
        {/*                ? "text-white"*/}
        {/*                : isActive*/}
        {/*                ? "text-gray-400"*/}
        {/*                : "text-white"*/}
        {/*            }*/}
        {/*            to="/admin/products"*/}
        {/*            onClick={() => setViewMenu(false)}*/}
        {/*          >*/}
        {/*            Products*/}
        {/*          </NavLink>*/}
        {/*          <NavLink*/}
        {/*            className={({ isActive, isPending }) =>*/}
        {/*              isPending*/}
        {/*                ? "text-white"*/}
        {/*                : isActive*/}
        {/*                ? "text-gray-400"*/}
        {/*                : "text-white"*/}
        {/*            }*/}
        {/*            to="/admin/slider"*/}
        {/*            onClick={() => setViewMenu(false)}*/}
        {/*          >*/}
        {/*            Slider*/}
        {/*          </NavLink>*/}
        {/*          <button*/}
        {/*            className="relative text-white cursor-pointer flex items-center gap-2 mb-2"*/}
        {/*            onClick={() => handleLogout()}*/}
        {/*          >*/}
        {/*            LogOut <IoMdExit className="text-white text-lg" />*/}
        {/*          </button>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    )}*/}
        {/*  </div>*/}



              {isMobileView ? (

                    <><div className='flex justify-between items-center'>

                        <div className=" flex rounded-lg w-40 h-20  mt-8 hover:bg-gray-800">
                            <a href="/" className="text-xl font-bold text-white ">
                                <img src={logoWhite} alt="Janajaya" className="" />
                            </a>

                        </div>

                        <div className="flex "   style={{
                            position: 'relative',
                            top: '30%',
                            left:"15%"

                        }}>
                            <form className="flex items-center" onSubmit={handleSearch}>

                                <input
                                    style={{width:"140px",position:"relative",right:"50px",top:"10px"}}
                                    type="text"
                                    placeholder=""
                                    onChange={handleChange}
                                    onKeyDown={handleSearch}
                                    value={searchTerm}
                                    className="border border-gray-300 pl-6  mt-1 opacity-.5  text-white rounded-lg bg-transparent  px-8 py-1 ml-2 focus:outline-none focus:ring-2 focus:ring-white"
                                />
                                { !searchTerm&&<FcSearch style={{
                                    position: 'relative',
                                    right: '100%',
                                    top: '50%',
                                    transform: 'translateY(-50%)'
                                }}/>}
                                {searchTerm && (
                                    <p
                                        className="absolute  font-light  transform -translate-y-1/2 focus:outline-none text-white px-3 py-0.5 rounded-lg"
                                        style={{ position: 'relative', left: '-20%', top: '65%', transform: 'translateY(-50%)' ,width:'100px'}}
                                        onClick={clearSearchTerm}
                                    >
                                        Clear
                                    </p>

                                )}
                            </form>
                        </div>
                        <div
                            className="flex w-14 h-12 rounded-lg bg-gray-900 hover:bg-gray-800 cursor-pointer grid place-items-center"
                            onClick={() => setViewCart(true)}
                        >
                            <button className="relative">
                  <span className="absolute top-[-5px] right-[-5px] h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                                <BsCartFill className="text-white text-xl cursor-pointer" />
                            </button>
                        </div>



                    </div>



                </>
              ) : (


                <><div className='flex justify-between items-center'>

                    <div className=" flex rounded-lg w-40 h-20 hover:bg-gray-800">
                        <a href="/" className="text-xl font-bold text-white ">
                            <img src={logoWhite} alt="Janajaya" className="w-50" />
                        </a>

                    </div>

                    <div className="flex">
                        <form className="flex items-center" onSubmit={handleSearch}>

                            <input

                                type="text"
                                placeholder=""
                                onChange={handleChange}
                                onKeyDown={handleSearch}
                                value={searchTerm}
                                className="border border-gray-300 pl-16  mt-1 opacity-.5  text-white rounded-lg bg-transparent  px-28 py-1 ml-2 focus:outline-none focus:ring-2 focus:ring-white"
                            />
                            { !searchTerm&&<FcSearch style={{
                                position: 'relative',
                                right: '90%',
                                top: '35%',
                                transform: 'translateY(-50%)'
                            }}/>}
                            {searchTerm && (
                                <button
                                    className="absolute  font-light  transform -translate-y-1/2 focus:outline-none bg-red-500 text-white px-3 py-0.5 rounded-lg"
                                    style={{ position: 'relative', right: '22%', top: '45%', transform: 'translateY(-50%)' ,width:'100px'}}
                                    onClick={clearSearchTerm}
                                >
                                    Clear
                                </button>

                            )}
                        </form>
                    </div>
                    {!isAdmin?(   <div className="flex">
                        <div className="flex w-14 h-14 rounded-lg bg-gray-900 hover:bg-gray-800 cursor-pointer grid place-items-center">

                            <a
                                href="https://wa.me/+94711076474"
                                target="_blank"
                                className="text-xl font-bold text-white flex justify-end"
                            >
                                <img
                                    src="https://tochat.be/whatsapp-icon-white.png"
                                    alt="Contact us"

                                    className="w-7 "
                                />
                            </a>
                        </div>
                        <div className="flex w-14 h-14 rounded-lg bg-gray-900 hover:bg-gray-800 cursor-pointer grid place-items-center">
                            <a
                                href="tel:+94711076474"
                                target="_blank"
                                className="text-xl font-bold text-white flex justify-end"
                            >
                                <img src={phone} alt="Contact us" className="w-7 " />
                            </a>
                        </div>
                        <div
                            className="flex w-14 h-14 rounded-lg bg-gray-900 hover:bg-gray-800 cursor-pointer grid place-items-center"
                            onClick={() => setViewCart(true)}
                        >
                            <button className="relative">
                  <span className="absolute top-[-5px] right-[-5px] h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                                <BsCartFill className="text-white text-xl cursor-pointer" />
                            </button>
                        </div>
                    </div>):(  <div className="relative">
                        <div
                            onClick={() => setViewMenu(!viewMenu)}
                            className="text-white px-4 capitalize font-semibold hover:text-gray-300 cursor-pointer flex items-center gap-2"
                        >
                            {userName} <FaBars />
                        </div>
                        {viewMenu && (
                            <div className="absolute top-10 right-0 bg-gray-800 w-32 py-2 rounded shadow-lg">
                                <div className="flex flex-col items-end gap-2 pr-6">
                                    <NavLink
                                        className={({ isActive, isPending }) =>
                                            isPending
                                                ? "text-white"
                                                : isActive
                                                    ? "text-gray-400"
                                                    : "text-white"
                                        }
                                        to="/admin/orders"
                                        onClick={() => setViewMenu(false)}
                                    >
                                        Orders
                                    </NavLink>
                                    <NavLink
                                        className={({ isActive, isPending }) =>
                                            isPending
                                                ? "text-white"
                                                : isActive
                                                    ? "text-gray-400"
                                                    : "text-white"
                                        }
                                        to="/admin/products"
                                        onClick={() => setViewMenu(false)}
                                    >
                                        Products
                                    </NavLink>
                                    <NavLink
                                        className={({ isActive, isPending }) =>
                                            isPending
                                                ? "text-white"
                                                : isActive
                                                    ? "text-gray-400"
                                                    : "text-white"
                                        }
                                        to="/admin/slider"
                                        onClick={() => setViewMenu(false)}
                                    >
                                        Slider
                                    </NavLink>
                                    <button
                                        className="relative text-white cursor-pointer flex items-center gap-2 mb-2"
                                        onClick={() => handleLogout()}
                                    >
                                        LogOut <IoMdExit className="text-white text-lg" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>)}



                </div>

                </>
              )}








    </div>);
};

export default Header;
