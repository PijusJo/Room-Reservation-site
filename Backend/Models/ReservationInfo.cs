namespace Backend.Models
{
    public class ReservationInfo
    {
        public int UserId { get; set; } // Or string, depending on your DB type
        public int RoomId { get; set; }
        public string MeetingTitle { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public string Status { get; set; }
        public int AttendeeNumber { get; set; }
    }
}
