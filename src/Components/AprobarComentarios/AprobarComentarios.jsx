import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import '../Clases/Clases.css';
import { set } from 'mongoose';
import axios from 'axios';

function AprobarComentarios() {

  const [data, setData] = useState([]);
  const [modalAprobar, setModalAprobar] = useState(false);
  const [modalRechazar, setModalRechazar] = useState(false);
  const [modalMotivo, setModalMotivo] = useState(false);
  const [comentarioSeleccionado, setComentarioSeleccionado] = useState({
    id: '',
    cometario: '',
    solicitante: '',
  });

  React.useEffect(() => {
    getData();
  }, []);


  const seleccionarComentario = (comentario, caso) => {
    console.log(comentario);
    setComentarioSeleccionado(comentario);
    (caso === "Aprobar") ? setModalAprobar(true) : setModalRechazar(true)
  }


  const rechazar = () => {
    let motivo = document.getElementById("motivo").value;
    if (motivo === "") {
      alert("Debe ingresar un motivo");
      return;
    }
    axios.put(`http://localhost:3900/api/clases/rechazarComentario/${comentarioSeleccionado.id}`, {claseId : comentarioSeleccionado.clase, motivo: motivo }, {
      headers: { "x-auth-token": localStorage.getItem('token') }
    })
      .then(response => {
    var dataNueva = data;
    dataNueva.map(comentario => {
      if (comentario.id === comentarioSeleccionado.id) {
        dataNueva.splice(dataNueva.indexOf(comentario), 1);
      }
    });
    setData(dataNueva);
    setModalMotivo(false);
    setModalRechazar(false);
  }).catch(error => {
    console.log(error);
    alert("Error al aprobar el comentario");
  })
  }

  const aprobar = () => {
    axios.put(`http://localhost:3900/api/clases/aceptarComentario/${comentarioSeleccionado.id}`, {claseId : comentarioSeleccionado.clase }, {
      headers: { "x-auth-token": localStorage.getItem('token') }
    })
      .then(response => {
    var dataNueva = data;
    dataNueva.map(comentario => {
      if (comentario.id === comentarioSeleccionado.id) {
        dataNueva.splice(dataNueva.indexOf(comentario), 1);
      }
    });
    setData(dataNueva);
    setModalAprobar(false);
  }).catch(error => {
    console.log(error);
    alert("Error al aprobar el comentario");
  })
  }

  const getData = () => {
    axios.get('http://localhost:3900/api/clases/comentariosSolicitados', {
      headers: { "x-auth-token": localStorage.getItem('token') }
    })
      .then(response => {
        let comentarios = response.data;
        let dataComentarios = [];
        comentarios.forEach(comentarios => {
          comentarios.forEach(comentario => {
            dataComentarios.push(comentario);
          });
        });
        setData(dataComentarios);
      }).catch(error => {
        console.log(error);
      })
  }


  return (
    <div id='Comentarios'>
      <h1>Aprobar Comentarios</h1>
      <br /><br />
      <div className='responsive-table'>
        <table className='table table-borderer'>
          <thead>
            <tr>
              <th>Comentario</th>
              <th>Solicitante</th>

            </tr>
          </thead>
          <tbody>
            {data.map(comentario => (
              <tr key={comentario.id}>
                <td>{comentario.comentario}</td>
                <td>{comentario.solicitante}</td>

                <td> <button className='btn btn-success adjustbutton' onClick={() => seleccionarComentario(comentario, 'Aprobar')}>√</button> {" "}
                  <button className='btn btn-danger adjustbutton' onClick={() => seleccionarComentario(comentario, 'Eliminar')}>X</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={modalRechazar}>
        <ModalHeader>
          <div>
            <h3>Rechazar comentario</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          Estas seguro que deseas rechazar este cometario?  {comentarioSeleccionado && comentarioSeleccionado.cometario}
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-danger' onClick={() => setModalMotivo(true)}>Sí</button>
          <button className='btn btn-secondary' onClick={() => setModalRechazar(false)}>Cancelar</button>
        </ModalFooter>
      </Modal>


      <Modal isOpen={modalMotivo}>
        <ModalHeader>
          <div>
            <h3>Motivo del rechazo</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          Cual es el motivo?  cometario: "{comentarioSeleccionado && comentarioSeleccionado.cometario}"
        </ModalBody>
        <textarea name="" id="motivo" cols="10" rows="5" placeholder='motivo del rechazo'></textarea>
        <ModalFooter>
          <button className='btn btn-danger' onClick={() => rechazar()}>Rechazar</button>
          <button className='btn btn-secondary' onClick={() => setModalMotivo(false) || setModalRechazar(false)}>Cancelar</button>
        </ModalFooter>
      </Modal>


      <Modal isOpen={modalAprobar}>
        <ModalHeader>
          <div>
            <h3>Aprobar comentario</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          Estas seguro que deseas aprobar este comentario? "{comentarioSeleccionado && comentarioSeleccionado.cometario}""
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
