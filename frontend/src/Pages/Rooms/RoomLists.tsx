import { useState } from 'react';
import RoomView from './SingleRoomView';
import RoomFilter from './RoomFilter'
import type { Room } from '@/Types/Room';
import type { RoomFilterOptions } from '@/Types/RoomFiltersOptions';

function RoomList() {

    const [inputs, setInputs] = useState<RoomFilterOptions>({
        MinimumCapacity: 0,
        Floor: '',
        MustHaveProjector: false,
        MustHaveTV: false,
        MustHaveVideoConferencing: false,
        MustHaveWhiteBoard: false
    })



    // 1. Create a sample room object matching your Room interface
    const sampleRoom: Room = {
        name: 'Conference Alpha',
        id: 1,
        capacity: 10,
        floor: '2nd Floor',
        hasProjector: true,
        hasTV: false,
        hasVideoConferencing: true,
        hasWhiteBoard: true,
        status: true
    };
    const sampleRooma: Room = {
        name: 'Conference Alpha',
        id: 1,
        capacity: 10,
        floor: '2nd Floor',
        hasProjector: true,
        hasTV: false,
        hasVideoConferencing: true,
        hasWhiteBoard: true,
        status: false
    };
    return (
    <div>
        <div>
            <RoomFilter Options={inputs} setOptions={setInputs}/>
        </div>
        <div>
            <h1>Meeting Rooms</h1>
            {/* 2. Pass the room object into your RoomView component */}
            <RoomView room={sampleRoom} />
            <RoomView room={sampleRooma} />
            <RoomView room={sampleRoom} />
        </div>

    </div>
    );
}

export default RoomList;