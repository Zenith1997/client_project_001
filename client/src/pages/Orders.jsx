import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setErrors, setOrders } from "../store/orderSlice";
import { Pagination } from "@mui/material";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import Model from "../components/Model";
import { FaPrint, FaTimes } from "react-icons/fa";
import { setFilteredOrders } from "../store/filteredOrdersSlice";
import { FaEdit } from "react-icons/fa";
import OrderForm from "../components/OrderForm";

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, error, loading } = useSelector((state) => state.orders);
  const { filteredOrders } = useSelector((state) => state.filteredOrders);
  const filteredOrdersList = filteredOrders?.orders;
  const [modelType, setModelType] = useState("");
  const [isEditDisabled, setIsEditDisabled] = useState(true);
  const [showModel, setShowModel] = useState(false);
  const [status, setStatus] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [edit, setEdit] = useState(true);
  console.log(selectedOrder);

  const handleOpenModel = () => {
    setShowModel(true);
  };

  const handleCloseModel = () => {
    setShowModel(false);
  };

  const updateHandler = (id) => {
    setModelType("update");
    setSelectedOrder(id);
    handleOpenModel();
  };

  const viewHandler = (order) => {
    setModelType("view");
    setSelectedOrder(order);
    handleOpenModel();
  };

  const updateStatus = useCallback(
    async (id) => {
      try {
        await axios.put(`${process.env.REACT_APP_BASE_URL}/orders/${id}`, {
          status: status,
        });
        setStatus("");
        handleCloseModel();
        toast.success("Order status updated successfully!");
      } catch (err) {
        dispatch(setErrors(err));
      }
    },
    [status, dispatch]
  );

  useEffect(() => {
    const fetchOrders = async () => {
      await axios
        .get(`${process.env.REACT_APP_BASE_URL}/orders`)
        .then((res) => {
          dispatch(setOrders(res.data));
          dispatch(setFilteredOrders(res.data));
        })
        .catch((err) => {
          dispatch(setErrors(err));
        });
    };

    fetchOrders();
  }, [updateStatus]);

  const enableEdit = (event) => {
    event.preventDefault();
    setIsEditDisabled(!isEditDisabled);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSelectedOrder(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 6;

  // Get current orders
  const indexOfLastOrders = currentPage * ordersPerPage;
  const indexOfFirstOrders = indexOfLastOrders - ordersPerPage;
  const currentOrders = filteredOrdersList?.slice(
    indexOfFirstOrders,
    indexOfLastOrders
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (error) {
    return (
      <div className="w-full h-[calc(100vh-100px)] flex justify-center items-center">
        <div className="text-gray-400 text-2xl">Something went wrong!</div>
      </div>
    );
  }
  const CustomButton = ({ handleCloseModel, setEdit }) => {
    const handleClick = () => {
      handleCloseModel();
      setEdit(true);
    };

    return (
      <button
        className="flex items-center gap-3 bg-red-500 py-2 px-4 rounded ml-4"
        onClick={handleClick}
      >
        <FaTimes />
        Close
      </button>
    );
  };
  return (
    <div>
      {/* Order List */}
      <div className="w-full mt-5">
        <div className="bg-gray-700 text-white font-bold py-2 px-4 rounded">
          Order List
        </div>
        <div className="bg-gray-700 text-white font-bold py-2 px-2 rounded mt-2">
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th scope="col" className="px-3 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Phone
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Address
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Quantity
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Total
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Update
                  </th>
                  <th scope="col" className="px-3 py-3">
                    View/Edit
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentOrders?.map((order) => (
                  <tr
                    key={order.OrderID}
                    className="bg-gray-700 text-white font-normal mb-0 hover:bg-gray-600 duration-150 text-sm"
                  >
                    <td className="px-2">{order.OrderID}</td>
                    <td className="px-2">{order.UserName}</td>
                    <td className="px-2">{order.Email}</td>
                    <td className="px-2">{order.ContactNo}</td>
                    <td className="px-2">{order.ShippingAddress}</td>
                    <td className="px-2">
                      {order.items.map((item) => item.ProductName).join(", ")}
                    </td>
                    <td className="px-2">
                      {order.items.map((item) => item.Quantity).join(", ")}
                    </td>
                    <td className="px-2">
                      {order.items.map((item) => item.Price).join(", ")}
                    </td>
                    <td className="px-2 capitalize text-center">
                      {" "}
                      {order.TotalAmount}
                    </td>
                    {console.log(order.Status)}
                    <td className="px-2 capitalize text-center">
                      {order.Status === "pending" ? (
                        <span className="bg-yellow-500 text-white px-2 py-1 rounded-sm">
                          {order.Status}
                        </span>
                      ) : order.Status === "delivered" ? (
                        <span className="bg-green-500 text-white px-2 py-1 rounded-sm">
                          {order.Status}
                        </span>
                      ) : order.Status === "processing" ? (
                        <span className="bg-blue-500 text-white px-2 py-1 rounded-sm">
                          {order.Status}
                        </span>
                      ) : (
                        <span className="bg-red-500 text-white px-2 py-1 rounded-sm">
                          {order.Status}
                        </span>
                      )}
                    </td>

                    <td className="px-2">
                      <button
                        className="bg-gray-800 hover:bg-gray-700 duration-150 text-white hover:text-gray-300 text-sm py-1 px-3 w-full rounded my-1"
                        onClick={() => updateHandler(order.OrderID)}
                      >
                        Update
                      </button>
                    </td>
                    <td className="px-2">
                      <button
                        className="bg-gray-800 hover:bg-gray-700 duration-150 text-white hover:text-gray-300 text-sm py-1 px-3 w-full rounded"
                        onClick={() => viewHandler(order)}
                      >
                        View/Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-full flex justify-center items-center my-2">
            <Pagination
              count={Math.ceil(filteredOrdersList?.length / ordersPerPage)}
              page={currentPage}
              onChange={(e, value) => paginate(value)}
            />
          </div>
        </div>
      </div>

      {showModel && modelType === "update" && (
        <Model onClose={handleCloseModel}>
          <h2 className="min-w-[250px] text-lg font-bold text-gray-400 mb-2">
            Update Order Status
          </h2>
          <div className="w-full flex justify-center items-center">
            <div className="w-full">
              <div className="w-full">
                <select
                  name="status"
                  id="status"
                  className="w-full bg-gray-800 text-white py-2 px-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="select">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div className="w-full mt-2">
                <button
                  className="bg-gray-800 hover:bg-gray-700 duration-150 text-white hover:text-gray-300 text-sm py-1 px-3 w-full rounded"
                  onClick={() => updateStatus(selectedOrder)}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </Model>
      )}

      {showModel && modelType === "view" && (
        <Model onClose={handleCloseModel}>
          <button
            className="flex items-center gap-3 bg-green-500 py-2 px-4 rounded ml-4"
            onClick={() => setEdit(false)}
          >
            <FaEdit />
            Edit
          </button>
          <h2 className="min-w-[250px] md:min-w-[500px] text-lg font-bold text-gray-400 mb-2 text-center">
            Order Details
          </h2>
          <div className="w-full flex justify-center items-center">
            <div className="w-full">
              <div className="w-full text-left">
                <OrderForm selectedOrder={selectedOrder} isDisabled={edit} />

                <div className="w-full">
                  <h2 className="text-lg mt-2 text-gray-400 text-center">
                    Order Items
                  </h2>
                  <table className="w-full">
                    <thead>
                      <tr className=" text-gray-300">
                        <th>Item</th>
                        <th className="text-center">Quantity</th>
                        <th className="text-center">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder?.items?.map((item) => (
                        <tr className="text-gray-400">
                          <td>{item.ProductName}</td>
                          <td className="text-center">{item.Quantity}</td>
                          <td className="text-right">Rs. {item.Price}</td>
                        </tr>
                      ))}
                      <tr className="text-gray-200 mt-2 border-t border-b border-t-gray-500 border-b-gray-500">
                        <th>Total</th>
                        <td></td>
                        <td className="text-right">
                          Rs. {selectedOrder.TotalAmount}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="w-full flex justify-end py-2 ">
                  <button
                    className="flex items-center gap-3 bg-blue-500 py-2 px-4 rounded"
                    onClick={() => window.print()}
                  >
                    <FaPrint />
                    Print
                  </button>
                  <CustomButton
                    handleCloseModel={handleCloseModel}
                    setEdit={setEdit}
                  />
                </div>
              </div>
            </div>
          </div>
        </Model>
      )}

      {loading && <Loader />}
    </div>
  );
};

export default Orders;
