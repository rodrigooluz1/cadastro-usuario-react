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

export const deletaUsuario = async (id: number) => {
    if(confirm("Deseja excluir o usuário")){

        const response = await axios.delete(`${Globais.urlAPIUser}/${id}`)

        const data = response.data
        console.log(data)            

        window.location.reload(); 
        
        alert(`O cadastro foi excluído!`)
    }
}