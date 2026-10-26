import type { Reservation } from '@/Types/Reservation';

function SingleReservationView({reservation}: {reservation: Reservation}){
    return(
        <div className = "border border-secondary border-3 p-3 container">
            <div className = "row">
                <div className="col-sm-3">meeting</div>
                <div className="col-sm-3">room name, Location</div>
                <div className="col-sm-3">User</div>
            </div>
            <div className = "row">
                <div className="border border-secondary border-3 p-3 col-sm-3">{reservation.meetingTitle}</div>
                <div className="border border-secondary border-3 p-3 col-sm-3">{reservation.roomNameAndLocation}</div>
                <div className="border border-secondary border-3 p-3 col-sm-3">{reservation.userFullName}</div>
            </div>
            <div className = "row-8">
                <div className="col-sm-8 row g-0">
                    <div className = "col-sm-2">status</div>
                    <div className = "col-sm-2">endDate</div>
                    <div className = "col-sm-2">startDate</div>
                    <div className = "col-sm-2">Atendees</div>
                </div>
                <div className="col-sm-8 row g-0">
                    <div className = "border border-secondary border-3 p-3 col-sm-2">{reservation.status}</div>
                    <div className = "border border-secondary border-3 p-3 col-sm-2">{reservation.endDate + ''}</div>
                    <div className = "border border-secondary border-3 p-3 col-sm-2">{reservation.startDate + ''}</div>
                    <div className = "border border-secondary border-3 p-3 col-sm-2">{reservation.attendees}</div>
                </div>
            </div>
        </div>
    )
}
export default SingleReservationView;