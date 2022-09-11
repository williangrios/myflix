import React, {useEffect, useState} from 'react'
import api from '../../services/api';
import {Link} from 'react-router-dom';
import './home.css';


function Home() {

    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        async function loadFilmes() {
            const response = await api.get('movie/now_playing', {
                params:{
                    api_key: '52bf069036c9e25d4ab5d84c7fc1c39d',
                    language: 'pt-BR',
                    page: 1 
                }
            })
            
            setFilmes(response.data.results.slice(0,10));
            setLoading(false);

        }

        loadFilmes();

    }, [])


    if (loading){
        return(
            <div className='loading'>
                <h2>Carregando...</h2>
            </div>
        )
    }

    return (
        <div className='container'>
            <div className='listafilmes'>
                {filmes.map((item) => {
                  return(
                    <article key={item.id}>
                        <strong>{item.title}</strong>
                        <img src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt={item.title} />
                        <Link to={`/filme/${item.id}`}>Acessar</Link>
                    </article>
                  )}) 
                }
            </div>
        </div>
    )
}

export default Home