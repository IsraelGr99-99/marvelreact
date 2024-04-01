import Swal from "sweetalert2";
import storage from "./Storage/storage";
import axios from "axios";
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.headers.put['Content-Type'] = 'multipart/form-data';

export const show_alerta = (msj,icon) =>{
    Swal.fire({title:msj, icon:icon, buttonsStyling:true})
}

export const sendRequest = async(method,parametros,url,redir='') => {
    let res;
    await axios ({ method:method,data:parametros,url:url}).then( 
        response=>{
            res=response.data,
            (method != 'GET')? show_alerta(response.data.message,'success'):'',
            setTimeout(()=>
            (redir !== '') ? window.location.href = redir: '',2000)
            
        }).catch((errors) =>{
            let desc='';
            res = errors.response.data,
            errors.response.data.errors.map((e) =>{desc = desc + ' '+ e})
            show_alerta(desc,'error')
            window.location.reload('http://localhost:5173/');
        })
        return res;
}
export const confirmation = async(name,url,redir) => {
    const alert = Swal.mixin({buttonsStyling:true});
    alert.fire({
        title:'¿Estas seguro de eliminar a '+name+' ?',
        icon:'question',showCancelButton:true,
        confirmButtonText:'<i class="fa-solid fa-check"></i> Si, Eliminar',
        cancelButtonText:'<i class="fa-solid fa-ban"></i> No, Cancelar',
    }).then((result)=>{
        if(result.isConfirmed){
            sendRequest('DELETE',{},url,redir);
            window.location.reload('http://localhost:5173/');
        }
    });
}

export default show_alerta;