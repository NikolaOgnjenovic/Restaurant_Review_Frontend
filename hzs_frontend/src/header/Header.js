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
                    <li><a href='/profil' class="active">Profil</a></li>
                    <li><a href='/about'>About</a></li>
                    <li><a href='/mape'>Mape</a></li>
                    <li><a href='/lista'>Lista</a></li>
                    <li><a href='/login'>Ulogujte se</a></li>
                </ul>
            </nav>
        </header>
        </>
    );
}

export default Header;