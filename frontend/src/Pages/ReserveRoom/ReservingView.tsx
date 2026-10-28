import type { ReservationInfo } from '@/Types/ReservationInfo';
import { useLocation, useNavigate } from 'react-router-dom';
import type { Room } from '@/Types/Room';
import type { RoomDTO } from '@/Types/RoomDTO';
import SingleRoomView from '@/Pages/Rooms/SingleRoomView';
import { useEffect, useState } from 'react';
import { API_URL } from '@/constants';
import Select from 'react-select';

export default function ReservationView() {
    const location = useLocation();
    const navigate = useNavigate();
    
    const state = location.state as { Room?: Room; userId?: number } | null;
    const [room, setRoom] = useState<Room | undefined>(state?.Room);
    const [roomOptions, setRoomOptions] = useState<RoomDTO[]>([]);
    const userId = state?.userId;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form state initialized with default values
    const [reservationInfo, setReservationInfo] = useState<ReservationInfo>({
        UserId: userId || 0,
        RoomId: room?.id || 0,
        MeetingTitle: "",
        StartDate: new Date(),
        EndDate: new Date(),
        Status: "Booked",
        AttendeeNumber: 0
    });

    // Automatically update reservationInfo when a room or user is loaded/changed
    useEffect(() => {
        setReservationInfo(prev => ({
            ...prev,
            RoomId: room ? room.id : prev.RoomId,
            UserId: userId ? userId : prev.UserId
        }));
    }, [room, userId]);

    // Handle room selection from react-select dropdown
    const HandleRoomSelect = (selectedOption: RoomDTO | null) => {
        if (!selectedOption) return;
        
        const roomId = selectedOption.value;
        const url = `${API_URL}/Rooms/${roomId}`;
        
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch Room from the server.');
                }
                return response.json();
            })
            .then((data: Room) => {
                setRoom(data); // Updates state, triggering an instant UI re-render
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    const HandleGetRoomOptions = () => {
        const url = `${API_URL}/Rooms/GetDTO`;
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch Rooms from the server.');
                }
                return response.json();
            })
            .then((data: RoomDTO[]) => {
                setRoomOptions(data);
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    useEffect(() => {
        HandleGetRoomOptions();
    }, []);

    if (!userId) {
        return (
            <div className="container mt-5">
                <div className="alert alert-warning">
                    No user Info found; please select a user first.
                </div>
            </div>
        );
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setReservationInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    const handleReserve = async () => {
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch(`${API_URL}/Reservations`, {
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

    return (
        <div className='container mt-5'>
            <div className='row mb-4'>
                <label className="form-label fw-bold">Select or Change Room</label>
                <Select 
                    options={roomOptions}
                    onChange={HandleRoomSelect}
                    placeholder="Search or select a room..."
                />
            </div>

            
            {room ? (
            <div className='row mb-4'>
                    <div>
                        <h1>Current Room</h1>
                        <SingleRoomView room={room} HaveReserveButton={false} />
                        <div className='row'>
                    <h1>Reservation Options</h1>
                </div>
                
                <div className="row">
                    <div className='col'>
                        <div className='row'>Start date:</div>
                        <div className='row'>
                            <input 
                                type="date" 
                                name="StartDate" 
                                onChange={handleChange} 
                            />
                        </div>
                    </div>
                    <div className='col'>
                        <div className='row'>End date:</div>
                        <div className='row'>
                            <input 
                                type="date" 
                                name="EndDate" 
                                onChange={handleChange} 
                            />
                        </div>
                    </div>
                    <div className='col'>
                        <div className='row'>Meeting Title:</div>
                        <div className='row'>
                            <input 
                                type="text" 
                                name="MeetingTitle" 
                                onChange={handleChange} 
                                value={reservationInfo.MeetingTitle} 
                            />
                        </div>
                    </div>
                    <div className='col'>
                        <div className='row'>Number of attendees:</div>
                        <div className='row'>
                            <input 
                                type="number" 
                                name="AttendeeNumber" 
                                onChange={handleChange} 
                                value={reservationInfo.AttendeeNumber} 
                            />
                        </div>
                    </div>
                </div>
                </div>
            </div>
            ) : (
                <div className="alert alert-warning">
                    No room selected. Please pick a room from the dropdown above to continue.
                </div>
            )}
            

            

            {error && (
                <div className="alert alert-danger mb-3 mt-3" role="alert">
                    <strong>Validation Error:</strong> {error}
                </div>
            )}
            {room? (<div className='row p-3'>
                <button 
                    className="btn btn-primary w-100" 
                    onClick={handleReserve}
                    disabled={isSubmitting || !room}
                >
                    {isSubmitting ? 'Submitting...' : 'Reserve This Room'}
                </button>
            </div>):(<></>)}
            
        </div>
    );
}