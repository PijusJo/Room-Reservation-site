import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import RoomsListPage from './Pages/Rooms/RoomLists'; // Your other page component
import ReservationListPage from './Pages/Reservations/ReservationListView'
import UserListPage from './Pages/Users/UserListview'

function App() {
    return (
        <BrowserRouter>
            {/* Optional: A simple top navigation bar to switch between pages */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 mb-4">
                <div className="navbar-nav">
                    <Link className="nav-link" to="/Users">Users</Link>
                    <Link className="nav-link" to="/Rooms">Rooms</Link>
                    <Link className="nav-link" to="/Reservations">Reservations</Link>
                </div>
            </nav>

            {/* This is where your routes switch dynamically */}
            <div className="container">
                <Routes>
                    {/* <Route path="/" element={<RoomsPage />} /> */}
                    <Route path="/Users" element={<UserListPage/>} />
                    <Route path="/Rooms" element={<RoomsListPage />} />
                    <Route path="/Reservations" element={<ReservationListPage/>} />
                </Routes>
                
            </div>
        </BrowserRouter>
    );
}

export default App;