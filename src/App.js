import './App.css';
import React from 'react';
import video from './img/study.mp4';

function App() {
  return (

    <div className="App">
      <header className="App-header">
      </header>
      <div className='inicio-container'>
      <h1>Encontrá las <br /> mejores clases <br /> particulares</h1>
      <video src={video} muted autoPlay loop playsInline></video>
      
      <div className='container-box'>
      <div className='green-box'>
        <h2>Desde primaria <br /> hasta la <br /> universidad</h2>
        <p>Buscá tus clases acá</p>
      </div>
      </div>
      </div>
    </div>
  );
}

export default App;
