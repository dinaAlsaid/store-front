import React, { useEffect, useState, useContext } from "react";
import { Card, Button, Accordion, ListGroup, Badge } from "react-bootstrap";
import axios from "axios";

import { RegisterContext } from "../context/registration";

export default function Orders() {
  const [ordres, setOrders] = useState([]);
  const registration = useContext(RegisterContext);

  useEffect(() => {
    const getStores = async () => {
      const response = await axios({
        method: "get",
        baseURL: `http://localhost:4000/order/`,
        headers: {
          authorization: `Bearer ${registration.token}`,
          accept: "Accept: application/json",
        },
      });
      setOrders([...response.data.data]);
    };
    getStores();
  }, []); //eslint-disable-line

  return (
    <div className="container">
        <div className="d-flex flex-wrap justify-content-end">
            <Button>View Cart</Button>
        </div>
      <div className="d-flex flex-wrap">
        {ordres.map((order) => {
          return (
            <Card key={order._id} style={{ width: "25%" }}>
              <Card.Body>
                <Card.Title>
                  Order Number{order._id}
                  <Badge bg="secondary">{order.status}</Badge>
                </Card.Title>
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Purchased Items</Accordion.Header>
                    <Accordion.Body>
                      <ListGroup variant="flush">
                        {order.products ? (
                          order.products.map((product) => {
                            return <ListGroup.Item key={product.name}>{product.name}</ListGroup.Item>;
                          })
                        ) : (
                          <ListGroup.Item>no items</ListGroup.Item>
                        )}
                      </ListGroup>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <Button variant="primary">view order</Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
