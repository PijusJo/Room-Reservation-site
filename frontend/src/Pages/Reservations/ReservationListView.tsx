import { useEffect, useState } from 'react';
import SingleReservationView from './SingleReservationView'
import type { Reservation } from '@/Types/Reservation';
import type { User } from '@/Types/User';

function ReservationListView({user}: {user:User}){
    const [users, setUsers] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null); 

     useEffect(() => {
        fetch('http://localhost:5042/api/Reservations')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch users from the server.');
                }
                return response.json();
            })
            .then((data) => {
                setUsers(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading users...</div>;
    if (error) return <div className="text-danger">Error: {error}</div>;

    return(
        <div>
            <div>
                { users.map((currentReserve)=>(
                    <SingleReservationView key={currentReserve.id} reservation = {currentReserve}/>
                ))
                }
            </div>
            
        </div>
    )
}
export default ReservationListView;