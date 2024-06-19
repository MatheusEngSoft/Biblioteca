const express = require('express');
const cors = require('cors')
const livroModel = require('./src/module/usuario/livro.model');
const app = express();

app.use(express.json())
app.use(cors())

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Algo deu errado!' });
});

//Rota para Buscar Livro
app.get('/livro', async(req, res) => {
  let filtroTitulo = {}
  if(req.query.titulo){
    filtroTitulo = { titulo:req.query.titulo}
  }
  try {
    const livro = await livroModel.find(filtroTitulo)
    return res.status(200).json(livro)
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar o Livro!'})
  }
})

//Rota de Cadastro de Livro
app.post('/livro', async (req, res) => {
  const {titulo, numeroPagina, isbn, editora} = req.body

  if(!titulo) {
    return res.status(400).json({ message: 'Titulo é obrigatorio'})
  }
  if(!numeroPagina) {
    return res.status(400).json({ message: 'A numeração da Pagina é obrigatorio'})
  }
  if(!isbn) {
    return res.status(400).json({ message: 'ISBN é obrigatoria'})
  }
  if(!editora) {
    return res.status(400).json({ message: 'Editora é obrigatorio'})
  }

  try {
    const livro = await livroModel.create({
      titulo,
      numeroPagina,
      isbn,
      editora,
    })
    return res.status(201).json(livro)
  } catch (error) {
    return res.status(500).json({ message: 'Error ao cadastrar o Livro!'})
  }
})

//Inicializa o servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  `Servidor está aberto na porta ${PORT}`
})