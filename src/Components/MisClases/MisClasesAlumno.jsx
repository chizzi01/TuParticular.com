import React from 'react';
import './MisClases.css';
import CardContratada from '../Card/CardContratada';
import axios from 'axios';

class MisClasesAlumno extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clases: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    axios.get('http://localhost:3900/api/clases/clasesAlumno', {
      headers: { "x-auth-token": localStorage.getItem('token') }
    }).then(res => {
      let clases = res.data;
      this.setState({ clases });
    }).catch(err => {
      console.log(err);
    })
  }

  render() {
    return (
      <div className="Clases">
        <h1>Mis Clases</h1>
        <div className='cards-container'>
          {this.state.clases.map((clase) => (
            <div className='card-align'>
              <CardContratada claseData={clase} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}


export default MisClasesAlumno;