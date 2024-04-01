import React from 'react';
import { useParams } from 'react-router-dom';
import FormHe from '../../Components/FormHe';


export const Edit = () => {
  const {id} = useParams();
  return (
    <FormHe id={id} title='Editar Personaje'></FormHe>
  )
}

export default Edit
