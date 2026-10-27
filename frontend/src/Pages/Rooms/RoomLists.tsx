import { useState, useEffect } from 'react';
import RoomView from './SingleRoomView';
import RoomFilter from './RoomFilter'
import type { Room } from '@/Types/Room';
import {API_URL} from '@/constants';
import type { RoomFilterOptions } from '@/Types/RoomFiltersOptions';

function RoomList() {

    const [inputs, setInputs] = useState<RoomFilterOptions>({
        minimumCapacity: 0,
        location: '',
        mustHaveProjector: false,
        mustHaveTV: false,
        mustHaveVideoConferencing: false,
        mustHaveWhiteBoard: false
    })
    const [rooms, setrooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null); 

    const fetchRooms = (FilterOptions:RoomFilterOptions) => {
        setLoading(true);
        setError(null);
        const params = new URLSearchParams();

        Object.entries(FilterOptions).forEach(([key, value]) => {
            if(value != 0 && value != '' && value != false)
            params.append(key, String(value));
        });
        const queryString = params.toString();

        var url = `${API_URL}/Rooms?${queryString}`;
        if(queryString=='') {
            url = `${API_URL}/Rooms`;
        }
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch Rooms from the server.');
                }
                return response.json();
            })
            .then((data) => {
                setrooms(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    };

    useEffect(()=>
        fetchRooms(inputs)
    ,[]);
    
    const handeApplyFilters = () =>{
        fetchRooms(inputs)
    }

    if (error) return <div className="text-danger">Error: {error}</div>;
    if (loading) return (<div>Loading users...</div>)
    
    return (
        
    <div className='container'>
        <RoomFilter Options={inputs} setOptions={setInputs}/>
        <button onClick={handeApplyFilters}>ApplyFilters</button>
        {   
            rooms.map((currentroom)=>(
                <RoomView key={currentroom.id} room = {currentroom}/>
            ))
        }
    </div>
    );
}

export default RoomList;