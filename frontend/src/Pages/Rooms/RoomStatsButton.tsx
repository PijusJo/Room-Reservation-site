import { Link } from 'react-router-dom';
import type {Room} from '@/Types/Room'


export function RoomStatsButton({ room}: {room:Room}) {
    return (
    <div>
        <Link 
            to="/RoomReservations" 
            state={{ Room: room}} 
            className="btn btn-primary w-100" // Makes it look like a button
        >
            look at Room Stats
        </Link>
    </div>
        
    );
}