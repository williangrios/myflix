import './header.css';
import {Link} from 'react-router-dom';

function Header (){
    return(
        <header>
            <div><Link className='logo' to='/'>My</Link><Link className='logo logored' to='/'>Flix</Link></div>
            <Link className='favoritos' to='/favoritos'>Meus filmes</Link>
        </header>        
    )
}

export default Header;