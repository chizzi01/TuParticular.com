import React from 'react';
import './Recupero.css'
import medicina from '../../img/medicina.mp4';
import logo from '../../img/Tu Particular2.png';
import axios from 'axios';

class RecuperoPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            contraseña1: '',
            contraseña2: '',
            email: '',

        }

        this.changeContraseña1 = this.changeContraseña1.bind(this);
        this.changeContraseña2 = this.changeContraseña2.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    changeContraseña1 = (event) => {
        this.setState({ contraseña1: event.target.value })
    }

    changeContraseña2 = (event) => {
        this.setState({ contraseña2: event.target.value })
    }

    componentDidMount() {
        this.state.email = localStorage.getItem('email');
    }


    onSubmit = (event) => {
        event.preventDefault();
        if (this.state.contraseña1 === this.state.contraseña2) {
            console.log(this.state.email);
            const cambiar = {
                newPassword: this.state.contraseña1,
                email: this.state.email,
            }
            axios.post('http://localhost:3900/api/usuarios/changePassword', cambiar)
                .then(res => {
                    alert('Se ha cambiado la contraseña');
                    window.location = '/Login';
                    localStorage.removeItem('email');
                }).catch(err => {
                    console.log(err);
                    alert('No se ha podido cambiar la contraseña');
                });
        }
    }


    render() {
        return (
            <div className='login'>
                <video className='login-video' src={medicina} muted autoPlay loop></video>
                <div className='logoCenter'>
                    <img src={logo} alt="Tu particular" srcset="" />
                </div>
                <h1>Recuperar contraseña</h1>
                <form onSubmit={this.onSubmit}>
                    <div className='loginForm'>
                        <input type="password" name="contraseña1" id="contraseña1" placeholder='Nueva contraseña' onChange={this.changeContraseña1} />
                        <input type="password" name="contraseña2" id="contraseña2" placeholder='Repetir contraseña' onChange={this.changeContraseña2}/>
                        <input type='submit' value='Cambiar' />
                    </div>
                </form>

            </div>

        );
    }
}

export default RecuperoPassword;