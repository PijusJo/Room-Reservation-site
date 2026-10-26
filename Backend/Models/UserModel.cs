using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class UserModel
    {
        [Required]
        public string firstname { get; set; }
        [Required]
        public string lastname { get; set; }

        [Required]
        public int id { get; set; }

        [Required]
        public int activerezervations { get; set; }

        public UserModel(string fname, string lname, int id, int activeres)
        {
            firstname = fname;
            lastname = lname;
            this.id = id;
            activerezervations = activeres;
        }
    }
}
