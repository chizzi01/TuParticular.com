import React from 'react';
import './Clases.css';
import Searchbar from '../Searchbar/Searchbar';
import CardClases from '../Card/Card';

function Clases() {
  return (
    <div className="Clases">
      <div className='searchbar-container'>
      <Searchbar/>
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


export default Clases;
