import type { User } from '@/Types/User';

function UserView({user}: {user: User}){
    return(
        <div className = "border border-secondary border-3 p-3 Containter">
            <div className="row">
                <div className="col">{user.firstname}</div>
                <div className="col">{user.lastname}</div>
                <div className="col">{user.id}</div>
                <div className="col">{user.activerezervations}</div>
            </div>
            
        </div>
    )
}
export default UserView;