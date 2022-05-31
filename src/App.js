import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./views/signin";
import Stores from "./views/stores";
import Orders from "./views/orders";
import Header from "./components/header";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/stores" element={<Stores />} />
          <Route path="/orders" element={<Orders />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
