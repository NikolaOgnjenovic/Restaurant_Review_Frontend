import './Header.css'
import logo from './logo1.jpg';

const Header = ()=>{
    return(
        <>
        <header>
            <img src={logo} class="logo"/>
            <h1>Hrana blizu vas</h1>
            <nav>
                <ul>
                    <li><a href='#' class="active">Profil</a></li>
                    <li><a href='#'>About</a></li>
                    <li><a href='#'>Grafikon</a></li>
                    <li><a href='#'>Lista</a></li>
                    <li><a href='#'>Ulogujte se</a></li>
                </ul>
            </nav>
        </header>
        </>
    );
}

export default Header;