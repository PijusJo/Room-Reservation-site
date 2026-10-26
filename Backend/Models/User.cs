using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public class User
    {
        [Key]
        [Required]
        public int id { get; set; }
        [Required]
        public string firstName { get; set; }
        [Required]
        public string lastName { get; set; }
        [Required]
        public int activeRezervations { get; set; }

        
        [JsonIgnore]
        public ICollection<Reservation> Reservations { get; set; }

        public User(){

        }
        public User(string fname, string lname, int activeres)
        {
            firstName = fname;
            lastName = lname;
            activeRezervations = activeres;
        }
    }
}
