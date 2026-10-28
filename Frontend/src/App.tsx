import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type {User} from '@/Types/User'
import RoomsListPage from './Pages/Rooms/RoomLists'; // Your other page component
import ReservationListPage from './Pages/Reservations/ReservationListView'
import UserListPage from './Pages/Users/UserListview'
import ReservationView from './Pages/ReserveRoom/ReservationView'

function App() {
    //Simulates a logged in user, in this case the logged in user is the first one in the Db
    const [currentUser, setUser] = useState<User | null>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null); 
    useEffect(() => {
            fetch('http://localhost:5042/api/Users/1')
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch users from the server.');
                    }
                    return response.json();
                })
                .then((data) => {
                    setUser(data);
                    setLoading(false);
                })
                .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
        }, []);

    if (loading || !currentUser) {
            return <div className="container mt-5">Loading application...</div>;
    }
    if (error) return <div className="text-danger">Error: {error}</div>;
    return (
        <BrowserRouter>
            <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 mb-4">
                <div className="navbar-nav w-100 d-flex flex-row align-items-center">
                    <Link className="nav-link" to="/Users">Users</Link>
                    <Link className="nav-link" to="/Rooms">Rooms</Link>
                    <Link className="nav-link" to="/Reservations">Reservations</Link>
                    
                    <Link className="nav-link" to="/Reserve" state={{userId: currentUser.id}} >Reserve a Room</Link>
                    <div className="d-flex flex-row align-items-center gap-3 text-nowrap ms-auto">
                        <span className="fw-bold">User Id: {currentUser.id}</span>
                        <span className="fw-bold">{currentUser.firstName} {currentUser.lastName}</span>
                    </div>
                </div>
            </nav>

            {/* This is where your routes switch dynamically */}
            <div className="container">
                <Routes>
                    {/* <Route path="/" element={<RoomsPage />} /> */}
                    <Route path="/Users" element={<UserListPage user={currentUser}/>} />
                    <Route path="/Rooms" element={<RoomsListPage user={currentUser} />} />
                    <Route path="/Reservations" element={<ReservationListPage />} />
                    <Route path="/Reserve" element={<ReservationView  />} />
                </Routes>
                
            </div>
        </BrowserRouter>
    );
}

export default App;