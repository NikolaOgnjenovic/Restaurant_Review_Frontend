import React from "react";

import './login_stranica.css';

const Login = () => {
    return(
        <React.Fragment>
        <div className="loginbox">
            <img src="avataricon.png" class="avatar"/>
             <h1>Ulogujte se</h1>
             <form>
               <p>Korisnicko ime</p>
               <input type="text" name="" placeholder="Unesite korisnicko ime"/>
               <p>Sifra</p>
               <input type="password" name="" placeholder="Unesite sifru/"></input>
               <input type="submit" name="" value="Ulogujte se"/>
               <a href='#'>Izgubili ste lozinku?</a>
               <a href='#'>Nemate nalog?</a>
             </form>

          </div>
        </React.Fragment>
    )
}

export default Login;