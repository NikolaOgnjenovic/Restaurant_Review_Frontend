import React, { Profiler } from 'react'
import './profil.css'

const Profil = () => {
    return(
        <React.Fragment>
            <div>
                <div class="profilebox">
                    <h1>Vas profil:</h1>
                    <form class="informacije">
                        <div class="poljezatekst">
                            <label>Korisnicko ime:</label>
                            <p id="username"></p>
                        </div>
                        <hr/>
                        <div class="poljezatekst">
                            <label>E-mail adresa:</label>
                            <p id="sifra"></p>
                        </div>
                        <hr/>
                        <div class="poljezatekst">
                            <label>Broj lajkova:</label>
                            <p id="lajkovi"></p>
                        </div>
                        <input type="submit" name="" value="Izlogujte se" />
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Profil;
