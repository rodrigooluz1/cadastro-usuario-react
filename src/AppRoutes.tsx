import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom'
import Lista from './components/Lista'
import Cadastro from './components/Cadastro'
import Login from './components/Login'

export default function AppRoutes(){
    return(
        <Router>
            <Routes>
                <Route path='/' element={<Lista/>} />
                <Route path='/Cadastro' element={<Cadastro/>} />
                <Route path='/Login' element={<Login/>} />
            </Routes>
        </Router>

    )
}