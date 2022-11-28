import React from 'react';
import './Login.css'
import students from '../../img/students.mp4';
import logo from '../../img/Tu Particular2.png';
import axios from 'axios';


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''

        }

        this.changeEmail = this.changeEmail.bind(this);
        this.changeContraseña = this.changeContraseña.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }



    changeEmail = (event) => {
        this.setState({ email: event.target.value })
    }

    changeContraseña = (event) => {
        this.setState({ password: event.target.value })
    }

    onSubmit = (event) => {
        event.preventDefault();
        const login = {
            email: this.state.email,
            password: this.state.password
        }
        let ModalAlert = document.getElementById('ModalAlert');

        axios.post('http://localhost:3900/api/signin', login)
            .then(res => {
                localStorage.setItem('token', res.data.token);
                console.log(res.status);
                window.location = '/Clases';
            }).catch(err => {
                if (err.code === "ERR_BAD_REQUEST") {
                    let errores = "";
                    err.response.data.errors.forEach(error => {
                        errores += error.msg + " ";
                    });
                    ModalAlert.classList.remove('hide');
                    ModalAlert.innerHTML = '<p>' + errores + '</p>';
                    setTimeout(() => {
                        ModalAlert.classList.add('hide');
                    }, 1500);
                };
            });

    }




    render() {
        return (
            <div className='login'>
                <video className='login-video' src={students} muted autoPlay loop></video>
                <div className='logoCenter'>
                    <img src={logo} alt="Tu particular" srcset="" />
                </div>
                <h1>Iniciar Sesión</h1>
                <div id='ModalAlert' className='hide'>
                    <h1>Datos Incorrectos</h1>
                </div>
                <form onSubmit={this.onSubmit}>
                    <div className='loginForm'>
                        <input type='email' placeholder='Mail' value={this.state.email} onChange={this.changeEmail} required />
                        <input type='password' placeholder='Contraseña' value={this.state.password} onChange={this.changeContraseña} required />
                        <a className='olvido' href="Recupero">Olvidé mi contraseña</a>
                        <input type='submit' value='Iniciar Sesión' />
                        <label htmlFor="">O</label>
                        <a href="Registrarse"><input type='button' value='Registrarse' /></a>
                    </div>
                </form>

            </div>

        );
    }
}

export default Login;