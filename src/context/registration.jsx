import React, { useState, useEffect } from "react";
import jwt from "jwt-decode";
import axios from "axios";
import cookie from "react-cookies";

export const RegisterContext = React.createContext();
function RegisterProvider(props) {
  const [loggedIn, setloggedIn] = useState(false);
  const [user, setuser] = useState({});
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = cookie.load("auth");
    validateToken(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //#region HELPER FUNCTIONS
  const validateToken = (token) => {
    try {
      const user = jwt(token);
      setLoginState(true, token, user);
    } catch (e) {
      if (token) {
        console.error(e);
      }
      setLoginState(false, null, {});
    }
  };

  const setLoginState = (loggedIn, token, user) => {
    cookie.save("auth", token);
    setToken(token);
    setuser(user);
    setloggedIn(loggedIn);
    setToken(token);
  };
  //#endregion

  //#region HANDLERS
  const login = async (data) => {
    try {
      const response = await axios({
        method: "post",
        baseURL: `https://seeding-fund-dina.herokuapp.com/users/signin`,
        data,
        headers: {
          authorization: `Basic ${btoa(`${data.username}:${data.password}`)}`,
          accept: "Accept: application/json",
        },
      });
      validateToken(response.data.token);
    } catch (e) {
      console.error(e.message);
    }
  };

  const signup = async (data) => {
    try {
      const response = await axios({
        method: "post",
        baseURL: `https://seeding-fund-dina.herokuapp.com/users/signup`,
        data,
      });
      validateToken(response.data.token);
    } catch (e) {
      console.error(e.message);
    }
  };

  const logout = () => {
    setLoginState(false, null, {});
    cookie.remove("auth");
  };
  //#endregion

  const state = {
    loggedIn,
    setloggedIn,
    user,
    setuser,
    login,
    logout,
    signup,
    token,
  };

  return <RegisterContext.Provider value={state}>{props.children}</RegisterContext.Provider>;
}
export default RegisterProvider;
