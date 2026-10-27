import { useEffect, useState } from 'react';
import SingleUserView from './SingleUserView'
import UserListHeader from './UserListHeader'
import type { User } from '@/Types/User';

function UserListView({user}: {user:User}){
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null); 

     useEffect(() => {
        fetch('http://localhost:5042/api/Users')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch users from the server.');
                }
                return response.json();
            })
            .then((data) => {
                setUsers(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading users...</div>;
    if (error) return <div className="text-danger">Error: {error}</div>;

    return(
        <div>
            <UserListHeader/>
            <div>
                { users.map((currentUser)=>(
                    <SingleUserView key={currentUser.id} user = {currentUser}/>
                ))
                }
            </div>
            
        </div>
    )
}
export default UserListView;