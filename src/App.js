import React from 'react';
import Clases from './Components/Clases/Clases';
import { Routes, Route } from 'react-router-dom';
import Inicio from './Components/Inicio/Inicio';
import Login from './Components/Login/Login';
import Navbar from './Components/Navbar/Navbar';
import Register from './Components/Register/Register';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/Inicio" element={<Inicio />} />
        <Route path="/Clases" element={<Clases />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Registrarse" element={<Register />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
