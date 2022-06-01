import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import { RegisterContext } from "../context/registration";

export default function Stores() {
  const registration = useContext(RegisterContext);
  const navigate = useNavigate();

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
    <div className=" container">
      {registration?.user?.role === "Seller" && (
        <div className="d-flex flex-wrap justify-content-end">
          <Button
            onClick={() => {
              navigate("/store/create");
            }}
          >
            Create Store
          </Button>
        </div>
      )}
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
    </div>
  );
}
