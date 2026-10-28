import { Link } from 'react-router-dom';
import type {Room} from '@/Types/Room'

interface ReserveButtonViewProps {
  room: Room;
  userId: number;
}

export function ReserveRoomButton({ room, userId }: ReserveButtonViewProps) {
    return (
    <div>
        <Link 
            to="/Reserve" 
            state={{ Room: room, userId: userId }} 
            className="btn btn-primary w-100" // Makes it look like a button
        >
            Reserve This Room
        </Link>
    </div>
        
    );
}