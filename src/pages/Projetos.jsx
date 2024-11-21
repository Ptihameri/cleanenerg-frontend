import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProjetos } from "../services/api";
import "../styles/Projetos.css";

const Projetos = () => {
  const [projetos, setProjetos] = useState([]);
  const navigate = useNavigate();

  const handleSelect = (id) => {
    navigate("/doacoes", {
      state: {
        projetoId: id,
      },
    });
  };

  useEffect(() => {
    getProjetos()
      .then((response) => setProjetos(response.data))
      .catch((error) => console.error("Erro ao buscar projetos:", error));
  }, []);

  return (
    <div className="container-projetos">
      <h1>Projetos</h1>
      <ul className="list">
        {projetos.map((projeto) => (
          <li key={projeto.id} className="itemList">
            <h2>{projeto.nome}</h2>
            <p>{projeto.descricao}</p>
            <p>Meta: R${projeto.valorMeta}</p>
            <p>Arrecadado: R${projeto.valorArrecadado}</p>
            {/* Verifica se a imagem existe, caso contrário, usa uma imagem padrão */}
            <img
              src={
                projeto.imagem
                  ? encodeURI(projeto.imagem)
                  : "https://via.placeholder.com/150"
              }
              alt={projeto.nome}
              className="project-image"
            />
            <button onClick={() => handleSelect(projeto.id)}>Selecionar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projetos;
