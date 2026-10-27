import { Link } from 'react-router-dom';
import type {Room} from '@/Types/Room'
import type {User} from '@/Types/User'

interface ReserveButtonViewProps {
  room: Room;
  user: User;
}

export function ReserveRoomButton({ room, user }: ReserveButtonViewProps) {
    return (
    <div>
        <Link 
            to="/Reserve" 
            state={{ Room: room, User: user }} 
            className="btn btn-primary" // Makes it look like a button
        >
            Reserve This Room
        </Link>
    </div>
        
    );
}