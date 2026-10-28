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
        

        
        [JsonIgnore]
        public ICollection<Reservation>? Reservations { get; set; }

        public User(){

        }
        public User(string fname, string lname)
        {
            firstName = fname;
            lastName = lname;
        }


        public int activeRezervations
        {
            get
            {
                if (Reservations == null) return 0;
                int count = 0;
                foreach (Reservation? r in Reservations) { 
                    if(r.status == "Booked")
                    {
                        count++;
                    }
                }
                return count;
            }
        }

    };
}

