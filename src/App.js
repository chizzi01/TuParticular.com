import React from 'react';
import Clases from './Components/Clases/Clases';
import { Routes, Route } from 'react-router-dom';
import Inicio from './Components/Inicio/Inicio';
import Login from './Components/Login/Login';
import Navbar from './Components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/Inicio" element={<Inicio />} />
        <Route path="/Clases" element={<Clases />} />
        <Route path="/Login" element={<Login />} />

      </Routes>
    </div>
  );
}

export default App;
