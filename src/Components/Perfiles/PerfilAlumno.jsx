import React from 'react';
import './Perfil.css'

function PerfilAlumno() {
    return (
        <div className='alumno'>
            <h1>Mi Perfil</h1>
            <form>
                <div className='perfil-align'>
                    <input type='date' placeholder='Fecha de nacimiento' required />
                    <input type="text" placeholder='Estudio cursado' />
                    <select name="nivel" id="nivel">
                        <option value="Primario">Primario</option>
                        <option value="Secundario">Secundario</option>
                        <option value="Terciario">Terciario</option>
                        <option value="Universitario">Universitario</option>
                    </select>
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="">Finalizado</label>
                    <input type='submit' value='Guardar' />
                </div>
            </form>

        </div>

    );
}

export default PerfilAlumno;