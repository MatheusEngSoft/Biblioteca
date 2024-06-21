import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import "./index.scss";
import { useParams } from 'react-router-dom';
import { LivrosService } from '../../api/LivrosService';

const LivrosEdicao = () => {  
  let { livroId } = useParams();
  const [livro, setLivro] = useState({
    titulo: '',
    num_paginas: '',
    isbn: '',
    editora: ''
  });

  async function getLivro() {
    try {
      const { data } = await LivrosService.getLivro(livroId);
      setLivro({
        titulo: data.titulo,
        num_paginas: data.num_paginas,
        isbn: data.isbn,
        editora: data.editora
      });
    } catch (error) {
      console.error('Erro ao buscar o livro:', error);
    }
  }

  async function editLivro() {
    const body = {};

    if (livro.titulo) body.titulo = livro.titulo;
    if (livro.num_paginas) body.num_paginas = livro.num_paginas;
    if (livro.isbn) body.isbn = livro.isbn;
    if (livro.editora) body.editora = livro.editora;

    try {
      const { data } = await LivrosService.updateLivro(livroId, body);
      alert(data.mensagem);
      getLivro(); // Atualiza os dados do livro após a edição
    } catch (error) {
      alert(`Erro ao atualizar o livro: ${error.response.data.mensagem}`);
    }
  }

  useEffect(() => {
    getLivro();
  }, []);

  return (
    <>
      <Header />
      <div className='livrosCadastro'>
        <h1>Edição de Livros</h1>
        <div>
          <form id="formulario">
            <div className='form-group'>
              <label>Título</label>
              <input
                type="text"
                onChange={(event) => setLivro({ ...livro, titulo: event.target.value })}
                value={livro.titulo}
              />
            </div>
            <div className='form-group'>
              <label>Número de Páginas</label>
              <input
                type="text"
                onChange={(event) => setLivro({ ...livro, num_paginas: event.target.value })}
                value={livro.num_paginas}
              />
            </div>
            <div className='form-group'>
              <label>ISBN</label>
              <input
                type="text"
                onChange={(event) => setLivro({ ...livro, isbn: event.target.value })}
                value={livro.isbn}
              />
            </div>
            <div className='form-group'>
              <label>Editora</label>
              <input
                type="text"
                onChange={(event) => setLivro({ ...livro, editora: event.target.value })}
                value={livro.editora}
              />
            </div>
            <div className='form-group'>
              <button type="button" onClick={editLivro}>Atualizar Livro</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LivrosEdicao;
