import React from 'react';
import './Perfil.css'
import axios from 'axios';




class PerfilProfesor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            apellido: '',
            titulo: '',
            experiencia: '',
        }

        this.changeTitulo = this.changeTitulo.bind(this);
        this.changeExperiencia = this.changeExperiencia.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    componentDidMount() {
        this.getData();
    }



    changeTitulo = (event) => {
        this.setState({ titulo: event.target.value })
    }

    changeExperiencia = (event) => {
        this.setState({ experiencia: event.target.value })
    }

    onSubmit = (event) => {
        event.preventDefault();
        const profile = {
            titulo: this.state.titulo,
            experiencia: this.state.experiencia,
        }

        axios.put('http://localhost:3900/api/profile', profile, {
            headers: {
                "x-auth-token": localStorage.getItem('token')
            }

        }

        )
            .then(res => {
                window.location = '/Profesor';
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
                    titulo: res.data.titulo,
                    experiencia: res.data.experiencia
                })
            })
    }





    render() {
        return (
            <div className='profesor'>
                <div className='MisClasesBackNavProfesor'>
                    <a href="MisClasesProfesor" ><input id='MisClasesProfesorButton' type="button" value="Mis Clases" /></a>
                    <a href="AprobarClases" ><input id='MisClasesProfesorButton' type="button" value="Aprobar Clases / Comentarios" /></a>
                </div>
                <h1>Mi Perfil</h1>
                <form onSubmit={this.onSubmit}>
                    <div className='perfil-align'>
                        <label id='Nombre' htmlFor="">Nombre: {this.state.nombre}</label>
                        <label id='Apellido' htmlFor="">Apellido: {this.state.apellido} </label>
                        <input id='Titulo' type='text' placeholder='Titulo' onChange={this.changeTitulo} value={this.state.titulo} required />
                        <textarea id='Experiencia' name="exp" cols="30" rows="10" placeholder='Experiencia' onChange={this.changeExperiencia} value={this.state.experiencia}></textarea>
                        <input id='Guardar' type='button' value='Guardar' />
                    </div>
                </form>

            </div>

        );
    }

}

export default PerfilProfesor;
