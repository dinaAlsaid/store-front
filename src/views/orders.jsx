import React, { useState } from "react";
import { Card, Button, Accordion, ListGroup, Badge } from "react-bootstrap";

export default function Orders() {
  const [ordres, setOrders] = useState([{ orderNumber: 123,status:"processing" }]);

  return (
    <div className="d-flex flex-wrap container">
      {ordres.map((order) => {
        return (
          <Card key={order._id} style={{ width: "25%" }}>
            <Card.Body>
              <Card.Title>
                Order Number{order.orderNumber}
                <Badge bg="secondary">{order.status}</Badge>
              </Card.Title>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Purchased Items</Accordion.Header>
                  <Accordion.Body>
                    <ListGroup variant="flush">
                      {order.products ? (
                        order.products.map((product) => {
                          return (
                            <ListGroup.Item key={product.name}>{product.name}</ListGroup.Item>
                          );
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
  );
}
