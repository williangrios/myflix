import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import api from '../../services/api';
import { toast } from 'react-toastify';
import './filme.css';


function Filme() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: '52bf069036c9e25d4ab5d84c7fc1c39d',
                    language: 'pt-BR'
                }
            })
            .then((response)=>{
                setFilme(response.data);
                setLoading(false);
            })
            .catch(() => {
                navigate("/", {replace: true} );
                return;
            })
        }

        loadFilme();

        return () => {
            //entra aqui quando o componente e desmontado
            //ou seja, quando saimos da tela

        }

    }, [navigate, id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem('@myflix');
        let filmesSalvos = JSON.parse(minhaLista) || [];
        const hasFilme = filmesSalvos.some((filmesSalvos) => filmesSalvos.id === filme.id)

        if(hasFilme){
            toast.warn('Este filme já está na lista');
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem('@myflix', JSON.stringify(filmesSalvos));
        toast.success('Filme salvo com sucesso!');
        
    }

    if (loading){
        return(
            <div className='filmeinfo'>
                <h2>Carregando...</h2>
            </div>
        )
    }

    return (
        <div className='filmeinfo'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>
            <div className='areabuttons'>
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} trailler`} >Trailler</a>
                </button>

            </div>
        </div>
    )
}

export default Filme