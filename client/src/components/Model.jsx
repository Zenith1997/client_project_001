import React from 'react';
import {FaTimes} from "react-icons/fa";

const Model = ({onClose, children}) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4 z-50">
            <div
                className="bg-gray-900 shadow-lg shadow-gray-800 rounded-lg text-white border p-2  md:p-4 max-w-3xl z-50">
                <div className="w-full mb-1 ">
                    <button
                        className="float-right text-2xl cursor-pointer"
                        onClick={onClose}
                    >
                        <FaTimes/>
                    </button>
                </div>
                <div
                    className="w-full overflow-y-auto max-h-full"
                >
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Model;
