import React from 'react';
import './Perfil.css'

function PerfilProfesor() {
    return (
        <div className='profesor'>
            <h1>Mi Perfil</h1>
            <form>
                <div className='perfil-align'>
                    <input type='text' placeholder='Titulo' required />
                    <textarea name="exp" id="" cols="30" rows="10" placeholder='Experiencia'></textarea>
                    <input type='submit' value='Guardar' />
                </div>
            </form>

        </div>

    );
}

export default PerfilProfesor;