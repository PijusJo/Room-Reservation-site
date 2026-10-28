using Backend.DB;
using Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoomsController(AppDbContext context) : Controller
    {
        [HttpGet("GetDTO")]
        public ActionResult<RoomDTO> GetDTO()
        {
            var rooms = context.Rooms.Select(room => room.GetDTO()).ToList();
            return Ok(rooms);
        }

        [HttpGet("{id}")]
        public ActionResult<Room> GetById(int id)
        {
            Room? room = context.Rooms.Find(id);
            if (room != null)
                return Ok(room);
            return NotFound(null);
        }
        [HttpGet]
        public ActionResult<IEnumerable<Room>> GetFilteredRooms(
            [FromQuery] int? minimumCapacity,
            [FromQuery] string? location,
            [FromQuery] bool? mustHaveProjector,
            [FromQuery] bool? mustHaveTV,
            [FromQuery] bool? mustHaveVideoConferencing,
            [FromQuery] bool? mustHaveWhiteBoard)
        {
            var query = context.Rooms.AsQueryable();

            if (minimumCapacity.HasValue && minimumCapacity.Value > 0)
            {
                query = query.Where(r => r.capacity >= minimumCapacity.Value);
            }

            if (!string.IsNullOrWhiteSpace(location))
            {
                query = query.Where(r => r.location.ToLower().Contains(location.ToLower()));
            }

            if (mustHaveProjector == true)
            {
                query = query.Where(r => r.hasProjector == true);
            }

            if (mustHaveTV == true)
            {
                query = query.Where(r => r.hasTV == true);
            }

            if (mustHaveVideoConferencing == true)
            {
                query = query.Where(r => r.hasVideoConferencing == true);
            }

            if (mustHaveWhiteBoard == true)
            {
                query = query.Where(r => r.hasWhiteBoard == true);
            }

            // Execute the query and return the matching rooms
            return Ok(query.ToList());
        }

        
    }
}
