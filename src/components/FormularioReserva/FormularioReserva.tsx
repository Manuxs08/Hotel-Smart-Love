import React, { useEffect, useRef, useState } from 'react'
import './FormularioReserva.css'
import { useNavigate } from 'react-router-dom'

const FormularioReserva = () => {
    const navigate = useNavigate()
    const initialValues = {
        roomType: "Simple",
        guestsNumber: 1,
        fechaCheckIn: "",
        fechaCheckOut: "",
        roomId: -1,
        name: "",
        lastName: "",
        email: "",
        phoneNumber: "000-000-000",
        aditionalNotes: ""

    }

    const rooms = [
        {id: 0, name: "Doble 201", roomType: "Doble", maxCapacity: 2, price: 20.00, description: "Cama queen, balcon con vista urbana", available: true},
        {id: 1, name: "Doble 202", roomType: "Doble", maxCapacity: 2, price: 20.00, description: "Cama queen, balcon con vista urbana", available: true},
        {id: 2, name: "Doble 203", roomType: "Doble", maxCapacity: 2, price: 20.00, description: "Cama queen, balcon con vista urbana", available: true},
        {id: 3, name: "Doble 204", roomType: "Doble", maxCapacity: 2, price: 20.00, description: "Cama queen, balcon con vista urbana", available: true},
        {id: 4, name: "Doble 205", roomType: "Doble", maxCapacity: 2, price: 20.00, description: "Cama queen, balcon con vista urbana", available: true},
        {id: 5, name: "Doble 206", roomType: "Doble", maxCapacity: 2, price: 20.00, description: "Cama queen, balcon con vista urbana", available: true},
        {id: 6, name: "Doble 207", roomType: "Doble", maxCapacity: 2, price: 20.00, description: "Cama queen, balcon con vista urbana", available: true},
    ]

    const errorRef = useRef<HTMLDivElement>(null)
    const [formData, setFormData] = useState(initialValues)
    const [page, SetPage] = useState(1)
    const [maxCapacity, setMaxCapacity] = useState(1)

    useEffect(()=>{
        switch(formData.roomType){
            case "Simple":
                setMaxCapacity(1)
                if (formData.guestsNumber > 1) setFormData({...formData, guestsNumber: 1})
                break
            case "Doble":
                setMaxCapacity(2)
                if (formData.guestsNumber > 2) setFormData({...formData, guestsNumber: 2})
                break
            case "Familiar":
                setMaxCapacity(4)
                if (formData.guestsNumber > 4) setFormData({...formData, guestsNumber: 4})
                break
            default:
                setMaxCapacity(1)
                break
        }
    }, [formData.roomType])

    useEffect(()=>{
        console.log(formData)
    }, [formData])

    const nextPage = () => {
        var currentPage = page
        var nextPage = currentPage += 1
        SetPage(nextPage)
        if(nextPage == 2){
            if(formData.roomId >= 0){
                setFormData({...formData, roomId: -1})
            }
        }
    }

    const previousPage = () => {
        var currentPage = page
        SetPage(currentPage -= 1)
    }

    const validateData = (num: number) => {
        let error = ""
        switch(page){
            case 1:
                var dateCheckIn = new Date(formData.fechaCheckIn)
                var dateCheckOut = new Date(formData.fechaCheckOut)
                if(formData.guestsNumber == 0){
                    error = "Debe haber al menos un huésped para poder reservar"
                }else if(formData.guestsNumber > maxCapacity){
                    error = "El número de huespedes ingresado excede el limite"
                }else if(dateCheckIn > dateCheckOut){
                    error = "La fecha de check in debe ser menor a la de check-out"
                }else if(formData.fechaCheckIn == ""){
                    error = "Seleccione una fecha de check-in"
                }else if(formData.fechaCheckOut == ""){
                    error = "Seleccione una fecha de check-out"
                }
                break
            case 2:
                if(formData.roomId < 0){
                    error = "Eliga una habitación para seguir con la reservación"
                }
                break
            case 3:
                if(formData.name == ""){
                    error = "Ingrese su nombre"
                }else if(formData.lastName == ""){
                    error = "Ingrese su apellido"
                }else if(formData.email == ""){
                    error = "Ingrese su correo"
                }else if(!formData.email.endsWith("@gmail.com") && !formData.email.endsWith("@email.com") && !formData.email.endsWith("@hotmail.com")){
                    error = "Ingrese un correo valido"
                }else if(formData.phoneNumber == "000-000-000"){
                    error = "Ingrese su número de telefono"
                }
                break
        }
        if(errorRef.current) errorRef.current.textContent = error

        if(num > 0){
            if(error == "") nextPage()
        }else if(num < 0){
            previousPage()
            if(errorRef.current) errorRef.current.textContent = ""
        }
    }

    const selectRoom = (id: number) => {
        var arr = document.getElementsByClassName("room-selected")
        var selectedRoom = document.getElementById(String(id))
        setFormData({...formData, roomId: id})
        for(var i = 0; i < arr.length; i++){
            arr[i].classList.remove("room-selected")
        }
        selectedRoom?.classList.add("room-selected")
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(formData)
    }

    type InputType = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

    const preventSubmitOnEnter = (e: React.KeyboardEvent<InputType>) => {
        if(e.key === "Enter"){
            e.preventDefault()
        }
    }

  return (
    <div className='main'>
        <form className='form' action="" onSubmit={()=>handleSubmit}>
            <div className='form-pages'>
                <div className='form-page-section'>
                    <div className='number'>1</div>
                    <div>
                        <div>Consulta Inicial</div>
                        <div>Disponibilidad</div>
                    </div>
                </div>
                <div className='form-page-section'>
                    <div className='number'>2</div>
                    <div>
                        <div>Elige Habitacion</div>
                        <div>Seleccion</div>
                    </div>
                </div>
                <div className='form-page-section'>
                    <div className='number'>3</div>
                    <div>
                        <div>Completa tu informacion</div>
                        <div>Datos</div>
                    </div>
                </div>
                <div className='form-page-section'>
                    <div className='number'>4</div>
                    <div>
                        <div>Registro Final</div>
                        <div>Confirmación</div>
                    </div>
                </div>
            </div>
            {page === 1 && (
                <>
                    <div className='form-section'>
                        <div className='form-input-section'>
                            <div>Tipo de habitación</div>
                            <select onKeyDown={preventSubmitOnEnter} typeof='text' name="tipo-habitacion" value={formData.roomType} id="" onChange={(e) => {
                                setFormData({...formData, roomType: e.target.value})}
                            }>
                                <option value="Simple">Habitación Simple</option>
                                <option value="Doble">Habitación Doble</option>
                                <option value="Familiar">Habitación Familiar</option>
                            </select>
                            <p>Perfecta para viajes individuales con todas las comodidades esenciales.</p>
                        </div>
                        <div className='form-input-section'>
                            <div>Número de Huespedes</div>
                            <input onKeyDown={preventSubmitOnEnter} type="number" min={1} max={maxCapacity} value={formData.guestsNumber} onChange={(e) => 
                                setFormData({...formData, guestsNumber: Number(e.target.value)})}/>
                            <p>Capacidad máxima: {maxCapacity} huésped(es).</p>
                        </div>
                        <div className='form-input-section'>
                            <div>Fecha de check-in</div>
                            <input onKeyDown={preventSubmitOnEnter} type="date" value={formData.fechaCheckIn} onChange={(e)=>
                                setFormData({...formData, fechaCheckIn: e.target.value})
                            }/>
                        </div>
                        <div className='form-input-section'>
                            <div>Fecha de check-out</div>
                            <input onKeyDown={preventSubmitOnEnter} type="date" value={formData.fechaCheckOut} onChange={(e)=>
                                setFormData({...formData, fechaCheckOut: e.target.value})
                            }/>
                        </div>
                        <button type='button' onClick={() => validateData(1)}>Consultar Disponibilidad</button>
                    </div>
                </>
            )}
            {page === 2 && (
                <>
                    <div className='form-section'>
                        <div className='rooms-container'>
                            {
                                    rooms.map(element => {
                                        if(element.available){
                                            return(
                                                <div id={String(element.id)} className='room-info' onClick={()=>selectRoom(element.id)}>
                                                    <div>{element.name}</div>
                                                    <div>{element.roomType}</div>
                                                    <div>{element.price}</div>
                                                    <div>{element.description}</div>
                                                </div>
                                            )
                                        }
                                    })
                            }
                        </div>
                        <button type='button' onClick={() => validateData(-1)}>Volver</button>
                        <button type='button' onClick={() => validateData(1)}>Consultar Disponibilidad</button>
                    </div>
                </>
            )}
            {page === 3 && (
                <>
                    <div className='form-section'>
                        <div>
                            <label htmlFor="">Nombres: </label>
                            <input onKeyDown={preventSubmitOnEnter} type="text" value={formData.name} onChange={(e)=>{
                                setFormData({...formData, name: e.target.value})
                            }} />
                        </div>
                        <div>
                            <label htmlFor="">Apellidos: </label>
                            <input onKeyDown={preventSubmitOnEnter} type="text" value={formData.lastName} onChange={(e)=>{
                                setFormData({...formData, lastName: e.target.value})
                            }} />
                        </div>
                        <div>
                            <label htmlFor="">Correo electrónico: </label>
                            <input onKeyDown={preventSubmitOnEnter} type="email" value={formData.email} onChange={(e)=>{
                                setFormData({...formData, email: e.target.value})
                            }} />
                        </div>
                        <div>
                            <label htmlFor="">Teléfono: </label>
                            <input onKeyDown={preventSubmitOnEnter} type="tel" pattern='[0-9]{3}-[0-9]{3}-[0-9]{3}' value={formData.phoneNumber} onChange={(e)=>{
                                setFormData({...formData, phoneNumber: e.target.value})
                            }} />
                        </div>
                        <div className='nota-adicional'>
                            <label htmlFor="">Notas adicionales (Opcional): </label>
                            <textarea onKeyDown={preventSubmitOnEnter} value={formData.aditionalNotes} onChange={(e)=>{
                                setFormData({...formData, aditionalNotes: e.target.value})
                            }}></textarea>
                        </div>
                        
                        <button type='button' onClick={() => validateData(-1)}>Volver</button>
                        <button type='button' onClick={() => validateData(1)}>Revisar y Confirmar</button>
                    </div>
                </>
            )}
            {page === 4 && (
                <>
                    <div className='form-section'>
                        <div>
                            <div>Resumen de la reserva</div>
                            <div className='resumen-container'>
                                {
                                    rooms.map(element => {
                                        if(formData.roomId == element.id)
                                            return(
                                                <>
                                                    <div>
                                                        <label htmlFor="">Habitacion:</label><br />
                                                        <div>{element.name}</div>
                                                        <div>{element.description}</div>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="">Fecha de estadia:</label><br />
                                                        <div>{formData.fechaCheckIn}</div>
                                                        <div>{formData.fechaCheckOut}</div>
                                                        <div>{formData.guestsNumber} huésped(es)</div>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="">Datos del titular:</label><br />
                                                        <div>{formData.name} {formData.lastName}</div>
                                                        <div>{formData.email}</div>
                                                        <div>{formData.phoneNumber}</div>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="">Notas adicionales</label><br />
                                                        <div>{formData.aditionalNotes}</div>
                                                    </div>
                                                </>
                                            )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div style={{marginTop: "40px"}}>
                        <button type='button' onClick={() => validateData(-1)}>Volver</button>
                        <button type='button' onClick={() => validateData(1)}>Confirmar y Registrar Reserva</button>
                    </div> 
                </>
            )}
            {page === 5 && (
                <>
                    <div className='form-section'>
                        <h1>Su reserva ha sido registrada con exito</h1>
                    </div>
                    <button type='button' onClick={() => navigate("/")}>Volver al Inicio</button>
                </>
            )}
            <div ref={errorRef} style={{marginTop: "20px", marginBottom: "20px"}}></div>
        </form>
    </div>
  )
}

export default FormularioReserva