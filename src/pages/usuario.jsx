import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import "../styles/usuario.css";

const Usuario = () => {
  const [doacoes, setDoacoes] = useState([]);
  const [novoProjeto, setNovoProjeto] = useState({
    nome: "",
    descricao: "",
    valorMeta: "",
    valorArrecadado: 0,
    imagem: "",
  });
  const [mensagem, setMensagem] = useState(null);
  const navigate = useNavigate();

  // Carregar as doações do usuário logado
  useEffect(() => {
    const carregarDoacoes = async () => {
      try {
        const usuarioId = localStorage.getItem("usuarioId"); // Assumindo que o ID do usuário logado está armazenado no localStorage
        if (usuarioId) {
          const response = await api.get(`/doacoes/usuario/${usuarioId}`);
          return setDoacoes(response.data);
        }
      } catch (error) {
        if (error.response.status === 401) {
          alert("Você precisa estar logado para acessar esta página.");
        }
      }
      navigate("/login");
      window.location.reload();
    };
    carregarDoacoes();
  }, []);

  // Atualizar estado do novo projeto
  const handleProjetoChange = (e) => {
    const { name, value } = e.target;
    setNovoProjeto((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Criar um novo projeto
  const handleCriarProjeto = async () => {
    if (
      novoProjeto.nome.trim() &&
      novoProjeto.descricao.trim() &&
      novoProjeto.valorMeta &&
      novoProjeto.imagem.trim()
    ) {
      try {
        const response = await api.post("/api/projetos", novoProjeto);
        setMensagem("Projeto criado com sucesso!");
        setNovoProjeto({
          nome: "",
          descricao: "",
          valorMeta: "",
          valorArrecadado: "",
          imagem: "",
        });
        console.log("Projeto criado:", response.data);
      } catch (error) {
        console.error("Erro ao criar projeto:", error);
        setMensagem("Erro ao criar projeto. Tente novamente.");
      }
    } else {
      setMensagem("Por favor, preencha todos os campos.");
    }
  };

  // Sair da conta
  const handleSair = () => {
    localStorage.removeItem("usuarioId"); // Remove o ID do usuário logado
    window.location.reload(); // Atualiza a página
    navigate("/login");
  };

  return (
    <div className="usuario-container">
      <h1>Minhas Doações</h1>
      {doacoes.length > 0 ? (
        <ul className="doacoes-lista">
          {doacoes.map((doacao) => (
            <li key={doacao.idDoacao} className="doacao-item">
              <h3>Projeto ID: {doacao.projetoId}</h3>
              <p>
                <strong>Usuário:</strong> {doacao.username}
              </p>
              <p>
                <strong>Valor:</strong> R$ {doacao.valor.toFixed(2)}
              </p>
              <p>
                <strong>ID da Doação:</strong> {doacao.idDoacao}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Você ainda não realizou doações.</p>
      )}

      <h2>Criar Novo Projeto de Doação</h2>
      <div className="novo-projeto-form">
        <input
          type="text"
          name="nome"
          value={novoProjeto.nome}
          onChange={handleProjetoChange}
          placeholder="Nome do projeto"
        />
        <input
          type="text"
          name="descricao"
          value={novoProjeto.descricao}
          onChange={handleProjetoChange}
          placeholder="Descrição do projeto"
        />
        <input
          type="number"
          name="valorMeta"
          value={novoProjeto.valorMeta}
          onChange={handleProjetoChange}
          placeholder="Valor Meta"
        />
        <input
          type="text"
          name="imagem"
          value={novoProjeto.imagem}
          onChange={handleProjetoChange}
          placeholder="URL da Imagem"
        />
        <button onClick={handleCriarProjeto} className="btn-criar">
          Criar Projeto
        </button>
      </div>

      {mensagem && <p className="mensagem-feedback">{mensagem}</p>}

      <button onClick={handleSair} className="btn-sair">
        Sair
      </button>
    </div>
  );
};

export default Usuario;
