import React,{useEffect,useRef,useState} from 'react'
import DivAdd from '../../Components/DivAdd'
import { DivTable } from '../../Components/DivTable'
import { Link } from 'react-router-dom'
import { confirmation,sendRequest } from '../../functions'
import { deleteModel } from 'mongoose'
import Divinput from '../../Components/Divinput'
import Modal from '../../Components/Modal'


const Heroes = () => {
  const [heroe,setHeroe] = useState([]);
  const [id,setId]= useState('');
  const [nombre,setNombre] = useState ('');
  const [habilidades,setHabilidades]= useState('');
  const [raza,setRaza] = useState('');
  const [edad,setEdad] = useState('');
  const [imagen,setImagen]= useState('');
  const close= useRef();
  let method = '';
  let url = '';
  const [operation,setOperation] = useState('');
  const [title,setTitle] = useState('');
  const[classLoad,setClassLoad] = useState(['']);
  const[classTable,setClassTable] = useState(['d-none']);
  useEffect(()=>{
    getHeroes(1);
  },[])
  const getHeroes = async() => {
    const res = await sendRequest('GET','','http://localhost:5000/api/marvel','');
    setHeroe(res.results);
    setClassTable('');
    setClassLoad('d-none');
  }
  const deleteHeroe = (id,name)=> {
    confirmation(name,('http://localhost:5000/api/marvel/'+id));
    useEffect(()=>{
      getHeroes();
      window.location.reload('http://localhost:5000/api/marvel');
    },[])
  }
  const clear =()=>{
    setNombre('');
    setHabilidades('');
    setRaza('');
    setEdad('');
    setImagen('');
  }
  const openModal = (op,n,h,r,e,i,hi)=>{
    clear();
    setTimeout(()=> 600);
    setOperation(op);
    setId(hi);
    if (op ==1){
      setTitle('Crear personaje');
    }
    else{
      setTitle('Editar personaje')
      setNombre(n);
      setHabilidades(h);
      setRaza(r);
      setEdad(e);
      setImagen(i);
    }
  }
  const save = async(e)=>{
    e.preventDefault();
    var parametros;
    const form = new FormData();
    
    form.append('nombre',nombre)
    form.append('habilidades',habilidades)
    form.append('raza',raza)
    form.append('imagen',imagen)
    form.append('edad',edad)
    
    if(operation == 1){
      parametros=form;
      method='POST';
      url='http://localhost:5000/api/marvel/'
      
    }
    else{
      parametros=form;
      method='PUT';
      url='http://localhost:5000/api/marvel/'+id;
    }
    const res = await sendRequest(method,parametros,url,'');
    
    if (method=='PUT' && res.status == true){
      close.current.click();
      
    }
    if (res.status == true){
      clear();
      getHeroes();
      setTimeout(()=> 8000);
      window.location.reload('http://localhost:5173/');
    }
  }
    return (
    <div className='container-fluid'>
      <DivAdd>
        <button className='btn btn-danger' data-bs-toggle='modal' data-bs-target='#modalHeroes' 
        onClick={()=>openModal(1)}>
          <i className='fa-solid fa-circle-plus'></i> Agregar
        </button>
      </DivAdd>
      <DivTable col='10' off='1' classLoad={classLoad} classTable={classTable}>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>#</th>
              <th>Heroes</th>
              <th>Habilidades</th>
              <th>Raza</th>
              <th>Edad</th>
              <th>Imagen</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody className='table-group-divider'>
            {heroe.map((row,i)=>(
              <tr key={row.id}>
                <td>{(i+1)}</td>
                <td>{row.nombre}</td>
                <td>{row.habilidades}</td>
                <td>{row.raza}</td>
                <td>{row.edad} años</td>
                <td><img className='d-flex justify-content-center align-items-center' style={{width:100, height:100, borderRadius:25}} src={`http://localhost:5000${row.imagen}`} /></td>
                <td>
                <button className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalHeroes' 
                onClick={()=>openModal(2,row.nombre,row.habilidades,row.raza,row.edad,row.imagen,row._id)}>
                  <i className='fa-solid fa-edit'></i>
                </button>
                </td>
                <td>
                  <button className='btn btn-danger' onClick={()=> deleteHeroe(row._id,row.nombre)}>
                    <i className='fa-solid fa-trash'></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DivTable>
      <Modal title={title} modal='modalHeroes'>
        <div className='modal-body'>
          <form onSubmit={save} encType='multipart/form-data'> 
          <input type="text"  id='nombre' className='form-control mb-3' placeholder='Nombre' value={nombre} onChange={(e)=>setNombre(e.target.value)}/>
            <input type="text" id='habiliades' className='form-control mb-3' placeholder='Habilidades' value={habilidades} onChange={(e)=>setHabilidades(e.target.value)}/>
            <input type="text" id='raza' className='form-control mb-3' placeholder='Raza' value={raza} onChange={(e)=>setRaza(e.target.value)}/>
            <input type="text" id='edad' className='form-control mb-3' placeholder='Edad' value={edad} onChange={(e)=>setEdad(e.target.value)}/>
            <input type="file" id='imagen' accpet='.png, .jpg, .jpeg' className='form-control mb-3' placeholder='IMG' onChange={(e)=>setImagen(e.target.files[0])}/>  <div className='d-grid col-10 mx-auto'>
                <button className='btn btn-dark'>
                <i className='fa-solid fa-save'></i> Guardar</button>
            </div>
            
          </form>
        </div>
        <div className='modal-footer'>
          <button className='btn btn-danger' data-bs-dismiss='modal'
          ref={close}>
            Cerrar
          </button>

        </div>
      </Modal>
    </div>
  )
}

export default Heroes