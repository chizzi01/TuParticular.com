import React from 'react';
import './Perfil.css'

function PerfilProfesor() {
    return (
        <div className='profesor'>
            <div className='MisClasesBackNavProfesor'>
                <a href="MisClasesProfesor" ><input id='MisClasesProfesorButton' type="button" value="Mis Clases" /></a>
                <a href="AprobarClases" ><input id='MisClasesProfesorButton' type="button" value="Aprobar Clases/Comentarios" /></a>
            </div>
            <h1>Mi Perfil</h1>
            <form>
                <div className='perfil-align'>
                    <label htmlFor="">Nombre: </label>
                    <label htmlFor="">Apellido: </label>
                    <input type='text' placeholder='Titulo' required />
                    <textarea name="exp" id="" cols="30" rows="10" placeholder='Experiencia'></textarea>
                    <input type='submit' value='Guardar' />
                </div>
            </form>

        </div>

    );
}

export default PerfilProfesor;