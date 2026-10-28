import type {RoomReservationsInfo} from '@/Types/RoomReservationsInfo'
import { useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { Room } from '@/Types/Room';
import type { Reservation } from '@/Types/Reservation';
import SingleRoomView from '@/Pages/Rooms/SingleRoomView';
import { API_URL } from '@/constants';
import SingleReservationView from '@/Pages/Reservations/SingleReservationView'

export default function RoomReservationView(){
    const location = useLocation();
    const navigate = useNavigate();
    
    const state = location.state as { Room?: Room;} | null;
    const room = state?.Room



    const [Reservations, setReservations] = useState<Reservation[]>([])
    const [RoomStatistics, setRoomStatistics] = useState<RoomReservationsInfo>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null); 

    if (!room) return <div>Loading Room...</div>;

    useEffect(() => {
        fetch(`${API_URL}/Rooms/ReservationData/${room.id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch ReservationData from the server.');
                }
                return response.json();
            })
            .then((data) => {
                setRoomStatistics(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    

     useEffect(() => {
        fetch(`${API_URL}/Rooms/Reservations/${room.id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch Reservations from the server.');
                }
                return response.json();
            })
            .then((data) => {
                setReservations(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading Data...</div>;
    if (error) return <div className="text-danger">Error: {error}</div>;

    


    


    return(
        <div className='container'>
            <h1>Current Room</h1>
            <SingleRoomView room={room} HaveReserveButton={false}/>
            <h1>Room Statistics</h1>
            <div className='row'>
                <div className='border border-secondary border-3 col'>
                    <div className = "row">Total bookings:</div> 
                    <div className = "fw-bold row">{RoomStatistics?.TotalReservations}</div>
                </div>
                <div className='border border-secondary border-3 col'>
                    <div className = "row">Active Bookings:</div> 
                    <div className = "fw-bold row">{RoomStatistics?.ActiveBookings}</div>
                </div>
                <div className='border border-secondary border-3 col'>
                    <div className = "row">Cancelled Bookings:</div> 
                    <div className = "fw-bold row">{RoomStatistics?.CanceledBookings}</div>
                </div>
                <div className='border border-secondary border-3 col'>
                    <div className = "row">Compleded Bookings:</div> 
                    <div className = "fw-bold row">{RoomStatistics?.ComplededBookings}</div>
                </div>
            </div>
            <h1>Room Reservations</h1>
            <div className='containter'>
                { Reservations.map((currentReserve)=>(
                    <SingleReservationView key={currentReserve.id} reservation = {currentReserve}/>
                ))
                }
            </div>
        </div>
    )
}