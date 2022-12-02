import React from 'react';
import './Contratar.css'
import contratar from '../../img/contratar.jpg';
import logo from '../../img/Tu Particular2.png';
import axios from 'axios';

class Contratar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            telefono: "",
            horario: "",
            motivo: "",
            nombreClase: "",
            idClase: "",
        }
    }

    componentDidMount() {
        const urlParams = new URLSearchParams(window.location.search);
        const idClase = urlParams.get('id');
        const nombreClase = urlParams.get('clase');
        this.setState({ idClase: idClase, nombreClase: nombreClase });
    }

    changeEmail = (event) => {
        this.setState({ email: event.target.value })
    }

    changeTelefono = (event) => {
        this.setState({ telefono: event.target.value })
    }

    changeHorario = (event) => {
        this.setState({ horario: event.target.value })
    }

    changeMotivo = (event) => {
        this.setState({ motivo: event.target.value })
    }

    onSubmit = (event) => {
        event.preventDefault();
        const contratacion = {
            email: this.state.email,
            telefono: this.state.telefono,
            horario: this.state.horario,
            motivo: this.state.motivo,
            idClase: this.state.idClase,
        }

        axios.post('http://localhost:3900/api/clases/contratar', contratacion, {
            headers: {
                "x-auth-token": localStorage.getItem('token')
            }

        }

        )
            .then(res => {
                window.location = '/Clases';
                alert('Contratación realizada');
            }).catch(err => {
                if (err.code === "ERR_BAD_REQUEST") {
                    console.log(err);
                    return alert(err.response.data.msg);
                }
                alert ('Error al contratar');
            });
    }



    render() {
        return (
            <div className='login'>
                <img className='login-video' src={contratar} alt="" />
                <div className='logoCenter'>
                    <img src={logo} alt="Tu particular" srcset="" />
                </div>
                <h1 className='contratar-h1'>Contratar clase</h1>
                <form onSubmit={this.onSubmit}>
                    <div className='loginForm'>
                        <h3 id='contratar-h3'>Clase: {this.state.nombreClase}</h3>
                        <input type='email' placeholder='Correo' required onChange={this.changeEmail}/>
                        <input type="number" placeholder='Telefono' required onChange={this.changeTelefono}/>
                        <label htmlFor="">Horario de contacto</label>
                        <input type="time" name="" id="" onChange={this.changeHorario} required />
                        <textarea name="" id="contratarTextarea" cols="30" rows="5" placeholder='Motivo' onChange={this.changeMotivo}></textarea>
                        <input type='submit' value='Contratar' />
                    </div>
                </form>

            </div>

        );
    }
}

export default Contratar;