using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.DB;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReservationsController(AppDbContext _context): Controller
    {
        [HttpGet]
        public ActionResult<Reservation> GetAll()
        {
            return Ok(_context.Reservations.ToList());
        }

        [HttpGet("{id}")]
        public ActionResult<Reservation> GetById(int id)
        {
            Reservation? reservation = _context.Reservations.Find(id);
            if (reservation != null)
                return Ok(reservation);
            return NotFound();
        }

        [HttpPost()]
        public IActionResult AddReservation()
        {
            

            return Ok();
        }

    }
}
