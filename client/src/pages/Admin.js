import React, { useState } from "react";
import Header from "../components/Header";
import { Route, Routes } from "react-router-dom";
import Orders from "./Orders";
import Products from "./Products";
import Slider from "./Slider";
import Settings from "./Settings";

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin"));

  // check if user is admin
  if (!isAdmin) {
    window.location.href = "/login";

    return (
      <div className="w-full bg-gray-800 min-h-screen">
        <Header />
        <div className="container mx-auto mt-3 px-2">
          <h1 className="text-3xl text-center text-white">
            You are not authorized to view this page.
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-800 min-h-screen">
      <Header />
      <div className="container mx-auto mt-20 py-4 px-2">
        <Routes>
          <Route path={"/"} element={<Orders />} />
          <Route path={"/orders"} element={<Orders />} />
          <Route path={"/products"} element={<Products />} />
          <Route path={"/slider"} element={<Slider />} />
            <Route path={"/settings"} element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
