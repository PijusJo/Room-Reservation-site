using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class Room
    {
        [Key]
        [Required]
        public int id { get; private set; }
        [Required]
        public string name { get; private set; }
        [Required]
        public int capacity { get; private set; }
        [Required]
        public string location { get; private set; }
        [Required]
        public bool hasProjector { get; private set; }
        [Required]
        public bool hasTV { get; private set; }
        [Required]
        public bool hasVideoConferencing { get; private set; }
        [Required]
        public bool hasWhiteBoard { get; private set; }
        [Required]
        public bool status { get; private set; }
        [JsonIgnore]
        public ICollection<Reservation> Reservations { get; private set; }

        public Room()
        {

        }

        public Room(string name, int capacity, string location, bool hasProjector, bool hasTV, bool hasVideoConferencing, bool hasWhiteBoard, bool status)
        {
            this.name = name;
            this.capacity = capacity;
            this.location = location;
            this.hasProjector = hasProjector;
            this.hasTV = hasTV;
            this.hasVideoConferencing = hasVideoConferencing;
            this.hasWhiteBoard = hasWhiteBoard;
            this.status = status;
        }

    }
}
