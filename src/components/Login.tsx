import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import '../assets/css/Login.css'
import logo from '../assets/image/logo.png'
import Globais from '../Config/Globais';

import axios from 'axios';

export default function Login(){    
    
    const [statusEnvio, setStatusEnvio ] = React.useState(false);

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('')
    const [errorEmail, setErrorEmail]= useState(false)
    const [errorSenha, setErrorSenha] = useState(false)
    const login = async (e: any)=> {

        e.preventDefault()

        if(!email)
            setErrorEmail(true)            
        else 
            setErrorEmail(false)  
        
        if(!senha)
            setErrorSenha(true)
        else
            setErrorSenha(false)

        if(!email || !senha)
            return false

        try{
            
            const response = await axios.post(Globais.urlAPILogin,{
                email, senha
                })

            const data = response.data
            alert(data.mensagem)

            if(data.success == true){
                localStorage.setItem('token', data.token)
                setStatusEnvio(true)
            }

        }catch(err: any){
              alert(err)  
        }
            
    }

    if(statusEnvio){
        return <Navigate to='/'  />
    }

    return(
        <div className='divLogin'>
            <div className='divLogo'><img src={logo} alt="Empresa" /></div>
            <h4>LOGIN</h4>

            <form  onSubmit={(e)=> login(e)}>
                <label htmlFor="email">E-mail: </label> {errorEmail && <span>campo obrigatório</span>} 
                <input type="text" id="email" placeholder="email" onChange={(e)=> setEmail(e.target.value)} />
                

                <label htmlFor="senha">Senha: </label> {errorSenha && <span>campo obrigatório</span>}
                <input type="password" id="senha" placeholder="senha" onChange={(e)=> setSenha(e.target.value)} />
                

                <button>ENTRAR</button>
            </form>

        </div>

        
    )
}