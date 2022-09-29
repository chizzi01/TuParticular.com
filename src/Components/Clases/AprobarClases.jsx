import React from 'react';
import './Clases.css';
import Searchbar from '../Searchbar/Searchbar';
import CardClases from '../Card/Card';
import ModalClases from '../ModalClases/ModalClases';

function AprobarClases() {
  return (
    <div className="Clases">
      <div className='searchbar-container'>
      <Searchbar/>
      <ModalClases/>
      </div>
      <div className='cards-container'>
        <div className='card-align'>
          <CardClases/>
        </div>
        <div className='card-align'>
          <CardClases/>
        </div>
        <div className='card-align'>
          <CardClases/>
        </div>
        <div className='card-align'>
          <CardClases/>
        </div>
        <div className='card-align'>
          <CardClases/>
        </div>
      </div>
    </div>
  );
}


export default AprobarClases;
