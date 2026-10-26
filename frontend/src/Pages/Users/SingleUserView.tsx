import type { User } from '@/Types/User';

function UserView({user}: {user: User}){
    return(
        <div className = "border border-secondary border-3 p-3 container">
            <div className="row">
                <div className="col">{user.firstName}</div>
                <div className="col">{user.lastName}</div>
                <div className="col">{user.id}</div>
                <div className="col">{user.activeRezervations}</div>
            </div>
            
        </div>
    )
}
export default UserView;