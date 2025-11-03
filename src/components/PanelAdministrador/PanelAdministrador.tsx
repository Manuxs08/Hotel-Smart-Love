import React from 'react'
import './PanelAdministrador.css'
import rooms from '../../Rooms.json'
import reservations from '../../Reservations.json'
import { useEffect, useState } from 'react'

const PanelAdministrador = () => {
    const [roomsCant, setRoomsCant] = useState(0)
    const [roomsAvailable, setRoomsAvailable] = useState(0)
    const [roomsOccupied, setRoomsOccupied] = useState(0)
    const [reservationsCant, setReservationsCant] = useState(0)
    const [reservationsConfirm, setReservationsConfirm] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0.0)
    const [section, setSection] = useState(0)

    const reservationValues = [
    {
        "id": 0,
        "roomId": 0,
        "guestsNumber": 2,
        "state": "Huésped en hotel",
        "check-in": "01/11/2025"
    },
    {
        "id": 1,
        "roomId": 1,
        "guestsNumber": 2,
        "state": "Huésped en hotel",
        "check-in": "30/10/2025"
    },
    {
        "id": 2,
        "roomId": 2,
        "guestsNumber": 2,
        "state": "Pendiente",
        "check-in": "26/11/2025"
    },
    {
        "id": 3,
        "roomId": 3,
        "guestsNumber": 1,
        "state": "Pendiente",
        "check-in": "30/11/2025"
    },
    {
        "id": 4,
        "roomId": 4,
        "guestsNumber": 1,
        "state": "Pendiente",
        "check-in": "18/11/2025"
    },
    {
        "id": 5,
        "roomId": 5,
        "guestsNumber": 1,
        "state": "Huésped en hotel",
        "check-in": "01/11/2025"
    },
    {
        "id": 6,
        "roomId": 6,
        "guestsNumber": 4,
        "state": "Pendiente",
        "check-in": "21/11/2025"
    },
    {
        "id": 7,
        "roomId": 7,
        "guestsNumber": 4,
        "state": "Pendiente",
        "check-in": "17/11/2025"
    },
    {
        "id": 8,
        "roomId": 8,
        "guestsNumber": 3,
        "state": "Huésped en hotel",
        "check-in": "2/11/2025"
    }
    ]

    useEffect(()=>{
        var availableRooms = 0
        var occupiedRooms = 0
        var confirmedReservations = 0
        var priceTotal = 0.0
        setReservationsCant(reservations.length)
        setRoomsCant(rooms.length)
        reservations.map(element => {
            rooms.map(element2 => {
                if(element2.id == element.roomId){
                    priceTotal += element2.price
                }
            });
            if(element.state == "Huésped en hotel"){
                confirmedReservations ++
            }
        });
        rooms.map(element=>{
            if(element.available){
                availableRooms ++
            }else{
                occupiedRooms ++
            }
        });
        setRoomsAvailable(availableRooms)
        setRoomsOccupied(occupiedRooms)
        setReservationsConfirm(confirmedReservations)
        setTotalPrice(priceTotal)
    },[])

    const changeState = (id: number) => {
        if(reservationValues.at(id)?.state == "Pendiente"){
            reservationValues[id].state == "Huesped en Hotel"
        }else{
            reservationValues[id].state == "Pendiente"
        }
    }

  return (
    <div className="mainAdmin">
        <div className='sidebar'>
            <div onClick={()=>setSection(0)}>Reservaciones</div>
            <div onClick={()=>setSection(1)}>Habitaciones</div>
        </div>
        {section === 0 && (
            <div className='reservations'>
                <div className="info-card">
                    <div>Total de Reservas</div>
                    <div>{reservationsCant}</div>
                </div>
                <div className="info-card">
                    <div>Confirmadas</div>
                    <div>{reservationsConfirm}</div>
                </div>
                <div className="info-card">
                    <div>Ocupación</div>
                    <div>{(reservationsConfirm/reservationsCant*100).toFixed(0)}%</div>
                </div>
                <div className="info-card">
                    <div>Facturación estimada</div>
                    <div>{totalPrice}</div>
                </div>
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Habitacion</th>
                        <th>Tipo</th>
                        <th>Huéspedes</th>
                        <th>Estado</th>
                        <th>Fecha Check-in</th>
                    </tr>
                    {
                        reservationValues.map(element => {
                            return(
                                <>
                                    <tr>
                                        <td>{element.id}</td>
                                        <td>{rooms.at(element.roomId)?.name}</td>
                                        <td>{rooms.at(element.roomId)?.roomType}</td>
                                        <td>{element.guestsNumber}</td>
                                        <td onClick={()=>changeState(element.id)}>{element.state}</td>
                                        <td>{element['check-in']}</td>
                                    </tr>
                                </>
                            )
                        })
                    }
                </table>
            </div>
        )}
        {section === 1 && (
            <div className='rooms'>
                <div className="info-card">
                    <div>Habitaciones Totales</div>
                    <div>{roomsCant}</div>
                </div>
                <div className="info-card">
                    <div>Disponibles</div>
                    <div>{roomsAvailable}</div>
                </div>
                <div className="info-card">
                    <div>Ocupadas</div>
                    <div>{roomsOccupied}</div>
                </div>
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Tipo</th>
                        <th>Capacidad</th>
                        <th>Precio</th>
                        <th>Descripción</th>
                        <th>Estado</th>
                    </tr>
                    {
                        rooms.map(element => {
                            return(
                                <>
                                    <tr>
                                        <td>{element.id}</td>
                                        <td>{element.name}</td>
                                        <td>{element.roomType}</td>
                                        <td>{element.maxCapacity}</td>
                                        <td>{element.price}</td>
                                        <td>{element.description}</td>
                                        <td>{element.available ? "Disponible":"Ocupado"}</td>
                                    </tr>
                                </>
                            )
                        })
                    }
                </table>
            </div>
        )}
        
    </div>
  )
}

export default PanelAdministrador