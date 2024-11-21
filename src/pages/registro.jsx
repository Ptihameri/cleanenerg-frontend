import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import "../styles/register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await api.post("api/usuarios", {
        username,
        email,
        nome,
        password,
      });
      alert("Registro realizado com sucesso!");
      navigate("/login"); // Redireciona para a página de login
    } catch (error) {
      alert("Erro ao registrar. Tente novamente.");
    }
  };

  return (
    <div className="container-registro">
      <div className="register-container">
        <h1 className="register-title">Registrar</h1>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="register-input"
        />
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="register-input"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="register-input"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="register-input"
        />

        <button onClick={handleRegister} className="register-button">
          Registrar
        </button>
      </div>
    </div>
  );
};

export default Register;
