import React, {useEffect, useState, useCallback} from 'react';
import {FaPlus} from 'react-icons/fa';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {setErrors, setProducts} from '../store/productSlice';
import Loader from '../components/Loader';
import {Pagination} from '@mui/material';
import AddProduct from '../components/AddProduct';
import toast from 'react-hot-toast';

const Products = () => {
    const dispatch = useDispatch();
    const {products, error, loading} = useSelector((state) => state.products);
    const [addProduct, setAddProduct] = useState(false);
    const [actionType, setActionType] = useState('');
    const [selectedProduct, setSelectedProduct] = useState();

    const deleteProduct = useCallback(
        async (id) => {
            await axios
                .delete(`${process.env.REACT_APP_BASE_URL}/products/${id}`)
                .then((res) => {
                    toast.success("Product deleted successfully!");
                    document.location.reload();
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        []
    );

    useEffect(() => {

        async function fetchProducts() {
            await axios
                .get(`${process.env.REACT_APP_BASE_URL}/products`)
                .then((res) => {
                    dispatch(setProducts(res.data));
                })
                .catch((err) => {
                    // dispatch(setErrors(err));
                });
        }

        fetchProducts();

    }, [deleteProduct, addProduct]);

    const handleAction = (type, product) => {
        setActionType(type);
        setSelectedProduct(product);
        setAddProduct(!addProduct);
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [productPerPage] = useState(6);

    const indexOfLastProduct = currentPage * productPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productPerPage;
    const currentProducts = products?.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (error)
        return (
            <div className="w-full h-[calc(100vh-100px)] flex justify-center items-center">
                <div className="text-gray-400 text-2xl">Something went wrong!</div>
            </div>
        );

    return (
        <div>
            <div className="flex justify-end">
                <button
                    className="bg-gray-700 hover:bg-gray-800 duration-150 text-white font-bold py-2 px-4 rounded text-right "
                    onClick={() => handleAction('add')}
                >
                    <FaPlus className="inline-block mr-2"/> Add New Product
                </button>
            </div>
            <div className="w-full mt-5">
                <div className="bg-gray-700 text-white font-bold py-2 px-4 rounded">Order List</div>
                <div className="bg-gray-700 text-white font-bold py-2 px-2 rounded mt-2">
                    <div className="w-full overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-800 text-white">
                            <tr>
                                <th scope="col" className="px-3 py-3 text-center">
                                    Name
                                </th>
                                <th scope="col" className="px-3 py-3 text-center">
                                    Retail Price
                                </th>
                                <th scope="col" className="px-3 py-3 text-center">
                                    Wholesale Price
                                </th>
                                <th scope="col" className="px-3 py-3 text-center">
                                    Quantity
                                </th>
                                <th scope="col" className="px-3 py-3 text-center">
                                    Description
                                </th>
                                <th scope="col" className="px-3 py-3 text-center">
                                    Edit
                                </th>
                                <th scope="col" className="px-3 py-3 text-center">
                                    Delete
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {currentProducts?.map((product) => (
                                <tr
                                    key={product.ProductID}
                                    className="bg-gray-700 text-white font-normal mb-0 hover:bg-gray-600 duration-150 text-sm"
                                >
                                    <td className="px-2 py-2">{product.Name}</td>
                                    <td className="px-2 py-2 text-center">{product.RetailPrice}</td>
                                    <td className="px-2 py-2 text-center">{product.WholesalePrice}</td>
                                    <td className="px-2 py-2 text-center">{product.Quantity}</td>
                                    <td className="px-2 py-2 text-left">{product.Description}</td>
                                    <td className="px-2 text-center">
                                        <button
                                            className="bg-gray-800 hover:bg-gray-700 duration-150 text-white hover:text-gray-300 text-sm py-1 px-3 w-full rounded my-1"
                                            onClick={() => handleAction('edit', product)}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                    <td className="px-2 text-center">
                                        <button
                                            className="bg-gray-800 hover:bg-gray-700 duration-150 text-white hover:text-gray-300 text-sm py-1 px-3 w-full rounded"
                                            onClick={() => deleteProduct(product.ProductID)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="w-full flex justify-center items-center my-2">
                        <Pagination
                            count={Math.ceil(products.length / productPerPage)}
                            page={currentPage}
                            onChange={(e, value) => paginate(value)}
                        />
                    </div>
                </div>
            </div>

            {loading && <Loader/>}

            {addProduct && (
                <AddProduct setAddProduct={setAddProduct} actionType={actionType} selectedProduct={selectedProduct}/>
            )}
        </div>
    );
};

export default Products;
