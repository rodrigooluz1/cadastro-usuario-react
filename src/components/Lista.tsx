import '../assets/css/Lista.css'
import  logo from '../assets/image/logo.png'
import icoeditar from '../assets/image/icoeditar.png'
import icodeletar from '../assets/image/icodeletar.png'
import React from 'react';
import Menu from './Menu'

import  Globais  from '../Config/Globais';

import { Navigate } from 'react-router-dom';

import {useQuery} from 'react-query'
import axios from 'axios'

import { Usuario } from '../Model/Usuario';
import { deletaUsuario } from '../funcoes/deletaUsuario';


export default function Lista(){

    
    const [usuarioLogado, setusuarioLogado ] = React.useState(true);         

    if(!localStorage.getItem('token'))
        return <Navigate to='/login'  />    
       

    axios.interceptors.request.use(
        config => {
            config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
            return config;
        },
        error => {            
            return Promise.reject(error)
        }
    )          
    
    const {data, isFetching} = useQuery<Usuario[]>("users", async ()=> {

        try{            
            const response = await axios.get(Globais.urlAPIUser);
            return response.data;

        }catch(err){
            console.log(err)
            setusuarioLogado(false)
        }
    },{
        staleTime: 1000 * 60 //um minuto para atualização da págiina
    });   

    if(!usuarioLogado){
        return <Navigate to='/login'  />
    }
    
    return(
        <>
        <Menu />
        <div className='divLogo'><img src={logo} /></div>
            <div className="divLista">
            <h4>LISTA</h4>

            <table>
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>NOME</th>
                        <th>EMAIL</th>
                        <th></th>
                    </tr>  
                        {isFetching && <tr><td colSpan={4}>carregando..</td></tr> }                  
                        {
                            data?.map(user => {
                            return <tr key={user.id} className={user.nome}>
                                        <td>{user.id}</td>
                                        <td>{user.nome}</td>
                                        <td>{user.email}</td>
                                        <td className='tdBotoes'>
                                            <a href={"/Cadastro?id=" + user.id}><img src={icoeditar} /></a> &nbsp;
                                            <a style={{cursor: 'pointer'}} onClick={()=> deletaUsuario(user.id)}><img src={icodeletar} /></a>
                                        </td>
                                    </tr>
                        })
                    
                    }                
                </tbody>
            </table>
        </div>
        </>
    )
}