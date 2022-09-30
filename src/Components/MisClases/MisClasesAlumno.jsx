import React from 'react';
import './MisClases.css';
import CardContratada from '../Card/CardContratada';

function MisClasesAlumno() {
  return (
    <div className="Clases">
      <h1>Mis Clases</h1>
      <div className='cards-container'>
        <div className='card-align'>
          <CardContratada/>
        </div>
      </div>
    </div>
  );
}


export default MisClasesAlumno;