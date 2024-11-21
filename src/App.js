import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import Doacoes from "./pages/Doacoes";
import Login from "./pages/Login";
import Projetos from "./pages/Projetos";
import Register from "./pages/registro";
import Usuario from "./pages/usuario";
import "./styles/globalStyles.css";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Projetos />} />
        <Route path="/doacoes" element={<Doacoes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={<Usuario />} />
      </Routes>
    </Router>
  );
};

export default App;
