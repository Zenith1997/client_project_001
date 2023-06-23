import React, {useEffect, useState} from 'react';
import {FaTimes} from 'react-icons/fa';
import Input from './Input';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {clearCart} from "../store/cartSlice";
import toast from "react-hot-toast";

const initialFormData = {
    name: '',
    contactNumber: '',
    address: '',
    email: '',
    note: ''
}

const ShippingData = ({onClose}) => {
    const dispatch = useDispatch();
    const {cart, total, subTotal} = useSelector(state => state.cart);

    const [formData, setFormData] = useState(initialFormData);
    const {name, contactNumber, address, email, note} = formData;

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    function handleChange(e) {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const order = {
            name,
            contactNumber,
            address,
            email,
            total,
            subTotal,
            note,
            items: cart
        }

        console.log(order)

        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/orders/create`, order);
            dispatch(clearCart());
            toast.success(response.data.message);
            onClose();
        } catch (error) {

            toast.error("Something went wrong while placing your order. Please try again later.");
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4 z-50">
            <div className="bg-gray-900 shadow-lg shadow-gray-800 rounded-lg text-white border p-2 md:p-4 max-w-3xl">
                <div className="w-full">
                    <FaTimes className="float-right text-2xl cursor-pointer" onClick={onClose}/>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <Input
                            label="Name"
                            name="name"
                            type="text"
                            placeholder="Enter your name"
                            required={true}
                            value={formData.name}
                            onChange={handleChange}
                        />

                    </div>
                    <div className="w-full flex flex-col md:flex-row justify-between items-center gap-x-4">
                        <Input
                            label="Contact Number"
                            name="contactNumber"
                            type="tel"
                            placeholder="Enter your contact number"
                            required={true}
                            value={formData.contactNumber}
                            onChange={handleChange}
                        />

                        <Input
                            label="Email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            required={false}
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Input
                            label="Address"
                            name="address"
                            type="textarea"
                            placeholder="Enter your address"
                            required={true}
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Input
                            label="Note"
                            name="note"
                            type="textarea"
                            placeholder="Enter your note"
                            required={false}
                            value={formData.note}
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        className="bg-gray-800 hover:bg-gray-700 duration-150 text-white hover:text-gray-300 py-2 px-4 mt-2 w-full rounded mb-4"
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};


export default ShippingData;
