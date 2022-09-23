import React from 'react';
import './Clases.css';
import Searchbar from '../Searchbar/Searchbar';

function Clases() {
  return (
    <div className="Clases">
      <div className='searchbar-container'>
      <Searchbar/>
      <Card_fisica></Card_fisica>
      <Card_quimica></Card_quimica>
      <Card_historia></Card_historia>
      <Card_literatura></Card_literatura>
      <Card_matematica></Card_matematica>
      </div>
    </div>
  );
}


export default Clases;
