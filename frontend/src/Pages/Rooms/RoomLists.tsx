import React from 'react';
import RoomView from '@/Pages/Rooms/SingleRoomView';
import type { Room } from '@/Types/Room';

function RoomList() {
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
            <h1>Meeting Rooms</h1>
            {/* 2. Pass the room object into your RoomView component */}
            <RoomView room={sampleRoom} />
            <RoomView room={sampleRooma} />
            <RoomView room={sampleRoom} />
        </div>
    );
}

export default RoomList;