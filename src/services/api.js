import axios from "axios";

export const api = new axios.create({
  baseURL: "https://cleanenergy.onrender.com/",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
});

export const getProjetos = () => {
  return api.get(`api/projetos`);
};

export const fazerDoacao = (doacao) => {
  return api.post(`doacoes`, doacao);
};
