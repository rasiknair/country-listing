import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from './pages/Login';
import Home from "./pages/Home";

const App = () => {
  const [auth, setAuth] = useState(localStorage.getItem("auth") === "true");

  return (
    <Router>
      <Routes>
        <Route path="/" element={auth ? <Navigate to="/home" /> : <Login setAuth={setAuth} />} />
        <Route path="/home" element={auth ? <Home setAuth={setAuth} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
