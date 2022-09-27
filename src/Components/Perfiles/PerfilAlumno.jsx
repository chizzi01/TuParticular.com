import React from 'react';
import './Perfil.css'

function PerfilAlumno() {
    return (
        <div className='alumno'>
            <h1>Mi Perfil</h1>
            <form>
                <div className='perfil-align'>
                <label htmlFor="">Nombre: </label>
                 <label htmlFor="">Apellido: </label>
                    <label htmlFor="">Fecha de nacimiento</label>
                    <input type='date' placeholder='Fecha de nacimiento' required />
                    <input type="text" placeholder='Estudio cursado' />
                    <select name="nivel" id="nivel">
                        <option value="Nivel">Nivel</option>
                        <option value="Primario">Primario</option>
                        <option value="Secundario">Secundario</option>
                        <option value="Terciario">Terciario</option>
                        <option value="Universitario">Universitario</option>
                    </select>
                    <div className='progreso'>
                        <input type="checkbox" name="" id="" />
                        <p>Estudio finalizado</p>
                    </div>
                    <input type='submit' value='Guardar' />
                </div>
            </form>

        </div>

    );
}

export default PerfilAlumno;