import React, {useState, useEffect} from 'react'
import './favoritos.css'
import {Link} from 'react-router-dom'
import { toast } from 'react-toastify';

function Favoritos() {

  const [filmes, setFilmes] =useState([]);

  useEffect(() => {
    const minhaLista = localStorage.getItem('@myflix');
    setFilmes(JSON.parse(minhaLista) || []);
  }, [])

  function excluirFilme(id){
    let filtroFilmes = filmes.filter((item) => {
      return(
        item.id !== id
      )
    })
    setFilmes(filtroFilmes);
    localStorage.setItem('@myflix', JSON.stringify(filtroFilmes));
    toast.success('Filme removido com sucesso!');
  }

  return (
    <div className='meusfilmes'>
        <h1>Meus Favoritos</h1>

        {filmes.length === 0 && <span>Você não possui nenhum filme favoritado.</span>}
        <ul>
          {filmes.map((filme)=> {
            return (
              <li key={filme.id}>
                <span>{filme.title}</span>
                <div>
                  <Link to={`/filme/${filme.id}`}>Ver Detalhes</Link>
                  <button onClick={ ()=>( excluirFilme(filme.id))}>Excluir</button>
                </div>

              </li>
            )
          })}
        </ul>

    </div>
  )
}

export default Favoritos