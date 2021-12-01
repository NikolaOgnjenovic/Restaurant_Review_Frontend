import React, {useEffect, useState} from "react";

import './login_stranica.css';
import avatar from './slike/avataricon.png';

const Login = () => {
    const BASE_URL = 'https://hrana-u-blizini-api.herokuapp.com/user/';
    const[users, setUsers] = useState([]);

    useEffect(() => {
      const getData = () => {
        fetch(BASE_URL)
          .then((response) => response.json())
          .then((data) => {
            setUsers(data);
            console.log(data);
          });
      };
      getData();
    }, []);

    const sessionUsername = window.sessionStorage.getItem('username');
    const sessionPassword = window.sessionStorage.getItem('password');

    const [username, setUsername] = useState(sessionUsername?sessionUsername:'');
    const [password, setPassword] = useState(sessionPassword?sessionPassword:'');

    const [submitted, setSubmitted] = useState(false);
    const [errorUnet, setErrorUnet] = useState(false);
    const [errorUsernamePassword, setErrorUsernamePassword] = useState(false);

    const provera = (username1, password1) => {
      for(let i = 0;i < users.length;i++) {
        if(users[i].username === username1 && users[i].password === password1)
          return true;
      }
      return false;
    }

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
          setErrorUnet(true);
        else if(!provera(username, password)) {
          setErrorUsernamePassword(true);
        }
        else {
          setErrorUnet(false);
          setErrorUsernamePassword(false);
          setSubmitted(true);

          window.sessionStorage.setItem("loggedUsername", username);
          window.sessionStorage.setItem("loggedPassword", password);
          window.location = "https://hrana-u-blizini.herokuapp.com/";
        }
    }

    const successMessage = () => {
      return (<div className="success" style={{display: submitted ? '' : 'none',}}>
        <h4>Uspesno ste se ulogovali</h4>
      </div>
      );
    }

    const errorUnetMessage = () => {
      return(<div className="error" style={{display: errorUnet ? '' : 'none',}}>
        <h4>Niste uneli sve podatke</h4>
      </div>
      );
    }

    const errorUsernamePasswordMessage = () => {
      return(<div className="errorUsernamePassword" style={{display: errorUsernamePassword ? '' : 'none',}}>
        <h4>Pogresan username ili sifra</h4>
      </div>
      );
    }
    /**
     * 
     * =======
          <div className="loginbox">
            <img src={avatar} className="avatar"/>
>>>>>>> Stashed changes
     */
    return(
        <React.Fragment>
          <div class="loginbox pozadina">
             <h1>Ulogujte se</h1>
             <form>
               <p>Korisnicko ime</p>
               <input onChange={handleUsername} type="text" value={username} placeholder="Unesite korisnicko ime"/>
               <p>Sifra</p>
               <input onChange={handlePassword} type="password" value={password} name="" placeholder="Unesite sifru"/>
               <input onClick={handleSubmit} type="submit" name="" value="Ulogujte se"/>
               <a href='#'>Izgubili ste lozinku?</a><br/>
               <a href='/registracija'>Nemate nalog?</a>
             </form>
              <div className="message" style={{background: submitted ? 'green':'red'}}>
                {successMessage()}
                {errorUnetMessage()}
                {errorUsernamePasswordMessage()}
              </div>
          </div>
        </React.Fragment>
    );
}

export default Login;