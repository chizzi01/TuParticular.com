import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import '../Clases/Clases.css';

function AprobarComentarios() {
  const dataClases = [

    { id: 1, cometario: "Muy buena", solicitante: "Manuel Papaya", estado: "Pendiente" },
    { id: 2, cometario: "Malisima", solicitante: "Juan Perez", estado: "Pendiente"},
  ];

  const [data, setData] = useState(dataClases);
  const [modalAprobar, setModalAprobar] = useState(false);
  const [modalRechazar, setModalRechazar] = useState(false);
  const [claseSeleccionada, setClaseSeleccionada] = useState({
    id: '',
    cometario: '',
    solicitante: '',
    estado: ''

  });

  const seleccionarClase = (clase, caso) => {
    setClaseSeleccionada(clase);
    (caso === "Aprobar") ? setModalAprobar(true) : setModalRechazar(true)
  }


  const rechazar = () => {
    var dataNueva = data;
    dataNueva.map(clase => {
      if (clase.id === claseSeleccionada.id) {
        clase.estado = "Rechazado";
      }
    });
    setData(dataNueva);
    setModalRechazar(false);
  }

  const aprobar = () => {
    var dataNueva = data;
    dataNueva.map(clase => {
      if (clase.id === claseSeleccionada.id) {
        clase.estado = "Aprobado";
      }
    });
    setData(dataNueva);
    setModalAprobar(false);
  }



  return (
    <div id='Comentarios'>
      <h1>Aprobar Comentarios</h1>
      <br /><br />
      <div className='responsive-table'>
      <table className='table table-borderer'>
        <thead>
          <tr>
            <th>Cometario</th>
            <th>Solicitante</th>
            <th>Estado</th>


          </tr>
        </thead>
        <tbody>
          {data.map(clase => (
            <tr key={clase.id}>
              <td>{clase.cometario}</td>
              <td>{clase.solicitante}</td>
              <td>{clase.estado}</td>

              <td> <button className='btn btn-success adjustbutton' onClick={() => seleccionarClase(clase, 'Aprobar')}>√</button> {" "}
                <button className='btn btn-danger adjustbutton' onClick={() => seleccionarClase(clase, 'Eliminar')}>X</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <Modal isOpen={modalRechazar}>
        <ModalHeader>
          <div>
            <h3>Eliminar Clase</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          Estas seguro que deseas rechazar este cometario?  {claseSeleccionada && claseSeleccionada.cometario}
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
          Estas seguro que deseas aprobar este comentario? {claseSeleccionada && claseSeleccionada.cometario}
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-success' onClick={() => aprobar()}>Aprobar</button>
          <button className='btn btn-secondary' onClick={() => setModalAprobar(false)}>Cancelar</button>
        </ModalFooter>
      </Modal>
    </div>
  );
}



export default AprobarComentarios;
