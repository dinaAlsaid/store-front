import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./views/signin";
import Stores from "./views/stores";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/stores" element={<Stores/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
