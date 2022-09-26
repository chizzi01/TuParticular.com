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
                <div className='green-box'>
                    <h2>Desde primaria <br /> hasta la <br /> universidad</h2>
                    <a href="Clases"><p className='p-clases'>Buscá tus clases acá</p></a>
                </div>
            </div>
        </div>

    );
}

export default Inicio;