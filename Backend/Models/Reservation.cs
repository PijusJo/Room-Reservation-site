using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class Reservation
    {
        [Key]
        [Required]
        public int id { get; set; }
        [Required]
        [JsonIgnore]
        [ForeignKey("room")]
        public int roomId { get; set; }

        [Required]
        [JsonIgnore]
        public Room room { get; set; }

        [NotMapped]
        public string roomNameAndLocation => $"{room?.name}, {room?.location}";

        [Required]
        [JsonIgnore]
        [ForeignKey("user")]
        public int userId { get; set; }

        [Required]
        [JsonIgnore]
        public User user { get; set; }

        [NotMapped]
        public string userFullName => $"{user?.firstName} {user?.lastName}";

        [Required]
        public string meetingTitle { get; set; }
        [Required]
        public DateOnly startDate { get; set; }
        [Required]
        public DateOnly endDate { get; set; }
        [Required]
        public string status { get; set; }
        [Required]
        public int attendees { get; set; }
        public Reservation()
        {

        }
        
        //TODO BUILDER
        public Reservation( int roomId, int userid, string meetingTitle, DateOnly startDate, DateOnly endDate, string status, int attendees)
        {
            this.roomId = roomId;
            this.userId = userid;
            this.meetingTitle = meetingTitle;
            this.startDate = startDate;
            this.endDate = endDate;
            this.status = status;
            this.attendees = attendees;
        }

        public Reservation( ReservationInfo model)
        {
            roomId = model.RoomId;
            userId = model.UserId;
            meetingTitle = model.MeetingTitle;
            startDate = model.StartDate;
            endDate = model.EndDate;
            status = model.Status;
            attendees = model.AttendeeNumber;
        }
    }
}
