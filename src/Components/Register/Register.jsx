import React from 'react';
import './Register.css'
import students from '../../img/students.mp4';
import logo from '../../img/Tu Particular2.png';
import axios from 'axios';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            apellido: '',
            email: '',
            password: '',
            telefono: '',
            rol: ''
        }

        this.changeNombre = this.changeNombre.bind(this);
        this.changeApellido = this.changeApellido.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changeContraseña = this.changeContraseña.bind(this);
        this.changeTelefono = this.changeTelefono.bind(this);
        this.changeRol = this.changeRol.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }



    changeNombre = (event) => {
        this.setState({ nombre: event.target.value })
    }

    changeApellido = (event) => {
        this.setState({ apellido: event.target.value })
    }

    changeEmail = (event) => {
        this.setState({ email: event.target.value })
    }

    changeContraseña = (event) => {
        this.setState({ password: event.target.value })
    }

    changeTelefono = (event) => {
        this.setState({ telefono: event.target.value })
    }

    changeRol = (event) => {
        this.setState({ rol: event.target.value })
    }

    onSubmit = (event) => {
        event.preventDefault();
        const registro = {
            nombre: this.state.nombre,
            apellido: this.state.apellido,
            email: this.state.email,
            password: this.state.password,
            telefono: this.state.telefono,
            rol: this.state.rol
        }
        let ModalAlert = document.getElementById('ModalAlert');
        if (registro.rol === '') {
            ModalAlert.classList.remove('hide');
            ModalAlert.innerHTML = '<p>Seleccione un Rol</p>';
            setTimeout(() => {
                ModalAlert.classList.add('hide');
            }, 1500);
        } else {

            // if (registro.rol === 'Alumno') {
            //     axios.post('http://localhost:3900/api/alumnos', registro)
            //         .then(res => console.log(res.data));
            //     this.setState({
            //         nombre: '',
            //         apellido: '',
            //         email: '',
            //         password: '',
            //         telefono: '',
            //         rol: ''
            //     })
            //     window.location = '/Login';
            // }

            // if (registro.rol === 'Profesor') {
            //     axios.post('http://localhost:3900/api/profesores', registro)
            //         .then(res => console.log(res.data));
            //     this.setState({
            //         nombre: '',
            //         apellido: '',
            //         email: '',
            //         password: '',
            //         telefono: '',
            //         rol: ''
            //     })
            //     window.location = '/Login';
            // }

            axios.post('http://localhost:3900/api/usuarios', registro)
            .then(res => {
                console.log(res.status);
                window.location = '/Login';
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


    }

    render() {
        return (
            <div className='login'>
                <video className='login-video' src={students} muted autoPlay loop></video>
                <div className='logoCenter'>
                    <img src={logo} alt="Tu particular" srcset="" />
                </div>
                <h1>Registrarse</h1>
                <div id='ModalAlert' className='hide'>
                    <h1>Datos Incorrectos</h1>
                </div>
                <form onSubmit={this.onSubmit}>
                    <div className='loginForm'>
                        <input type='text' placeholder='Nombre' name='Nombre' value={this.state.nombre} onChange={this.changeNombre} required />
                        <input type='text' placeholder='Apellido' name='Apellido' value={this.state.apellido} onChange={this.changeApellido} required />
                        <input type='email' placeholder='Correo' name='Correo' value={this.state.email} onChange={this.changeEmail} required />
                        <input type="number" placeholder='Telefono' name='Telefono' value={this.state.telefono} onChange={this.changeTelefono} required />
                        <select name="rol" id="rol" value={this.state.rol} onChange={this.changeRol}>
                            <option value="Rol" hidden>Rol</option>
                            <option value="Profesor" name="Profesor">Profesor</option>
                            <option value="Alumno" name="Alumno">Alumno</option>
                        </select>
                        <input type='password' placeholder='Contraseña' name='Contraseña' value={this.state.password} onChange={this.changeContraseña} required />
                        <input type='submit' value='Registrarse' />
                    </div>
                </form>

            </div>

        );
    }

}
export default Register;