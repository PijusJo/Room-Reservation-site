import SingleUserView from './SingleUserView'
import UserListHeader from './UserListHeader'
import type { User } from '@/Types/User';

function UserListView(){
    const user1: User = {
        FirstName:  "Pijus",
        lastName: "Jovaisa",
        Id: 1,
        ActiveReservations: 1
    }
    const user2: User = {
        FirstName:  "Adas",
        lastName: "Jovaisa",
        Id: 2,
        ActiveReservations: 11
    }
    const user3: User = {
        FirstName:  "Nojus",
        lastName: "Jovaisa",
        Id: 123,
        ActiveReservations: 112
    }
    const arr: User[] = [user1,user2,user3]

    return(
        <div>
            <UserListHeader/>
            <div>
                { arr.map((currentUser)=>(
                    <SingleUserView key={currentUser.Id} user = {currentUser}/>
                ))
                }
            </div>
            
        </div>
    )
}
export default UserListView;