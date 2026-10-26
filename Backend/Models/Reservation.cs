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
        public Reservation( Room room, User user, string meetingTitle, DateOnly startDate, DateOnly endDate, string status, int attendees)
        {
            this.room = room;
            this.user = user;
            this.meetingTitle = meetingTitle;
            this.startDate = startDate;
            this.endDate = endDate;
            this.status = status;
            this.attendees = attendees;
        }

        public Interval GetInterval()
        {
            return new Interval(this.startDate, this.endDate);
        }

        public static List<Interval> GetIntervals(ICollection<Reservation> reservations)
        {
            List<Interval> usedDays = new List<Interval>();
            foreach (Reservation reservation in reservations) {
                usedDays.Add(reservation.GetInterval());

            }
            return usedDays;
        }
    }
}
