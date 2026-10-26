using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    /// <summary>
    /// Represents an interval of unavailable dates (Users and Rooms cant have overlapping bookings)
    /// Used to visually represend unavailable dates in the front end
    /// </summary>
    public class Interval
    {
        public Interval(DateOnly startDate, DateOnly endDate)
        {
            this.startDate = startDate;
            this.endDate = endDate;
        }

        [Required]
        public DateOnly startDate { get; set; }
        [Required]
        public DateOnly endDate { get; set; }
    }
}
