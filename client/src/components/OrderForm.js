import React, { useEffect, useState } from "react";

const OrderForm = ({ selectedOrder, isDisabled, handleInputChange }) => {
  const initialOrderData = {
    id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    note: "",
  };
  const [orderData, setOrderData] = useState(initialOrderData);
  const { id, name, email, phone, note, address } = orderData;

  useEffect(() => {
    setOrderData({
      id: selectedOrder.OrderID,
      name: selectedOrder.UserName,
      email: selectedOrder.Email,
      phone: selectedOrder.ContactNo,
      address: selectedOrder.ShippingAddress,
      note: selectedOrder.Notes,
    });
  }, [selectedOrder]);

  const handleChange = (event) => {
    const { id, value } = event.target;
    console.log(value);
    setOrderData({ ...orderData, [id]: value });
  };

  return (
    <form className="w-full">
      <div style={{ marginBottom: "5px" }}>
        <label style={{ paddingRight: "15px" }} htmlFor="orderID">
          Order ID :
        </label>
        <input
          id="id"
          type="text"
          value={id}
          disabled={isDisabled}
          style={{
            backgroundColor: "transparent",
            borderColor: isDisabled ? "transparent" : "white",
            borderWidth: "1px",
            borderStyle: "solid",
            paddingLeft: "10px",
            borderRadius: "5px",
          }}
        />
      </div>
      <div style={{ marginBottom: "5px" }}>
        <label style={{ paddingRight: "15px" }} htmlFor="name">
          Name :
        </label>
        <input
          id="name"
          type="text"
          value={name}
          disabled={isDisabled}
          style={{
            backgroundColor: "transparent",
            borderColor: isDisabled ? "transparent" : "white",
            borderWidth: "1px",
            borderStyle: "solid",
            paddingLeft: "10px",
            borderRadius: "5px",
          }}
        />
      </div>
      <div style={{ marginBottom: "5px" }}>
        <label style={{ paddingRight: "15px" }} htmlFor="email">
          Email :
        </label>
        <input
          id="email"
          type="text"
          value={email}
          disabled={isDisabled}
          style={{
            backgroundColor: "transparent",
            borderColor: isDisabled ? "transparent" : "white",
            borderWidth: "1px",
            paddingLeft: "10px",
            borderStyle: "solid",
            borderRadius: "5px",
          }}
        />
      </div>
      <div style={{ marginBottom: "5px" }}>
        <label style={{ paddingRight: "15px" }} htmlFor="phone">
          Phone :
        </label>
        <input
          id="phone"
          type="text"
          value={phone}
          disabled={isDisabled}
          style={{
            backgroundColor: "transparent",
            borderColor: isDisabled ? "transparent" : "white",
            borderWidth: "1px",
            paddingLeft: "10px",
            borderStyle: "solid",
            borderRadius: "5px",
          }}
        />
      </div>
      <div style={{ marginBottom: "5px" }}>
        <label style={{ paddingRight: "15px" }} htmlFor="address">
          Address :
        </label>
        <input
          id="address"
          type="text"
          value={address}
          disabled={isDisabled}
          style={{
            backgroundColor: "transparent",
            borderColor: isDisabled ? "transparent" : "white",
            borderWidth: "1px",
            paddingLeft: "10px",
            borderStyle: "solid",
            borderRadius: "5px",
          }}
        />
      </div>
      <div style={{ marginBottom: "5px" }}>
        <label style={{ paddingRight: "5px" }} htmlFor="status">
          Status :
        </label>
        <input
          id="status"
          type="text"
          value={selectedOrder.Status}
          disabled={isDisabled}
          style={{
            backgroundColor: "transparent",
            borderColor: isDisabled ? "transparent" : "white",
            borderWidth: "1px",
            paddingLeft: "10px",
            borderStyle: "solid",
            borderRadius: "5px",
          }}
        />
      </div>
      <div style={{ marginBottom: "5px" }}>
        <label style={{ paddingRight: "15px" }} htmlFor="note">
          Note :
        </label>
        <input
          id="note"
          type="text"
          value={note}
          disabled={isDisabled}
          style={{
            backgroundColor: "transparent",
            borderColor: isDisabled ? "transparent" : "white",
            borderWidth: "1px",
            paddingLeft: "10px",
            borderStyle: "solid",
            borderRadius: "5px",
          }}
        />
      </div>
    </form>
  );
};

export default OrderForm;
