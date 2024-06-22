import axios from 'axios';

const API_URL = 'http://localhost:8080'; // URL do seu backend

export const LivrosService = {
  getLivros: () => axios.get(`${API_URL}/livros`),
  getLivro: (id) => axios.get(`${API_URL}/livro/${id}`),
  createLivro: (livro) => axios.post(`${API_URL}/livro`, livro),
  updateLivro: (id, livro) => axios.put(`${API_URL}/livro/${id}`, livro),
  deleteLivro: (id) => axios.delete(`${API_URL}/livro/${id}`)
};
