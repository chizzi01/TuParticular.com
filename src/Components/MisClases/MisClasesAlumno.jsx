import React from 'react';
import './MisClases.css';
import CardClases from '../Card/Card';

function MisClasesAlumno() {
  return (
    <div className="Clases">
      <div className='cards-container'>
        <div className='card-align'>
          <CardClases/>
        </div>
      </div>
    </div>
  );
}


export default MisClasesAlumno;