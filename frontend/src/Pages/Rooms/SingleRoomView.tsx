import type { Room } from '@/Types/Room'
import CheckmakrOrX from './CheckmarkOrX'
import type { User } from '@/Types/User';

function RoomView({room}: {room: Room}) {
    return(
        <div style={{ backgroundColor: '#b6b5b5' }} className = "border border-secondary border-3 p-3">
            <div className = "row">
                <div className = "col-sm-6">
                    <div className = "border border-secondary rounded p-1 bg-light"> 
                        <div>
                            <CheckmakrOrX condition = {room.status}/>
                            {room.status ?(
                                <a>Active</a>
                            ):  <a>inactive</a> 
                            }    
                        </div>
                    </div>
                    <div className = "border border-secondary rounded p-1 bg-light"> Id: {room.id} </div>
                    <div className = "border border-secondary rounded p-1 bg-light"> Location: {room.location}</div>
                    <div className = "border border-secondary rounded p-1 bg-light"> {room.name} </div>
                </div>
                <div className = "col-sm-6">
                    <div className = "border border-secondary rounded p-1 bg-light">
                        capacity: {room.capacity}
                    </div>
                    <div className = "border border-secondary rounded p-1 bg-light">
                        <CheckmakrOrX condition = {room.hasProjector}/>Projector
                    </div>
                    <div className = "border border-secondary rounded p-1 bg-light">
                        <CheckmakrOrX condition = {room.hasTV}/>TV Screen
                    </div>
                    <div className = "border border-secondary rounded p-1 bg-light">
                        <CheckmakrOrX condition = {room.hasVideoConferencing}/>Video conferencing
                    </div>
                    <div className = "border border-secondary rounded p-1 bg-light">
                        <CheckmakrOrX condition = {room.hasWhiteBoard}/>Whiteboard
                    </div>
                </div>
            </div>
        </div>
    )


}
export default RoomView;