import './App.css';
import React from 'react';
import video from './img/study.mp4';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <h1>Encontrá las <br /> mejores clases <br /> particulares</h1>
      <video src={video} muted autoPlay loop playsInline></video>
    </div>
  );
}

export default App;
