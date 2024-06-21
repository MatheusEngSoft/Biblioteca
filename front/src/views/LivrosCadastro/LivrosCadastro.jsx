import { useState } from 'react';
import Header from '../../components/Header/Header';
import "./index.scss";
import { LivrosService } from '../../api/LivrosService';

const LivrosCadastro = () => {
  const [livro, setLivro] = useState({
    id: '',
    titulo: '',
    num_paginas: '',
    isbn: '',
    editora: ''
  });

  async function createLivro() {
    const body = {
      id: Number(livro.id),
      titulo: livro.titulo,
      numeroPagina: Number(livro.num_paginas),
      isbn: livro.isbn,
      editora: livro.editora
    };

    if (livro.id && livro.titulo && livro.num_paginas && livro.isbn && livro.editora) {
      try {
        await LivrosService.createLivro(body);
        alert('Livro cadastrado com sucesso!');
        setLivro({ id: '', titulo: '', num_paginas: '', isbn: '', editora: '' });
      } catch (error) {
        alert(`Erro ao cadastrar o livro: ${error.response.data.message}`);
      }
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  }

  return (
    <>
      <Header />
      <div className='livrosCadastro'>
        <h1>Cadastro de Livros</h1>
        <div>
          <form id="formulario">
            <div className='form-group'>
              <label>ID</label>
              <input type="text" required onChange={(event) => setLivro({ ...livro, id: event.target.value })} value={livro.id} />
            </div>
            <div className='form-group'>
              <label>Título</label>
              <input type="text" required onChange={(event) => setLivro({ ...livro, titulo: event.target.value })} value={livro.titulo} />
            </div>
            <div className='form-group'>
              <label>Número de Páginas</label>
              <input type="text" required onChange={(event) => setLivro({ ...livro, num_paginas: event.target.value })} value={livro.num_paginas} />
            </div>
            <div className='form-group'>
              <label>ISBN</label>
              <input type="text" required onChange={(event) => setLivro({ ...livro, isbn: event.target.value })} value={livro.isbn} />
            </div>
            <div className='form-group'>
              <label>Editora</label>
              <input type="text" required onChange={(event) => setLivro({ ...livro, editora: event.target.value })} value={livro.editora} />
            </div>
            <div className='form-group'>
              <button type="button" onClick={createLivro}>Cadastrar Livro</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LivrosCadastro;
