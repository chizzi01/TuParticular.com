import React from 'react';
import './Perfil.css'
import axios from 'axios';


class PerfilAlumno extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            apellido: '',
            fechadenacimiento: '',
            estudios: '',
            nivel: '',
            estudiosfinalizados: false,

        }

        this.changeFechaDeNacimiento = this.changeFechaDeNacimiento.bind(this);
        this.changeEstudios = this.changeEstudios.bind(this);
        this.changeNivel = this.changeNivel.bind(this);
        this.changeEstudiosFinalizados = this.changeEstudiosFinalizados.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    componentDidMount() {
        this.getData();
    }



    changeFechaDeNacimiento = (event) => {
        this.setState({ fechadenacimiento: event.target.value})
    }

    changeEstudios = (event) => {
        this.setState({ estudios: event.target.value })
    }

    changeNivel = (event) => {
        this.setState({ nivel: event.target.value })
    }

    changeEstudiosFinalizados = (event) => {
        let estudiosfinalizados = document.getElementById('checkEstudios').checked;
        this.setState({ estudiosfinalizados: estudiosfinalizados })
    }



    onSubmit = (event) => {
        event.preventDefault();
        const fecha =new Date(this.state.fechadenacimiento).toISOString();
        const profile = {
            fechadenacimiento: fecha,
            estudios: this.state.estudios,
            nivel: this.state.nivel,
            estudiosfinalizados: this.state.estudiosfinalizados
        }

        axios.put('http://localhost:3900/api/profile', profile, {
            headers: {
                "x-auth-token": localStorage.getItem('token')
            }

        }

        )
            .then(res => {
                window.location = '/Alumno';
                alert('Perfil actualizado');
            }).catch(err => {
                if (err.code === "ERR_BAD_REQUEST") {
                    console.log(err);
                    window.location = '/Login';
                }
            });
    }


    getData = async () => {
        await axios.get('http://localhost:3900/api/profile', {
            headers: { "x-auth-token": localStorage.getItem('token') }
        })
            .then(res => {
                this.setState({
                    nombre: res.data.nombre,
                    apellido: res.data.apellido,
                    fechadenacimiento: res.data.fechadenacimiento,
                    estudios: res.data.estudios,
                    nivel: res.data.nivel
                })
                if (res.data.estudiosfinalizados === true) {
                    document.getElementById('checkEstudios').checked = true;
                }
            })
    }





    render() {
        return (
            <div className='alumno' >
                <div className='MisClasesBackNav'>
                    <a href="MisClasesAlumno" ><input id='MisClasesButton' type="button" value="Mis Clases" /></a>
                </div>
                <h1>Mi Perfil</h1>
                <form onSubmit={this.onSubmit}>
                    <div className='perfil-align'>
                        <label htmlFor="">Nombre: {this.state.nombre} </label>
                        <label htmlFor="">Apellido: {this.state.apellido}</label>
                        <label htmlFor="">Fecha de nacimiento: {this.state.fechadenacimiento}</label>
                        <input type='date' placeholder='Fecha de nacimiento' onChange={this.changeFechaDeNacimiento}/>
                        <input type="text" placeholder='Estudio cursado' onChange={this.changeEstudios} value={this.state.estudios} />
                        <select name="nivel" id="nivel" onChange={this.changeNivel} value={this.state.nivel}>
                            <option value="Nivel">Nivel</option>
                            <option value="Primario">Primario</option>
                            <option value="Secundario">Secundario</option>
                            <option value="Terciario">Terciario</option>
                            <option value="Universitario">Universitario</option>
                        </select>
                        <div className='progreso'>
                            <input type="checkbox" id="checkEstudios" onChange={this.changeEstudiosFinalizados} value={this.state.estudiosfinalizados} />
                            <p>Estudio finalizado</p>
                        </div>
                        <input type='submit' value='Guardar' />
                    </div>
                </form>

            </div>

        );
    }
}

export default PerfilAlumno;