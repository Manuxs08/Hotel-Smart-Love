import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FormularioReserva from './components/FormularioReserva/FormularioReserva'
import Login from './components/LogIn/Login'
import PanelAdministrador from './components/PanelAdministrador/PanelAdministrador'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/user' element={<FormularioReserva/>}></Route>
      <Route path='/admin' element={<PanelAdministrador/>}></Route>
    </Routes>
  </BrowserRouter>
)
