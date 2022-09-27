import React from 'react';
import video from '../../img/study.mp4';
import './Inicio.css';

function Inicio() {
    return (
        <div className="Inicio" >
            <header className="inicio-header">
      </header>
            <div className='inicio-container'>
                <h1 className='inicio-h1'>Encontrá las <br /> mejores clases <br /> particulares</h1>
                <video className='inicio-video' src={video} muted autoPlay loop playsInline></video>
            </div>
            <div className='container-box'>
                <div className='white-box'>
                    <h2>Más de 1000 clases <br /> y 200 profesores</h2>
                    <div className='white-box-align'>
                    <label htmlFor="">No tenes cuenta?</label>
                    <a href="/Registrarse"><input type="button" value="Registrate" /></a>
                    <label htmlFor="">o</label>
                    <a href="/Login"><input type="button" value="Ingresa" /></a>
                    </div>
                </div>
                <div className='green-box'>
                    <h2>Desde primaria <br /> hasta la <br /> universidad</h2>
                    <a href="Clases"><p className='p-clases'>Buscá tus clases acá</p></a>
                </div>
            </div>
        </div>

    );
}

export default Inicio;