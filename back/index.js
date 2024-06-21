const express = require('express');
const cors = require('cors');
const livroModel = require('./src/module/livro/livro.model');

const app = express();

app.use(express.json());
app.use(cors());

// Rota para Buscar Livro
app.get('/livro', async (req, res) => {
  const filtroTitulo = req.query.titulo ? { titulo: req.query.titulo } : {};
  try {
    const livro = await livroModel.find(filtroTitulo);
    return res.status(200).json(livro);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar o Livro!' });
  }
});

// Rota de Cadastro de Livro com Verificação de Duplicidade
app.post('/livro', async (req, res) => {
  const { id, titulo, numeroPagina, isbn, editora } = req.body;

  if (!id) {
    return res.status(400).json({ message: 'ID é obrigatório' });
  }
  if (!titulo) {
    return res.status(400).json({ message: 'Título é obrigatório' });
  }
  if (!numeroPagina) {
    return res.status(400).json({ message: 'A numeração da página é obrigatória' });
  }
  if (!isbn) {
    return res.status(400).json({ message: 'ISBN é obrigatória' });
  }
  if (!editora) {
    return res.status(400).json({ message: 'Editora é obrigatória' });
  }

  try {
    // Verifica se já existe um livro com o mesmo ID, título ou ISBN
    const livroExistente = await livroModel.findOne({ $or: [{ id }, { titulo }, { isbn }] });
    if (livroExistente) {
      return res.status(409).json({ message: 'Já existe um livro com o mesmo ID, título ou ISBN' });
    }

    // Cria o novo livro
    const livro = await livroModel.create({
      id,
      titulo,
      numeroPagina,
      isbn,
      editora,
    });
    return res.status(201).json(livro);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao cadastrar o Livro!' });
  }
});

// Rota de Edição de Livro
app.put('/livro/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, numeroPagina, isbn, editora } = req.body;

  if (!titulo && !numeroPagina && !isbn && !editora) {
    return res.status(400).json({ message: 'Pelo menos um campo deve ser atualizado' });
  }

  try {
    const livroAtualizado = await livroModel.findOneAndUpdate(
      { id },
      { titulo, numeroPagina, isbn, editora },
      { new: true }
    );
    if (!livroAtualizado) {
      return res.status(404).json({ message: 'Livro não encontrado!' });
    }
    return res.status(200).json(livroAtualizado);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao atualizar o Livro!' });
  }
});

// Rota de Deleção de Livro
app.delete('/livro/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const livroDeletado = await livroModel.findOneAndDelete({ id });
    if (!livroDeletado) {
      return res.status(404).json({ message: 'Livro não encontrado!' });
    }
    return res.status(200).json({ message: 'Livro deletado com sucesso!' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao deletar o Livro!' });
  }
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Algo deu errado!' });
});

// Inicializa o servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor está aberto na porta ${PORT}`);
});
