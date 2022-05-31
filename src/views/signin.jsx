import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { RegisterContext } from "../context/registration";

export const Login = () => {
  const registration = useContext(RegisterContext);
  const navigate = useNavigate();

  const [isNewUser, setisNewUser] = useState(true);

  useEffect(() => {
    if (registration.loggedIn) {
      navigate("/");
    }
  }, [registration.loggedIn]); //eslint-disable-line

  const login = (data) => {
    registration.login(data);
  };

  const signup = (data) => {
    registration.signup(data);
  };

  return (
    <Container>
      <Row className="mt-5 justify-content-center">
        {isNewUser ? (
          <Col md={6} lg={4} className="border p-4">
            <LoginForm onSubmit={login} />
          </Col>
        ) : (
          <Col md={6} lg={4} className="border p-4">
            <SignupForm onSubmit={signup} />
          </Col>
        )}
      </Row>
      <Row>
        <span
          className="custom link text-center"
          onClick={() => {
            setisNewUser(!isNewUser);
          }}
        >
          {!isNewUser ? "Already a user" : "Sign Up"}
        </span>
      </Row>
    </Container>
  );
};

const LoginForm = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Form onSubmit={handleSubmit(props.onSubmit)}>
      <fieldset>
        <legend>Sign in</legend>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            placeholder="user name"
            {...register("username", {
              required: { value: true, message: "This field is required" },
            })}
          />
          {errors.username && <span className="text-danger">{errors.username.message}</span>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>password</Form.Label>
          <Form.Control
            type="password"
            placeholder="password"
            {...register("password", {
              required: { value: true, message: "This field is required" },
            })}
          />
          {errors.password && <span className="text-danger">{errors.password.message}</span>}
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </fieldset>
    </Form>
  );
};

const SignupForm = (props) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  return (
    <Form onSubmit={handleSubmit(props.onSubmit)}>
      <fieldset>
        <legend>Sign up</legend>

        <Form.Group className="mb-3" controlId="username">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            placeholder="user name"
            {...register("username", {
              required: { value: true, message: "This field is required" },
            })}
          />
          {errors.username && <span className="text-danger">{errors.username.message}</span>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>password</Form.Label>
          <Form.Control
            type="password"
            placeholder="password"
            {...register("password", {
              required: { value: true, message: "This field is required" },
              validate: {
                checkMatch: (val) => (val === getValues("Confirmpassword") ? true : "passwords don't match"),
              },
            })}
          />
          {errors.password && <span className="text-danger">{errors.password.message}</span>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="Confirmpassword">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            {...register("Confirmpassword", {
              required: { value: true, message: "This field is required" },
              validate: {
                checkMatch: (val) => (val === getValues("password") ? true : "passwords don't match"),
              },
            })}
          />
          {errors.Confirmpassword && <span className="text-danger">{errors.Confirmpassword.message}</span>}
        </Form.Group>

        <Form.Label>Account Type</Form.Label>
        <Form.Group className="mb-3">
          <Form.Check
            inline
            type="radio"
            defaultChecked
            value="Seller"
            name="AccountType"
            label={`Seller`}
            {...register("AccountType")}
          />
          <Form.Check
            inline
            type="radio"
            value="Shopper"
            name="AccountType"
            label={`Shopper`}
            {...register("AccountType")}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Sign up
        </Button>
      </fieldset>
    </Form>
  );
};
