import React from 'react'
import { useParams } from 'react-router-dom';
import FormPer from '/laragon/www/MarvelAPI/src/Components/FormPer'

const Edit = () => {
  const {id} = useParams();
  return (
    <FormPer id={id} title='Editar personaje'></FormPer>
  )
}

export default Edit
