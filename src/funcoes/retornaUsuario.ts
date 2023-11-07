import axios from "axios";
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

export const retornaUsuario = async (id: string)=>{
        
    const response = await axios.get(`${Globais.urlAPIUser}${id}`);   

    return  response.data  
    
}


