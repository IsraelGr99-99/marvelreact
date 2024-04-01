import React, { useEffect, useRef, useState } from 'react';
import DivAdd from '/laragon/www/MarvelAPI/src/Components/DivAdd';
import DivTable from '/laragon/www/MarvelAPI/src/Components/DivTable';
import { Link } from 'react-router-dom';
import {cofirmation,sendRequest} from '/laragon/www/MarvelAPI/src/functions';

const index = () => {
    const [personaje,setPersonaje] = useState([]);
    const [id,setId] = useState('');
    const [name,setName] = useState('');
    const [habilidades,setHabilidades] = useState('');
    const [raza,setRaza] = useState('');
    const [edad,setEdad] = useState('');
    const [imagen,setImagen] = useState('');
    const [title,setTitle] = useState('');
    const [personajeId,setPersonajeId] = useState('');
    const [classLoad,setClassLoad] = useState('');
    const [classTable,setClassTable] = useState('');
    const NameInput = useRef();
    const close = useRef();
    let method = '';
    let url = '';
    let redir = '';

    useEffect( () =>{
      
    })
  return (
    <div className='container-fluid'>
      <DivAdd>
        <Link to='create' className='btn btn-primary'>
          <i className='fa-solid fa-circle-plus'></i>
        </Link>
      </DivAdd>
      <DivTable col='6' off='3' classLoad={classLoad} classTable={classTable}>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Habilidades</th>
              <th>Raza</th>
              <th>Imagen</th>
              <th>Edad</th>
            </tr>
          </thead>
          <tbody className='table-group-divider'>
            {Marvel.map((row, i) => (
              <tr key={row.id}>
                <td> {(i+1)} </td>
                <td> {row.name} </td>
                <td>
                  <Link to={'/edit/'+row.id} className='btn btn-warning'>
                  <i className='fa-solid fa-edit'></i>
                  </Link>
                </td>
                <td>
                  <button className='btn btn-danger' onClick={() => deletePersonaje(row.id,row.name)}>
                  <i className='fa-solid fa-trash'></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DivTable>
    </div>
  );
};

export default index;
