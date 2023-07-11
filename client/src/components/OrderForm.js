import React, { useEffect, useState } from "react";

const OrderForm = ({ selectedOrder, isDisabled, setSelectedOrder }) => {
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
    const { id, name, value } = event.target;
    console.log(value);
    setSelectedOrder({ ...selectedOrder, [name]: value });
  };
  console.log(selectedOrder);
  return (
    <form className="w-full">
      <div style={{ marginBottom: "5px" }}>
        <label style={{ paddingRight: "15px" }} htmlFor="orderID">
          Order ID :
        </label>
        <input
          id="id"
          name="OrderID"
          type="text"
          value={id}
          onChange={handleChange}
          disabled={true}
          style={{
            backgroundColor: "transparent",
            borderColor: isDisabled ? "transparent" : "transparent",
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
          name="UserName"
          type="text"
          value={name}
          disabled={isDisabled}
          onChange={handleChange}
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
          name="Email"
          type="text"
          value={email}
          disabled={isDisabled}
          onChange={handleChange}
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
          name="ContactNo"
          id="phone"
          type="text"
          value={phone}
          disabled={isDisabled}
          onChange={handleChange}
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
          name="ShippingAddress"
          type="text"
          value={address}
          disabled={isDisabled}
          onChange={handleChange}
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
          name="Note"
          type="text"
          value={note}
          disabled={isDisabled}
          onChange={handleChange}
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
