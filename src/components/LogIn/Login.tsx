import React from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
  return (
    <div>
        <div className='main'>
            <button type='button' onClick={()=>navigate("/user")}>Registrar Reserva como Usuario</button>
            <button type='button' onClick={()=>navigate("/admin")}>Ingresar Panel de Administrador</button>
        </div>
    </div>
  )
}

export default Login