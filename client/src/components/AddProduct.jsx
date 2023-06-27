import React, {useEffect, useRef, useState} from 'react';
import {FaTimes} from 'react-icons/fa';
import Input from './Input';
import axios from 'axios';
const MAX_COUNT = 5;
const initialProductsData = {
    name: '',
    retailPrice: '',
    wholesalePrice: '',
    desc: '',
    quantity: '',
    unit: '',
    maxLimit: '',
    priority: ''
};

const AddProduct = ({setAddProduct, actionType, selectedProduct}) => {
    const [uploadedFiles, setUploadedFiles] = useState([])
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [fileLimit, setFileLimit] = useState(false);
    const [productsData, setProductsData] = useState(initialProductsData);

    const {name, desc, retailPrice, wholesalePrice, quantity, unit, maxLimit, priority} = productsData;
    const [file, setFile] = useState(null);

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    let menuRef = useRef();

    useEffect(() => {
        let handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setAddProduct(false);
            }
        };

        document.addEventListener("mousedown", handler);


        return () => {
            document.removeEventListener("mousedown", handler);
        }

    });

    useEffect(() => {
        if (actionType === 'edit' && selectedProduct !== null) {
            setProductsData({
                name: selectedProduct.Name,
                retailPrice: selectedProduct.RetailPrice,
                wholesalePrice: selectedProduct.WholesalePrice,
                desc: selectedProduct.Description,
                quantity: selectedProduct.WholesaleQty,
                unit: selectedProduct.Unit,
                maxLimit: selectedProduct.MaxLimit,
                priority: selectedProduct.priority
            });
        }
    }, [actionType, selectedProduct])

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset';
        };
    });

    function handleChange(e) {
        const {name, value} = e.target;
        setProductsData({
            ...productsData,
            [name]: value,
        });
    }

    function handleImageUpload(e) {
        setFile(e.target.files[0]);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (actionType === 'add') {

            const data = new FormData();
            data.append('name', name);
            data.append('retailPrice', retailPrice);
            data.append('wholesalePrice', wholesalePrice);
            data.append('desc', desc);
            //have to stringify a array object before appending to a string
            // data.append('imageFilesArray', JSON.stringify(uploadedFiles));
            selectedFiles.forEach((file) => {
                data.append('image', file);
            });



            data.append('quantity', quantity);
            data.append('unit', unit);
            data.append('maxLimit', maxLimit);
            data.append('priority', priority);


            await axios.post(`${process.env.REACT_APP_BASE_URL}/products/add`, data)
                .then(response => {
                    setSuccess(response.data);
                    console.log(response.data);
                    setTimeout(() => {
                        // Clear form fields
                        setProductsData(initialProductsData);
                        setFile(null);
                        // Close the AddProduct component
                        setAddProduct(false);
                    }, 1000);
                })
                .catch(error => {
                        console.error(error);
                        setError(error.response.data);
                    }
                );

        } else if (actionType === 'edit') {

            await axios.put(`${process.env.REACT_APP_BASE_URL}/products/edit/${selectedProduct.ProductID}`, productsData)
                .then(response => {
                    setSuccess(response.data);

                    setTimeout(() => {
                        // Clear form fields
                        setProductsData(initialProductsData);
                        setFile(null);
                        // Close the AddProduct component
                        setAddProduct(false);
                    }, 1000);
                })
                .catch(error => {
                        console.error(error);
                        setError(error.response.data);
                    }
                );

        }
    }

    const handleFileSelect = (event) => {
        const files = Array.from(event.target.files);
        const updatedSelectedFiles = [...selectedFiles, ...files];
        setSelectedFiles(updatedSelectedFiles);
    };
    return (
        <div className="fixed max-h-screen inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
            <div
                className="max-h-[85vh] bg-gray-900 mt-5 overflow-y-auto shadow-lg shadow-gray-800 rounded-lg text-white border p-2 md:p-4 max-w-3xl"
                ref={menuRef}
            >
                <div className="w-full">
                    <FaTimes
                        className="float-right text-2xl cursor-pointer"
                        onClick={() => setAddProduct(false)}
                    />
                </div>
                <form onSubmit={handleSubmit} encType='multipart/form-data'>
                    <div>
                        <Input
                            label="Name"
                            name="name"
                            type="text"
                            placeholder="Product name"
                            required={true}
                            value={name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-full flex flex-col md:flex-row justify-between items-center gap-x-4">
                        <Input
                            label="Retail Price"
                            name="retailPrice"
                            type="number"
                            placeholder="Retail price"
                            required={true}
                            value={retailPrice}
                            onChange={handleChange}
                        />
                        <Input
                            label="Wholesale Price"
                            name="wholesalePrice"
                            type="number"
                            placeholder="Wholesale price"
                            required={true}
                            value={wholesalePrice}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-full flex flex-col md:flex-row justify-between items-center gap-x-4">
                        <Input
                            label="Wholesale Quantity"
                            name="quantity"
                            type="number"
                            placeholder="Wholesale Quantity"
                            required={true}
                            value={quantity}
                            onChange={handleChange}
                        />
                        <Input
                            label="Unit"
                            name="unit"
                            type="text"
                            placeholder="Unit"
                            required={true}
                            value={unit}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Input
                            label="Max Limit (Optional)"
                            name="maxLimit"
                            type="number"
                            placeholder="Max limit of product user can buy"
                            required={false}
                            value={maxLimit}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Input
                            label="Priority Number (Optional)"
                            name="priority"
                            type="number"
                            placeholder="Priority of this product"
                            required={false}
                            value={priority}
                            onChange={handleChange}
                        />
                    </div>

                    {actionType === 'add' && (
                        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-x-4">
                            <input
                                name="image"
                                type="file"
                                className={`w-full bg-gray-800 hover:bg-gray-700 duration-150 text-white hover:text-gray-300 py-2 px-4 mt-2 rounded mb-4`}
                                placeholder="Enter your image"
                                onChange={handleFileSelect}
                                multiple

                            />
                        </div>)}
                    <div>
                        {/*<Input*/}
                        {/*    label="Video upload"*/}
                        {/*    name="link"*/}
                        {/*    type="text"*/}
                        {/*    placeholder="Enter video url"*/}
                        {/*    required={false}*/}
                        {/*    value={link}*/}
                        {/*    onChange={handleChange}*/}
                        {/*/>*/}
                    </div>
                    <div>
                        <Input
                            label="Description"
                            name="desc"
                            type="textarea"
                            placeholder="Enter Product description"
                            required={true}
                            value={desc}
                            onChange={handleChange}
                        />
                    </div>
                    {error && (
                        <div className="bg-red-500 text-white p-2 rounded mb-4">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="bg-green-500 text-white p-2 rounded mb-4">
                            {success}
                        </div>
                    )}
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

export default AddProduct;
