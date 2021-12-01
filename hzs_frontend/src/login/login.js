import React, {useState} from "react";

import './login_stranica.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const handleUsername = (e) => {
        setUsername(e.target.value);
        setSubmitted(false);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
        setSubmitted(false);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if(username === '' || password === '')
          setError(true);
        else {
          setError(false);
          setSubmitted(true);
        }
    }

    const successMessage = () => {
      return (<div className="success" style={{display: submitted ? '' : 'none',}}>
        <h4>Uspesno ste se ulogovali</h4>
      </div>
      );
    }

    const errorMessage = () => {
      return(<div className="error" style={{display: error ? '' : 'none',}}>
        <h4>Niste uneli sve podatke</h4>
      </div>
      );
    }

    return(
        <>
          <div class="loginbox">
            <img src="slike/avataricon.png" class="avatar"/>
             <h1>Ulogujte se</h1>
             <form>
               <p>Korisnicko ime</p>
               <input onChange={handleUsername} type="text" value={username} placeholder="Unesite korisnicko ime"/>
               <p>Sifra</p>
               <input onChange={handlePassword} type="password" value={password} name="" placeholder="Unesite sifru"/>
               <input onClick={handleSubmit} type="submit" name="" value="Ulogujte se"/>
               <a href='#'>Izgubili ste lozinku?</a><br/>
               <a href='#'>Nemate nalog?</a>
             </form>
              <div className="message" style={{background: submitted ? 'green':'red'}}>
                {successMessage()}
                {errorMessage()}
              </div>
          </div>
        </>
    );
}

export default Login;