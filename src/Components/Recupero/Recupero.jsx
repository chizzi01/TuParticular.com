import React from 'react';
import './Recupero.css'
import medicina from '../../img/medicina.mp4';
import logo from '../../img/Tu Particular2.png';
import axios from 'axios';

class Recupero extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            hash: '',
        }

        this.changeEmail = this.changeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validateHash = this.validateHash.bind(this);

    }

    changeEmail = (event) => {
        this.setState({ email: event.target.value })
    }

    changeHash = (event) => {
        this.setState({ hash: event.target.value })
    }

    validateHash = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3900/api/usuarios/verifyAuth', { hash: this.state.hash, email: this.state.email })
        .then(res => {
            window.localStorage.setItem('email', this.state.email);
            console.log(res);
            window.location = '/RecuperoPassword';
        }).catch(err => {
            if (err.code === "ERR_BAD_REQUEST") {
                console.log(err);
                // window.location = '/Login';
            }
        });
    }


    onSubmit = (event) => {
        event.preventDefault();
        const cambiar = {
            email: this.state.email,
        }
        let ModalAlert = document.getElementById('ModalAlert');
        axios.post('http://localhost:3900/api/usuarios/sendAuth', cambiar)
            .then(res => {
                alert('Se ha enviado un mail a tu casilla');
                let changeTitulo = document.getElementById('changeTitulo');
                let changeForm = document.getElementById('changeForm');
                let changeForm2 = document.getElementById('changeForm2');
                changeTitulo.innerText = 'Ingrese el codigo que le enviamos a su correo';
                changeForm.classList.add('hide');
                changeForm2.classList.remove('hide');
            }).catch(err => {
                if (err.code === "ERR_BAD_REQUEST") {
                    console.log(err);
                    let errores = "";
                    err.response.data.errors.forEach(error => {
                        errores += error.msg + " ";
                    });
                    ModalAlert.classList.remove('hide');
                    ModalAlert.innerHTML = '<p>' + errores + '</p>';
                    setTimeout(() => {
                        ModalAlert.classList.add('hide');
                    }, 1500);
                }
            });
    }

    render() {
        return (
            <div className='login'>
                <video className='login-video' src={medicina} muted autoPlay loop></video>
                <div className='logoCenter'>
                    <img src={logo} alt="Tu particular" srcset="" />
                </div>
                <h1 id='changeTitulo'>Ingresa un mail valido</h1>
                <div id='ModalAlert' className='hide'>
                    <h1>Datos Incorrectos</h1>
                </div>
                <form id='changeForm' onSubmit={this.onSubmit}>
                    <div className='loginForm'>
                        <input type='email' placeholder='Correo' autoFocus onChange={this.changeEmail} required />
                        <input type='submit' value='Enviar' />
                    </div>
                </form>

                <form id='changeForm2' className='hide' onSubmit={this.validateHash}>
                    <div className='loginForm'>
                        <input type='text' placeholder='Codigo' onChange={this.changeHash} required />
                        <input type='submit' value='Enviar' />
                    </div>
                </form>

            </div>

        );
    }
}

export default Recupero;