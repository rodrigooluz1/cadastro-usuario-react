import axios from "axios"
import Globais from "../Config/Globais";

axios.interceptors.request.use(
    config => {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        return config;
    },
    error => {            
        return Promise.reject(error)
    }
) 

//EDITA USUÁRIO
export const editaUsuario = async (formData:FormData)=> await axios.put(Globais.urlAPIUser, formData)
.then(data => {
    console.log(data)
    alert(`Cadastro atualizado com sucesso!`)
    return true
})
.catch(err => {
    alert(err)
    return false
})