import React, { useEffect, useState } from 'react'
import Menu from './Menu'
import { Navigate } from 'react-router-dom';
import '../assets/css/Cadastro.css'
import  logo from '../assets/image/logo.png'

import Globais from '../Config/Globais';
import { queryString } from '../Hooks/queryString';

import { retornaUsuario } from '../funcoes/retornaUsuario';
import { cadastrausuario } from '../funcoes/cadastraUsuario';
import { editaUsuario } from '../funcoes/editaUsuario';

import Dropzone from './dropzone/index'


export default function Cadastro(){ 

    const query = queryString();

    const [errorNome, setErrorNome]= useState(false)
    const [errorEmail, setErrorEmail]= useState(false)
    const [errorSenha, setErrorSenha] = useState(false)
    const [errorConfirmSenha, setErrorConfirmSenha] = useState(false)

    const [selectedFile, setSelectedFile] = useState<File>()
    const [imgUrl, setImgUrl] = useState('')

    const[nome, setNome] = useState('');
    const[email, setEmail] = useState('');
    const[senha, setSenha] = useState('');
    const[confirmSenha, setConfirmSenha] = useState('');
    const[urlFoto, setUrlFoto] = useState('');   

    const [statusEnvio, setStatusEnvio ] = React.useState(false);    


    if(!localStorage.getItem('token'))
        return <Navigate to='/login'  />


    const _id = query.get('id') ? query.get('id') : '0'   
        
    if(_id != '0'){

        useEffect(()=> {

            retornaUsuario(`${_id}`).then(
                (dados) => {
                    setNome(dados?.nome)
                    setEmail(dados?.email)
                    setUrlFoto(dados?.url_foto)   
                    
                    console.log(`URL: ${dados?.url_foto} `)
                    
                    if(dados?.url_foto)
                        setImgUrl(`${Globais.urlAPIFiles}${dados?.url_foto}`)
                    else
                        setImgUrl('')                        
                }
            )
        
           },[setNome, setEmail, setUrlFoto, setImgUrl])
        
    }  


    const cadastraUsuario = async (e:any) => {
        e.preventDefault();

        if(!nome)
            setErrorNome(true)            
        else 
            setErrorNome(false) 

        if(!email)
            setErrorEmail(true)            
        else 
            setErrorEmail(false)  
        
        if(!senha)
            setErrorSenha(true)
        else
            setErrorSenha(false)

        if(senha != confirmSenha)
            setErrorConfirmSenha(true)
        else
            setErrorConfirmSenha(false)

        if(!email || !senha || !nome || (senha != confirmSenha))
            return false



        const formData = new FormData()

        formData.append('nome', nome)
        formData.append('email', email)
        formData.append('senha', senha)
        formData.append('url_foto', urlFoto)

        console.log(selectedFile)

        if(selectedFile)
            formData.append('file', selectedFile)

        if(query.get('id')){            
            formData.append('id', `${query.get('id')}`)
            //EDITA USUÁRIO
            if(await editaUsuario(formData))
                setStatusEnvio(true);

        }else{
            //CADASTRA USUÁRIO
            if(await cadastrausuario(formData))
                setStatusEnvio(true);
            
        }
        
    } 
 
    if(statusEnvio){        
        return <Navigate to='/'  />
    }

    return(
        <>
            <Menu />
            <div className='divLogo'><img src={logo} /></div>
            <div className="divCadastro">
                <h4>CADASTRO {}</h4>

                <Dropzone onFileUpload={setSelectedFile} urlFoto={imgUrl} />
                
                <form  onSubmit={(e) => cadastraUsuario(e)}>
                    
                    <label htmlFor="nome">Nome:   {errorNome && <span>campo obrigatório</span>} 
                        <input type="text" id="nome" name="nome" placeholder="Nome" onChange={(e)=> setNome(e.target.value)} value={nome} />
                    </label>

                    <label htmlFor="email">E-mail:  {errorEmail && <span>campo obrigatório</span>} 
                    <input type="text" id="email" name="email" placeholder="email" onChange={(e)=> setEmail(e.target.value)} value={email} />
                    </label>

                    <label htmlFor="senha">Senha: {errorSenha && <span>campo obrigatório</span>} 
                    <input type="password" id="senha" name="senha" placeholder="senha" onChange={(e)=> setSenha(e.target.value)} />
                    </label>

                    <label htmlFor="confirmasenha">Confirmação da Senha:  {errorConfirmSenha && <span>confirmação da senha está diferente</span>} 
                    <input type="password" id="confirmasenha" name="confirmasenha" placeholder="confirmação da senha" onChange={(e)=> setConfirmSenha(e.target.value)}  />
                    </label>
                  

                    <button>
                        CADASTRAR
                    </button>
                </form>
            </div>
        </>
    )
}