import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import "../styles/login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  localStorage.clear(); // Limpa o localStorage

  const handleLogin = async () => {
    try {
      const response = await api.post("api/auth", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token.token); // Salva o token no localStorage
      localStorage.setItem("usuarioId", response.data.idUsuario); // Salva o token no localStorage
      alert("Login realizado com sucesso!");
      navigate("/"); // Redireciona para a página inicial
      window.location.reload(); // Atualiza a página
    } catch (error) {
      if (error.response.status === 422 || error.response.status === 400) {
        alert("Usuario ou senha inválidos.");
      } else {
        alert("Erro ao fazer login. Tente novamente.");
      }
    }
  };

  return (
    <div className="container">
      <div className="login-container">
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={() => handleLogin()}>
          Entrar
        </button>
      </div>
    </div>
  );
};

export default Login;
