import React,{useEffect,useState,useRef} from 'react';
import { sendRequest } from '../functions';
import DivInput from '../DivInput';
import { AxiosHeaders } from 'axios';

const FormPer = (params) => {
  const [name,setName] = useState ('');
  const NameInput = useRef();
  let url = '/api/marvel';
  let method = 'POST';
  let redirect = '';
  useEffect( () =>{
    NameInput.current.focus();
    getPersonaje();
  },[]);

  const getPersonaje = async()  =>{
    if(params.id != null){
        const res = await sendRequest('GET','',(url+'/'+params.id))
        setName(res.data.name);
    }   
  } 
  const save  = async(e) =>{
    e.preventDefault();
    if(params.id !== null){
        method= 'PUT';
        url = 'api/marvel'+params,id;
        redirect = '/';
    }
    const res = await sendRequest(method,{name:name},url,redirect);
    if(method == 'POST' && res.status == true){
        setName('')
    }
  }
    return (
    <div className='container-fluid'>
        <div className='row mt-5'>
            <div className='col-md-4 offset-md-4'>
                <div className='card border border-info'>
                    <div className='card-header bg-info border border-info'>
                        {params.title}
                    </div>
                    <div className='card-body'>
                        <form onSubmit={save}>
                            <DivInput></DivInput>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FormPer
