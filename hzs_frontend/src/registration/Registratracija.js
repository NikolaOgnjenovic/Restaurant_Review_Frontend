import {useEffect, useState} from "react";

import "./registracija_stranica.css";

const Registracija = () => {
    const BASE_URL = 'https://hrana-u-blizini-api.herokuapp.com/user/';
    const[users, setUsers] = useState([]);

    useEffect(() => {
      const getData = () => {
        fetch(BASE_URL)
          .then((response) => response.json())
          .then((data) => setUsers(data));
      };
      getData();
    }, []);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [submitted, setSubmitted] = useState(false);
    const [errorUnet, setErrorUnet] = useState(false);
    const [errorUsername, setErrorUsername] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorAccount, setErrorAccount] = useState(false);

    const usernameRegex = RegExp(/^[a-zA-Z0-9]+$/);
    const emailRegex = RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
    const passwordRegex = RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);

    const proveraAccounta = (username1, email1) => {
        for(let i = 0;i < users.length;i++) {
            if(users[i].username === username1 || users[i].email === email1)
                return true;
        }
        return false;
    }

    const addNewUser = (email1, password1, username1) => {
        fetch(BASE_URL, {
            method: "POST",
            body: JSON.stringify({
              email: email1,
              password: password1,
              username: username1,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          })
            .then((response) => response.json())
            .then((data) => {
              let newUsers = [...users, data];
              setUsers(newUsers);
            });
        setEmail("");
        setUsername("");
        setUsername("");
        
    }

    const handleUsername  = (e) => {
        setUsername(e.target.value);
        setSubmitted(false);
    }
    const handlePassword  = (e) => {
        setPassword(e.target.value);
        setSubmitted(false);
    }
    const handleEmail  = (e) => {
        setEmail(e.target.value);
        setSubmitted(false);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(username === '' || password === '') {
            setErrorUnet(true);
        }
        else if(!usernameRegex.test(username)) {
            setErrorUsername(true);
        }
        else if(!emailRegex.test(email)) {
            setErrorEmail(true);
        }
        else if(!passwordRegex.test(password)) {
            setErrorPassword(true);
        }
        else if(proveraAccounta(username, email)) {
            setErrorAccount(true);
        }
        else {
            setSubmitted(true);
            setErrorUsername(false);
            setErrorPassword(false);
            setErrorEmail(false);
            setErrorUnet(false);
            setErrorAccount(false);
            addNewUser(email, password, username);
        }
    }

    const successMessage = () => {
        return (<div className="success" style={{display: submitted ? '' : 'none',}}>
          <h4>Uspesno ste se registrovali</h4>
        </div>
        );
    }
    const errorUnetMessage = () => {
        return(<div className="error" style={{display: errorUnet ? '' : 'none',}}>
          <h4>Niste uneli sve podatke</h4>
        </div>
        );
    }
    const errorUsernameMessage = () => {
        return(<div className="error" style={{display: errorUsername ? '' : 'none',}}>
          <h4>Nepravilno unet username</h4>
        </div>
        );
    }
    const errorEmailMessage = () => {
        return(<div className="error" style={{display: errorEmail ? '' : 'none',}}>
          <h4>Nepravilno unet email</h4>
        </div>
        );
    }
    const errorPasswordMessage = () => {
        return(<div className="error" style={{display: errorPassword ? '' : 'none',}}>
          <h4>Sifra mora da ima bar 8 karaktera, bar jedno slovo i bar jedan broj</h4>
        </div>
        );
    }
    const errorAccountMessage = () => {
        return(<div className="error" style={{display: errorAccount ? '' : 'none',}}>
          <h4>Nalog sa unetim korisnickim imenom ili mejlom vec postoji</h4>
        </div>
        );
    }
    
    return(
        <div className="registrationbox">
             <h1>Napravite novi profil<br/>za samo par trenutaka:</h1>
             <form>
               <p>Korisnicko ime</p>
               <input onChange={handleUsername} type="text" value={username} name="" placeholder="Unesite korisnicko ime"/>
               <p>E-mail adresa</p>
               <input onChange={handleEmail} type="email" value={email} name=""  placeholder="Unesite e-mail adresu"/>
               <p>Sifra</p>
               <input onChange={handlePassword} type="password" value={password} name="" placeholder="Unesite sifru"/>
               <input onClick={handleSubmit} type="submit" name="" value="Registrujte se"/>
             </form>
             <div className="message" style={{background: submitted ? 'green':'red'}}>
                {successMessage()}
                {errorUnetMessage()}
                {errorAccountMessage()}
                {errorUsernameMessage()}
                {errorEmailMessage()}
                {errorPasswordMessage()}
              </div>
          </div>
    );
}

export default Registracija;