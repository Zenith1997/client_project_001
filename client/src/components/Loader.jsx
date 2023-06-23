import React from 'react';
import {Rings, Triangle} from "react-loader-spinner";

const Loader = () => {
    return (
        <div
            className="fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-gray-900 bg-opacity-50 z-40"
        >
            <Rings color={"#f2f2f2"} height={60} width={60}/>
        </div>
    )
}

export default Loader;