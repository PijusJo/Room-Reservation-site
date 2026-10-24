import type { User } from '@/Types/User';

function UserView({user}: {user: User}){
    return(
        <div className = "border border-secondary border-3 p-3 Containter">
            <div className="row">
                <div className="col">{user.FirstName}</div>
                <div className="col">{user.lastName}</div>
                <div className="col">{user.Id}</div>
                <div className="col">{user.ActiveReservations}</div>
            </div>
            
        </div>
    )
}
export default UserView;