import React from 'react';
import './Register.css'
import students from '../../img/students.mp4';
import logo from '../../img/Tu Particular2.png';

function Register() {
    return (
        <div className='login'>
            <video className='login-video' src={students} muted autoPlay loop></video>
            <div className='logoCenter'>
                <img src={logo} alt="Tu particular" srcset="" />
            </div>
            <h1>Registrarse</h1>
            <form>
                <div className='loginForm'>
                    <input type='text' placeholder='Nombre' required />
                    <input type='text' placeholder='Apellido' required />
                    <input type='email' placeholder='Correo' required />
                    <input type="number" placeholder='Telefono' required />
                    <input type='password' placeholder='Contraseña' required />
                    <input type='submit' value='Registrarse' />
                </div>
            </form>

        </div>

    );
}

export default Register;