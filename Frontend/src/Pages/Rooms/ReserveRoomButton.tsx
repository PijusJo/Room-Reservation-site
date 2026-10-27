import { useNavigate } from 'react-router-dom';
import type {Room} from '@/Types/Room'

function ReserveRoomButton({room}: {room: Room}) {
    const navigate = useNavigate();
    const myData = { RoomId: room.id, Room:room};

    const reserveRoom = () => {
        // Pass data using the `state` object
        navigate('@/Pages/Reserve/main.tsx', { state: myData });
    };

    return <button onClick={reserveRoom}>Reserve This room</button>;
}