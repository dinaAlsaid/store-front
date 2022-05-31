import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { RegisterContext } from "../context/registration";

export default function Stores() {
  const registration = useContext(RegisterContext);

  const [stores, setStore] = useState([]);
  useEffect(() => {
    const getStores = async () => {
      const response = await axios({
        method: "get",
        baseURL: `http://localhost:4000/store/`,
        headers: {
          authorization: `Bearer ${registration.token}`,
          accept: "Accept: application/json",
        },
      });
      setStore([...response.data.data]);
    };
    getStores();
  }, []);//eslint-disable-line

  return (
    <>
      {stores.map((store) => {
        return <div>{store.name}</div>;
      })}
    </>
  );
}
