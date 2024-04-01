import React,{useEffect,useState,useRef} from 'react'
import { sendRequest } from '../functions'
import Divinput from './Divinput'

const FormHe = (params) => {
    const [name,setName] = useState('');
    const NameInput = useRef('');
    let method = 'POST';
    let url = 'http://localhost:5000/api/marvel/';
    let redirect = '';
    useEffect (()=> {
        NameInput.current.focus();
        getHeroe();
    },[]);
    const getHeroe = async()=> {
        if(params.id!==null){
            const res = await sendRequest('GET','',(url+'/'+params.id));
            setName(res.data.name);
        }
    }
    const save = async(e) =>{
        e.preventDefault();
        if(params.id !==null){
            method='PUT';
            url='http://localhost:5000/api/marvel/'+params.id
        }
        const res = await sendRequest(method,{name:name},url,redirect)
        if (method == 'POST' && res.status == true){
            setName('');
        }
        
    }
  return (
    <div className='container-fluid'>
        <div className='row mt-5'>
            <div className='col-md-4 offset-md-4'>
                <div className='card border border-danger'>
                    <div className='card-header bg-danger border border-danger'>
                        {params.title}
                    </div>
                    <div className='card-body'>
                        <form onSubmit={save}>
                            <Divinput type='text' icon='fa-building'
                            value={name} className='form-control'
                            placeholder='Nombre' required='required'
                            ref={NameInput}
                            handleChange={(e)=>setName(e.target.value)}/>
                            <div className='d-grid col-10 mx-auto'>
                                <button className='btn btn-dark'>
                                <i className='fa-solid fa-save'></i>
                                Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FormHe