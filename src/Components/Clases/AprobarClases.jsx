import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Clases.css';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import AprobarComentarios from '../AprobarComentarios/AprobarComentarios';
import axios from 'axios';

function AprobarClases() {
  const dataClases = [
  ];

  const [data, setData] = useState(dataClases);
  const [modalAprobar, setModalAprobar] = useState(false);
  const [modalRechazar, setModalRechazar] = useState(false);
  const [claseSeleccionada, setClaseSeleccionada] = useState({
    id: '',
    nombreClase: '',
    email: '',
    telefono: '',
    horario: '',
    motivo: ''

  });

  React.useEffect(() => {
    getData();
  }, []);


  const seleccionarClase = (clase, caso) => {
    setClaseSeleccionada(clase);
    (caso === "Aprobar") ? setModalAprobar(true) : setModalRechazar(true)
  }


  const rechazar = () => {
    console.log(claseSeleccionada);
    axios.put('http://localhost:3900/api/clases/rechazar', claseSeleccionada, {
      headers: { "x-auth-token": localStorage.getItem('token') }
    })
      .then(response => {
        var dataNueva = data;
        dataNueva.map(clase => {
          if (clase.claseId === claseSeleccionada.claseId) {
            dataNueva.splice(dataNueva.indexOf(clase), 1);
          }
        });
        setData(dataNueva);
        setModalRechazar(false);
      }).catch(error => {
        console.log(error);
        alert("Error al rechazar la clase");
      })
  }

  const aprobar = () => {
    console.log(claseSeleccionada);
    axios.put('http://localhost:3900/api/clases/aprobar', claseSeleccionada, {
      headers: { "x-auth-token": localStorage.getItem('token') }
    })
      .then(response => {
        var dataNueva = data;
        dataNueva.map(clase => {
          if (clase.claseId === claseSeleccionada.claseId) {
            dataNueva.splice(dataNueva.indexOf(clase), 1);
          }
        });
        setData(dataNueva);
        setModalAprobar(false);
      }).catch(error => {
        console.log(error);
        alert("Error al aprobar la clase");
      })
  }

  const getData = () => {
    axios.get('http://localhost:3900/api/clases/solicitudes', {
      headers: { "x-auth-token": localStorage.getItem('token') }
    }).then(res => {
      let solicitudes = res.data;
      setData(data.concat(...solicitudes));
    })
  }

  return (
    <div id='MisClases'>
      <h1>Aprobar Clases</h1>
      <br /><br />
      <div className='responsive-table'>
        <table className='table table-borderer'>
          <thead>
            <tr>
              <th>Clase</th>
              <th>Mail</th>
              <th>Telefono</th>
              <th>Horario</th>
              <th>Motivo</th>
            </tr>
          </thead>
          <tbody>
            {data.map(clase => (
              <tr key={clase.claseId}>
                <td>{clase.nombreClase}</td>
                <td>{clase.email}</td>
                <td>{clase.telefono}</td>
                <td>{clase.horario}</td>
                <td>{clase.motivo}</td>

                <td> <button className='btn btn-success adjustbutton' onClick={() => seleccionarClase(clase, 'Aprobar')}>√</button> {" "}
                  <button className='btn btn-danger adjustbutton' onClick={() => seleccionarClase(clase, 'Eliminar')}>X</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AprobarComentarios />

      <Modal isOpen={modalRechazar}>
        <ModalHeader>
          <div>
            <h3>Eliminar Clase</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          Estas seguro que deseas rechazar esta solicitud:  {claseSeleccionada && claseSeleccionada.nombre} ?
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-danger' onClick={() => rechazar()}>Sí</button>
          <button className='btn btn-secondary' onClick={() => setModalRechazar(false)}>Cancelar</button>
        </ModalFooter>
      </Modal>


      <Modal isOpen={modalAprobar}>
        <ModalHeader>
          <div>
            <h3>Aprobar Clase</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          Estas seguro que deseas aprobar esta solicitud: {claseSeleccionada && claseSeleccionada.nombre} ?
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-success' onClick={() => aprobar()}>Aprobar</button>
          <button className='btn btn-secondary' onClick={() => setModalAprobar(false)}>Cancelar</button>
        </ModalFooter>
      </Modal>
    </div>
  );
}



export default AprobarClases;
