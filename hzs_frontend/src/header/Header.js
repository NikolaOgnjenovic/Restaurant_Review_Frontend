import './Header.css'

const Header = ()=>{
    return(
        <div id="header">
            <div id="container">
                <h2 id="title">Food nearby</h2>
            </div>
            <nav>
                <div><a href="/profil">Profil</a></div> 
                <div><a href="/about">About</a></div>
                <div><a href="/grafik">Grafik</a></div>
                <div><a href="/lista">Top lista</a></div>
            </nav>
        </div>
    )
}

export default Header;