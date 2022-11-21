import React from 'react';
import './Perfil.css'

function PerfilProfesor() {
    return (
        <div className='profesor'>
            <div className='MisClasesBackNavProfesor'>
                <a href="MisClasesProfesor" ><input id='MisClasesProfesorButton' type="button" value="Mis Clases" /></a>
                <a href="AprobarClases" ><input id='MisClasesProfesorButton' type="button" value="Aprobar Clases / Comentarios" /></a>
            </div>
            <h1>Mi Perfil</h1>
            <form>
                <div className='perfil-align'>
                    <label id='Nombre' htmlFor="">Nombre: </label>
                    <label id='Apellido' htmlFor="">Apellido: </label>
                    <input id='Titulo' type='text' placeholder='Titulo' required />
                    <textarea id='Experiencia' name="exp" cols="30" rows="10" placeholder='Experiencia'></textarea>
                    <input id='Guardar' type='button' value='Guardar' />
                </div>
            </form>

        </div>

    );
}

export default PerfilProfesor;


// let guardar = document.getElementById('Guardar');
// let Titulo = document.getElementById('Titulo');
// let Experiencia = document.getElementById('Experiencia');
// guardar.addEventListener('click', () => {
//     alert('Datos guardados');
//     Titulo= Titulo.value;
//     Experiencia= Experiencia.value;
// });