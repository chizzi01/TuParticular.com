import React, { useState } from 'react';
import './MisClases.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';



function MisClasesProfesor() {
  const dataClases = [

    { id: 1, nombre: "Clase 1", descripcion: "Descripcion de la clase 1", duracion: "1 hora", precio: "1000", estado: "Aprobada" },
    { id: 2, nombre: "Clase 2", descripcion: "Descripcion de la clase 2", duracion: "1 hora", precio: "1000", estado: "Aprobada" },
  ];

  const [data, setData] = useState(dataClases);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [claseSeleccionada, setClaseSeleccionada] = useState({
    id: '',
    nombre: '',
    descripcion: '',
    fecha: '',
    duracion: '',
    precio: '',
    estado: ''
  });

  const seleccionarClase = (clase, caso) => {
    setClaseSeleccionada(clase);
    (caso === "Editar") ? setModalEditar(true) : setModalEliminar(true)
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setClaseSeleccionada((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  const editar = () => {
    var dataNueva = data;
    dataNueva.map(clase => {
      if (clase.id === claseSeleccionada.id) {
        clase.nombre = claseSeleccionada.nombre;
        clase.descripcion = claseSeleccionada.descripcion;
        clase.duracion = claseSeleccionada.duracion;
        clase.precio = claseSeleccionada.precio;
        clase.estado = claseSeleccionada.estado;
      }
    });
    setData(dataNueva);
    setModalEditar(false);
  }

  const eliminar = () => {
    setData(data.filter(clase => clase.id !== claseSeleccionada.id));
    setModalEliminar(false);
  }

  const abrirModalInsertar = () => {
    setClaseSeleccionada(null);
    setModalInsertar(true);
  }

  const insertar = () => {
    var valorInsertar = claseSeleccionada;
    valorInsertar.id = data[data.length - 1].id + 1;
    setData(data.concat(valorInsertar));
    setModalInsertar(false);
  }



  return (
    <div className='App'>
      <br />
      <br />
      <br />
      <br />
      <button className="btn btn-success" onClick={() => abrirModalInsertar()}>Crear</button>
      <br /><br />
      <table className='table table-borderer'>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Fecha</th>
            <th>Duracion</th>
            <th>Precio</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {data.map(clase => (
            <tr key={clase.id}>
              <td>{clase.nombre}</td>
              <td>{clase.descripcion}</td>
              <td>{clase.fecha}</td>
              <td>{clase.duracion}</td>
              <td>{clase.precio}</td>
              <td>{clase.estado}</td>
              <td> <button className='btn btn-primary' onClick={() => seleccionarClase(clase, 'Editar')}>Editar</button> {" "}
                <button className='btn btn-danger' onClick={() => seleccionarClase(clase, 'Eliminar')}>Eliminar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={modalEditar}>
        <ModalHeader>
          <div>
            <h3>Editar Clase</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className='form-group'>
            <label>Id</label>
            <br />
            <input type='text' className='form-control' readOnly name='id' value={claseSeleccionada && claseSeleccionada.id} />
            <br />
            <label>Nombre</label>
            <br />
            <input type='text' className='form-control' name='nombre' value={claseSeleccionada && claseSeleccionada.nombre} onChange={handleChange} />
            <br />
            <label>Descripcion</label>
            <br />
            <input type='text' className='form-control' name='descripcion' value={claseSeleccionada && claseSeleccionada.descripcion} onChange={handleChange} />
            <br />
            <label>Duracion</label>
            <br />
            <input type='text' className='form-control' name='duracion' value={claseSeleccionada && claseSeleccionada.duracion} onChange={handleChange} />
            <br />
            <label>Precio</label>
            <br />
            <input type='text' className='form-control' name='precio' value={claseSeleccionada && claseSeleccionada.precio} onChange={handleChange} />
            <br />
            <label>Estado</label>
            <br />
            <input type='text' className='form-control' name='estado' value={claseSeleccionada && claseSeleccionada.estado} onChange={handleChange} />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-primary' onClick={() => editar()}>Actualizar</button>
          <button className='btn btn-danger' onClick={() => setModalEditar(false)}>Cancelar</button>
        </ModalFooter>
      </Modal>

<Modal isOpen={modalEliminar}>
        <ModalHeader>
          <div>
            <h3>Eliminar Clase</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          Estas seguro que deseas eliminar la clase {claseSeleccionada && claseSeleccionada.nombre}
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-danger' onClick={()=> eliminar()}>Sí</button>
          <button className='btn btn-secundary' onClick={() => setModalEliminar(false)}>No</button>
        </ModalFooter>
</Modal>

<Modal isOpen={modalInsertar}>
        <ModalHeader>
          <div>
            <h3>Crear Clase</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className='form-group'>
            <label>Id</label>
            <br />
            <input type='text' className='form-control' readOnly name='id' value={data[data.length-1].id+1} />
            <br />
            <label>Nombre</label>
            <br />
            <input type='text' className='form-control' name='nombre' value={claseSeleccionada && claseSeleccionada.nombre} onChange={handleChange} required/>
            <br />
            <label>Descripcion</label>
            <br />
            <input type='text' className='form-control' name='descripcion' value={claseSeleccionada && claseSeleccionada.descripcion} onChange={handleChange} required/>
            <br />
            <label>Duracion</label>
            <br />
            <input type='text' className='form-control' name='duracion' value={claseSeleccionada && claseSeleccionada.duracion} onChange={handleChange} required/>
            <br />
            <label>Precio</label>
            <br />
            <input type='text' className='form-control' name='precio' value={claseSeleccionada && claseSeleccionada.precio} onChange={handleChange} required/>
            <br />
            <label>Estado</label>
            <br />
            <input type='text' className='form-control' name='estado' value={claseSeleccionada && claseSeleccionada.estado} onChange={handleChange} required/>
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-primary' onClick={() => insertar()}>Crear</button>
          <button className='btn btn-danger' onClick={() => setModalInsertar(false)}>Cancelar</button>
        </ModalFooter>

</Modal>
    </div>
  );
}



export default MisClasesProfesor;