import type { Reservation } from '@/Types/Reservation';
import ReservationStatusupdate from './ChangeReservationStateButton'

function SingleReservationView({reservation}: {reservation: Reservation}){
    return(
        <div style={{ backgroundColor: '#b6b5b5' }} className = "border border-secondary border-3 p-3">
            <div className = "row bg-light">
                <div className="border border-secondary border-3 col">
                    <div className = "row">Meting Title:</div> 
                    <div className = "fw-bold row">{reservation.meetingTitle}</div>
                </div>
                <div className="border border-secondary border-3 col">
                    <div className = "row">Location:</div> 
                    <div className = "fw-bold row">{reservation.roomNameAndLocation}</div>
                </div>
                <div className="border border-secondary border-3 col">
                    <div className = "row">User:</div> 
                    <div className = "fw-bold row">{reservation.userFullName}</div>
                </div>
            </div>
            <div className = "row bg-light">
                <div className = "border border-secondary border-3 p-3 col">
                    <div className = "row">Status:</div> 
                    <div className = "fw-bold row">{reservation.status}</div>
                </div>
                <div className = "border border-secondary border-3 p-3 col">
                    <div className = "row">End date:</div> 
                    <div className = "fw-bold row">{reservation.endDate + ''}</div>
                </div>
                <div className = "border border-secondary border-3 p-3 col">
                    <div className = "row">Star date:</div> 
                    <div className = "fw-bold row">{reservation.startDate + ''}</div>
                </div>
                <div className = "border border-secondary border-3 p-3 col">
                    <div className = "row">Attendes:</div> 
                    <div className = "fw-bold row">{reservation.attendees}</div>
                </div>
            </div>
            <div className = "row">
                <div className = 'col'>
                    <ReservationStatusupdate reservationId={reservation.id} SetStateTo='Cancelled' ButtonText='Cancel booking'/>
                </div>
                <div className = 'col'>
                    <ReservationStatusupdate reservationId={reservation.id} SetStateTo='Completed' ButtonText='Complete booking early'/>
                </div>
            </div>
        </div>
    )
}
export default SingleReservationView;