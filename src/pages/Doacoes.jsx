import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fazerDoacao } from "../services/api";
import "../styles/doacaoStyles.css";

const DoacaoPage = () => {
  const [valor, setValor] = useState("");
  const [projetos, setProjetos] = useState([]);
  const [usuarioId, setUsuarioId] = useState(
    localStorage.getItem("usuarioId") || ""
  );
  const location = useLocation();
  const { projetoId: initialProjetoId } = location.state || {};
  const [projetoId, setProjetoId] = useState(initialProjetoId || "");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8090/api/projetos")
      .then((response) => setProjetos(response.data))
      .catch((error) => console.error("Erro ao carregar projetos:", error));
    setUsuarioId(localStorage.getItem("usuarioId"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!projetoId) {
      alert("Por favor, selecione um projeto.");
      return;
    }

    const doacaoData = {
      valor: parseFloat(valor),
      usuario: parseInt(usuarioId),
      projeto: parseInt(projetoId),
    };

    try {
      await fazerDoacao(doacaoData);
      alert("Doação realizada com sucesso!");
      navigate("/");
    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        alert("Você precisa estar logado para fazer uma doação.");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        alert("Erro ao realizar doação.");
      }
    }
  };

  return (
    <div className="container">
      <h1>Faça uma Doação</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="valor" className="form-label">
            Valor da Doação
          </label>
          <input
            type="number"
            step="0.01"
            id="valor"
            className="form-control"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="projetoId" className="form-label">
            Selecione um Projeto
          </label>
          <select
            id="projetoId"
            className="form-select"
            value={projetoId}
            onChange={(e) => setProjetoId(e.target.value)}
            required
          >
            <option value="">Escolha um projeto</option>
            {projetos.map((projeto) => (
              <option key={projeto.id} value={projeto.id}>
                {projeto.nome}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Doar
        </button>
      </form>
    </div>
  );
};

export default DoacaoPage;
