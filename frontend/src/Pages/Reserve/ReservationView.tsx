import type { ReservationInfo } from '@/Types/ReservationInfo';
import { useLocation, useNavigate } from 'react-router-dom';
import type { Room } from '@/Types/Room';
import type { User } from '@/Types/User';
import SingleRoomView from '@/Pages/Rooms/SingleRoomView'
import { useState } from 'react';

export default function ReservationView(){
    const location = useLocation();
    const navigate = useNavigate();
    
    const state = location.state as { Room?: Room; User?: User } | null;
    const room = state?.Room;
    const user = state?.User;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    if (!room || !user) {
        return (
            <div className="container mt-5">
                <div className="alert alert-warning">
                    No room or user information found. Please go back and select a room to reserve.
                </div>
            </div>
        );
    }

    const [reservationInfo, setreservationInfo] = useState<ReservationInfo>({
        UserId: user.id,
        RoomId: room.id,
        MeetingTitle: "",
        StartDate:new Date(),
        EndDate :new Date(),
        Status:"Booked",
        AttendeeNumber:0
    })

    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setreservationInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    const handleReserve = async () => {
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:5042/api/Reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reservationInfo),
            });

            if (!response.ok) {
                const responseText = await response.text();
                throw new Error(responseText);
            }

                navigate('/Reservations');
            } catch (err: any) {
                setError(err.message || 'An unexpected error occurred.');
            } finally {
                setIsSubmitting(false);
            }
    };
    return(
        <div className='container'>
            <div className = 'row'>
                <h1>Current Room</h1>
                <SingleRoomView room={room}/>
            </div>
            <div className = 'row'>
                <h1>Reservation Options</h1>
            </div>
            <div className="row">
                <div className = 'col'>
                    <div className = 'row'>
                        Start date: 
                    </div>
                    <div className = 'row'>
                        <input 
                            type="date" 
                            name="StartDate" 
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className = 'col'>
                    <div className = 'row'>
                        End date: 
                    </div>
                    <div className = 'row'>
                        <input 
                            type="date" 
                            name="EndDate" 
                            onChange={handleChange}
                        />
                    </div>
                    
                </div>
                <div className = 'col'>
                    <div className = 'row'>
                        Meeting Title: 
                    </div>
                    <div className = 'row'>
                        <input 
                            type="text" 
                            name="MeetingTitle" 
                            onChange={handleChange}
                            value={reservationInfo.MeetingTitle}
                        />
                    </div>
                    
                </div>
                <div className = 'col'>
                    <div className = 'row'>
                        number of atendees:
                    </div>
                    <div className = 'row'>
                        <input 
                        type="number" 
                        name="AttendeeNumber" 
                        onChange={handleChange}
                        value={reservationInfo.AttendeeNumber}
                        />
                    </div>
                </div>
                
            </div>

            {error && (
                <div className="alert alert-danger mb-3" role="alert">
                    <strong>Validation Error:</strong> {error}
                </div>
            )}


            <button 
                className="btn btn-primary" 
                onClick={handleReserve}
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Submitting...' : 'Reserve This Room'}
            </button>
        </div>
    )
}