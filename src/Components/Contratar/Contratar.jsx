import React from 'react';
import './Contratar.css'
import medicina from '../../img/medicina.mp4';
import logo from '../../img/Tu Particular2.png';
let materia= ""

function Recupero() {
    return (
        <div className='login'>
            <video className='login-video' src={medicina} muted autoPlay loop></video>
            <div className='logoCenter'>
                <img src={logo} alt="Tu particular" srcset="" />
            </div>
            <h1 className='contratar-h1'>Contratar clase</h1>
            <form>
                <div className='loginForm'>
                    <h3>Clase: {materia}</h3>
                    <input type='email' placeholder='Correo' required />
                    <input type="number" placeholder='Telefono' required/>
                    <label htmlFor="">Horario de contacto</label>
                    <input type="time" name="" id="" required/>
                    <textarea name="" id="" cols="30" rows="5" placeholder='Motivo'></textarea>
                    <input type='submit' value='Contratar' />
                </div>
            </form>

        </div>

    );
}

export default Recupero;