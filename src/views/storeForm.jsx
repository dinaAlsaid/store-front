import React, {  useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import { RegisterContext } from "../context/registration";

export default function StoreForm(props) {
  const registration = useContext(RegisterContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    data.products = [{ name: " ", price: 0 }];
 await axios({
      method: "post",
      baseURL: `http://localhost:4000/store/`,
      data,
      headers: {
        authorization: `Bearer ${registration.token}`,
        accept: "Accept: application/json",
      },
    })
      .then(() => {
        reset();
        navigate("/stores");
      })
      .catch((err) => {
        setError("description", "something went wrong");
      });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>Create Store</legend>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Store Name</Form.Label>
            <Form.Control
              placeholder="name"
              {...register("name", {
                required: { value: true, message: "This field is required" },
              })}
            />
            {errors.name && <span className="text-danger">{errors.name.message}</span>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>description</Form.Label>
            <Form.Control
              type="textarea"
              placeholder="description"
              {...register("description", {
                required: { value: true, message: "This field is required" },
              })}
            />
            {errors.description && <span className="text-danger">{errors.description.message}</span>}
          </Form.Group>

          <Button variant="primary" type="submit">
            create Store
          </Button>
        </fieldset>
      </Form>
    </Container>
  );
}
