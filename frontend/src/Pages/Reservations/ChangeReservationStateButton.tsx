import type {ReservationStateDTO} from '@/Types/ReservationStateDTO'

function ReservationStatusupdate({reservationId, SetStateTo, ButtonText}: {reservationId:number, SetStateTo:string, ButtonText:string}) {
    const DTO: ReservationStateDTO= {
        NewState:SetStateTo
    }
    const handlePatch = async () => {
        try {
            const response = await fetch(`http://localhost:5042/api/Reservations/${reservationId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(DTO)
            });

            if (response.ok) {
                // Optional: trigger a refresh or state update in your parent view
                console.log("Reservation status updated successfully!");
                window.location.reload()
                
            } else {
                const errorText = await response.text();
                console.error("Failed to update status:", errorText);
            }
        } catch (error) {
                console.error("Network error:", error);
        }
    }


    return (
        <button className='btn btn-primary w-100' onClick={handlePatch}>
            {ButtonText}
        </button>
    );
}
export default ReservationStatusupdate