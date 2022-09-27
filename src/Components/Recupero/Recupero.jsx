import React from 'react';
import './Recupero.css'
import medicina from '../../img/medicina.mp4';
import logo from '../../img/Tu Particular2.png';

function Recupero() {
    return (
        <div className='login'>
            <video className='login-video' src={medicina} muted autoPlay loop></video>
            <div className='logoCenter'>
                <img src={logo} alt="Tu particular" srcset="" />
            </div>
            <h1>Recuperar contraseña</h1>
            <form>
                <div className='loginForm'>
                    <input type='email' placeholder='Correo' required />
                    <input type="password" name="contraseña1" id="contraseña1" placeholder='Nueva contraseña' />
                    <input type="password" name="contraseña2" id="contraseña2" placeholder='Repetir contraseña' />
                    <input type='submit' value='Cambiar' />
                </div>
            </form>

        </div>

    );
}

export default Recupero;