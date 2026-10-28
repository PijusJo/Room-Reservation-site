using System.Reflection.Emit;

namespace Backend.Models
{
    public class RoomDTO
    {
        public RoomDTO(int id, string name)
        {
            value = id;
            label = name;
        }

        public int value { get; set; }

        public string label { get; set; }
    }
}
