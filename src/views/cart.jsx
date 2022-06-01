import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { RegisterContext } from "../context/registration";

export default function Cart(props) {
  const registration = useContext(RegisterContext);

    useEffect(() => {
        const getStores = async () => {
          const response = await axios({
            method: "get",
            baseURL: `http://localhost:4000/order/cart`,
            headers: {
              authorization: `Bearer ${registration.token}`,
              accept: "Accept: application/json",
            },
          });
          console.log(response)
        };
        getStores();
      }, []); //eslint-disable-line
    
  return (
    <div>Cart</div>
  )
}
