import './Header.css'

const Header = ()=>{
    return(
        <div id="header">
            <div id="container">
                <h2 id="title">Food nearby</h2>
            </div>
            <nav>
                <div><a href="/profil">Profil</a></div> 
                <div><a href="/profil">Mapa</a></div>
                <div><a href="/lista">Top lista</a></div>
                <div><a href="/about">O nama</a></div>
            </nav>
        </div>
    )
}

export default Header;