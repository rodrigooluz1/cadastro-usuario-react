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

//CADASTRA USUÁRIO
export const cadastrausuario = async (formData: FormData) =>  await axios.post(Globais.urlAPIUser, formData)
.then(data => {
    console.log(data)
    alert(`Cadastro realizado com sucesso!`)
    return true
})
.catch(err => {
    alert(err)
    return false
})