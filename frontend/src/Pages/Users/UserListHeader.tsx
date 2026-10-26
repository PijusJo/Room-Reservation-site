function UserListHeader(){
    return(
        <div className = "border border-secondary border-3 p-3 container">
            <div className="row">
                <div className="col"><h3>First Name</h3></div>
                <div className="col"><h3>Last Name</h3></div>
                <div className="col"><h3>ID</h3></div>
                <div className="col"><h3>Active Reservations</h3></div>
            </div>
        </div>
    )
}
export default UserListHeader;