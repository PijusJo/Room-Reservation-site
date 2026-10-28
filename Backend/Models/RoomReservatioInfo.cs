namespace Backend.Models
{
    public class RoomReservationsInfo
    {
        public RoomReservationsInfo(int totalReservations=0, int activeBookings=0, int complededBookings=0, int canceledBookings=0)
        {
            TotalReservations = totalReservations;
            ActiveBookings = activeBookings;
            ComplededBookings = complededBookings;
            CanceledBookings = canceledBookings;
        }
        public int TotalReservations { get; set; }
        public int ActiveBookings { get; set; }
        public int ComplededBookings { get; set; }
        public int CanceledBookings {  get; set; }
    }
}
