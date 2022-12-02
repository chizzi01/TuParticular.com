import React, { useState } from 'react';
import './MisClases.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import axios from 'axios';



function MisClasesProfesor() {
  const dataClases = [
  ];

  const [data, setData] = useState(dataClases);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [claseSeleccionada, setClaseSeleccionada] = useState({
    nombre: '',
    descripcion: '',
    duracion: '',
    precio: '',
    frecuencia: '',
    tipo: ''
  });

  React.useEffect(() => {
    getData();
  }, []);


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
    axios.put('http://localhost:3900/api/clases/update/' + claseSeleccionada.id, claseSeleccionada,{
      headers: { "x-auth-token": localStorage.getItem('token') }
    }).then(res => {
    data.map(clase => {
      if (clase.id === claseSeleccionada.id) {
        clase.nombre = claseSeleccionada.nombre || clase.nombre;
        clase.descripcion = claseSeleccionada.descripcion || clase.descripcion;
        clase.duracion = claseSeleccionada.duracion || clase.duracion;
        clase.precio = claseSeleccionada.precio || clase.precio;
        clase.frecuencia = claseSeleccionada.frecuencia || clase.frecuencia;
        clase.tipo = claseSeleccionada.tipo || clase.tipo;
      }
      setData(data);
      setModalEditar(false);
    });
  }).catch(err => {
    console.log(err);
    alert("No se pudo editar la clase");
  });

  }

  const eliminar = () => {
    axios.delete('http://localhost:3900/api/clases/' + claseSeleccionada.id,{
      headers: { "x-auth-token": localStorage.getItem('token') }
    })
    .then (response => {
      setData(data.filter(clase => clase.id !== response.data._id));
      setModalEliminar(false);
    }) .catch (error => {
      alert("No se pudo eliminar la clase");
      console.log(error);
    } )
  }

  const abrirModalInsertar = () => {
    setClaseSeleccionada(null);
    setModalInsertar(true);
  }

  const insertar = () => {
    axios.post('http://localhost:3900/api/clases', claseSeleccionada, {
      headers: { "x-auth-token": localStorage.getItem('token') }
    }).then(res => {
      claseSeleccionada.id = res.data.id;
      claseSeleccionada.nombre = res.data.nombre;
      claseSeleccionada.descripcion = res.data.descripcion;
      claseSeleccionada.duracion = res.data.duracion;
      claseSeleccionada.precio = res.data.precio;
      claseSeleccionada.frecuencia = res.data.frecuencia;
      claseSeleccionada.tipo = res.data.tipo;
      setData(data.concat(claseSeleccionada));
      setModalInsertar(false);
    }).catch(err => {
      console.log(err);
      alert("Error al insertar");
    })
  }

  const getData = () => {
    axios.get('http://localhost:3900/api/clases', {
      headers: { "x-auth-token": localStorage.getItem('token') }
    }).then(res => {
      let clases = res.data;
      clases = clases.map(clase => 
        ({
          id: clase._id,
          nombre: clase.nombre,
          descripcion: clase.descripcion,
          duracion: clase.duracion,
          precio: clase.precio,
          frecuencia: clase.frecuencia,
          tipo: clase.tipo
        })
      );
      setData(data.concat(...clases));
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <div id='MisClases'>
      <h1>Clases Creadas</h1>
      <button id='buttonCrear' className="btn btn-success" onClick={() => abrirModalInsertar()}>Crear</button>
      <br /><br />
      <table className='table table-borderer'>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Duracion</th>
            <th>Precio</th>
            <th>Frecuencia</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {data.map(clase => (
            <tr key={clase.id}>
              <td>{clase.nombre}</td>
              <td>{clase.descripcion}</td>
              <td>{clase.duracion}</td>
              <td>{"$" + clase.precio}</td>
              <td>{clase.frecuencia}</td>
              <td>{clase.tipo}</td>
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

            <select className='form-control' name='frecuencia' value={claseSeleccionada && claseSeleccionada.frecuencia} onChange={handleChange}>
              <option value="Frecuencia">Frecuencia</option>
              <option value="Unica">Unica</option>
              <option value="Semanal">Semanal</option>
              <option value="Mensual">Mensual</option>
            </select>
            <br />
            <select className='form-control' name='tipo' value={claseSeleccionada && claseSeleccionada.tipo} onChange={handleChange}>
              <option value="Clase">Tipo de clase</option>
              <option value="Individual">Individual</option>
              <option value="Grupal">Grupal</option>
            </select>
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
          Estas seguro que deseas eliminar la clase: {claseSeleccionada && claseSeleccionada.nombre} ?
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-danger' onClick={() => eliminar()}>Sí</button>
          <button className='btn btn-secondary' onClick={() => setModalEliminar(false)}>No</button>
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
            <label>Nombre</label>
            <br />
            <input type='text' className='form-control' name='nombre' value={claseSeleccionada && claseSeleccionada.nombre} onChange={handleChange} required />
            <br />
            <label>Descripcion</label>
            <br />
            <input type='text' className='form-control' name='descripcion' value={claseSeleccionada && claseSeleccionada.descripcion} onChange={handleChange} required />
            <br />
            <label>Duracion</label>
            <br />
            <input type='time' className='form-control' name='duracion' value={claseSeleccionada && claseSeleccionada.duracion} onChange={handleChange} required />
            <br />
            <label>Precio</label>
            <br />
            <input type='number' className='form-control' name='precio' value={claseSeleccionada && claseSeleccionada.precio} onChange={handleChange} required />
            <br />
            <select className='form-control' name='frecuencia' value={claseSeleccionada && claseSeleccionada.frecuencia} onChange={handleChange} required>
              <option value="Frecuencia">Frecuencia</option>
              <option value="Unica">Unica</option>
              <option value="Semanal">Semanal</option>
              <option value="Mensual">Mensual</option>
            </select>
            <br />
            <select className='form-control' name='tipo' value={claseSeleccionada && claseSeleccionada.tipo} onChange={handleChange} required>
              <option value="Clase">Tipo de clase</option>
              <option value="Individual">Individual</option>
              <option value="Grupal">Grupal</option>
            </select>
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