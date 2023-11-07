import '../assets/css/Menu.css'

export default function Lista(){

    function logout(){
        localStorage.removeItem('token')        
    }
    
    return(
        <div className='divMenu'>
            <ul>
                <li><a href="/">Lista</a></li>
                <li><a href="/Cadastro">Cadastrar</a></li>
                <li><a onClick={logout} href="/login">Sair</a></li>            
            </ul>
        </div>
    )
}