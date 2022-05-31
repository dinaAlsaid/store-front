import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { RegisterContext } from "../context/registration";
import { Card, Button } from "react-bootstrap";

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
  }, []); //eslint-disable-line

  return (
    <div className="d-flex flex-wrap container">
      {stores.map((store) => {
        return (
          <Card key={store.name} style={{ width: "25%" }}>
            <Card.Img variant="top" src="https://scotturb.com/wp-content/uploads/2016/11/product-placeholder.jpg" />
            <Card.Body>
              <Card.Title>{store.name}</Card.Title>
              <Card.Text>{store.description}</Card.Text>
              <Button variant="primary">Shop here</Button>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
}
