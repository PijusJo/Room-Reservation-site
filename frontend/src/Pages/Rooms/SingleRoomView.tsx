import type { Room } from '@/Types/Room'
import CheckmakrOrX from './CheckmarkOrX'

function RoomView({room}: {room: Room}) {

    return(
        <div style={{ backgroundColor: '#b6b5b5' }} className = "border border-secondary border-3 p-3 Containter">
            <div className = " row">
                <div className = "border border-secondary rounded p-1 bg-light col-sm-1"> 
                    {room.status ?(
                        <a>Active</a>
                    ):  <a>inactive</a> 
                    }<CheckmakrOrX condition = {room.status}/>
                </div>
                <div className = "border border-secondary rounded p-1 bg-light col-sm-1"> Id: {room.id} </div>
                <div className = "border border-secondary rounded p-1 bg-light col-sm-2"> Location: {room.floor}</div>
                <div className = "border border-secondary rounded p-1 bg-light col-sm"> {room.name} </div>
            </div>
            <div className = "border border-secondary rounded p-1 bg-light shadow-sm row">
                <div className = "col-sm">capacity: {room.capacity}</div>
                <div className = "col-sm">Projector<CheckmakrOrX condition = {room.hasProjector}/></div>
                <div className = "col-sm">TV Screen<CheckmakrOrX condition = {room.hasTV}/></div>
                <div className = "col-sm">Video conferencing<CheckmakrOrX condition = {room.hasVideoConferencing}/></div>
                <div className = "col-sm">Whiteboard<CheckmakrOrX condition = {room.hasWhiteBoard}/></div>
            </div>
            
            
            
        </div>
    )


}
export default RoomView;