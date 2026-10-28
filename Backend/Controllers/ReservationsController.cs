using Backend.DB;
using Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReservationsController(AppDbContext context, IConfiguration configuration) : Controller
    {


        [HttpGet]
        public ActionResult<Reservation> GetAll()
        {
            var reservations = context.Reservations
                .Include(r => r.room)  // <-- Crucial for roomNameAndLocation
                .Include(r => r.user)  // <-- Crucial for userFullName
                .ToList();
            return Ok(reservations.ToList());
        }

        [HttpGet("{id}")]
        public ActionResult<Reservation> GetById(int id)
        {
            var reservation = context.Reservations
                .Include(r => r.room)
                .Include(r => r.user)
                .FirstOrDefault(r => r.id == id);
            if (reservation != null)
                return Ok(reservation);
            return NotFound();
        }

        [HttpPost]
        public IActionResult AddReservation([FromBody] ReservationInfo model)
        {
            if (model == null)
                return BadRequest("Reservation data is missing.");
            if (model.UserId <= 0)
                return BadRequest("User ID is incorect");
            if (model.RoomId <= 0)
                return BadRequest("Room ID is incorect");

            User? Organizer = context.Users.Find(model.UserId);
            if (Organizer == null)
                return BadRequest();

            Room? room = context.Rooms.Find(model.RoomId);
            if (room == null)
                return BadRequest();

            if (!room.status)
                return BadRequest($"Room must be active");

            if (model.AttendeeNumber <= 0)
                return BadRequest($"booking atendees must be positive");

            if (room.capacity < model.AttendeeNumber)
                return BadRequest($"booking atendees must not exceed the room capacity");



            int maxDaysReservation = configuration.GetValue<int>("MaximumDurationDays");
            int maxHorizon = configuration.GetValue<int>("MaximumBookingHorizon");

            int duration = (model.EndDate.DayNumber - model.StartDate.DayNumber) + 1;

            if (duration > maxDaysReservation)
                return BadRequest($"Duration cannot exceed {maxDaysReservation} days.");
            if (duration < 0)
                return BadRequest($"Start date must be before end date");

            DateOnly cuurrdate = DateOnly.FromDateTime(DateTime.Now);
            int bookingHorizon = model.StartDate.DayNumber - cuurrdate.DayNumber;
            if(bookingHorizon <= 0)
                return BadRequest($"Reservation must start int the future");
            if(bookingHorizon > maxHorizon)
                return BadRequest($"Reservation cannot start further than {maxHorizon} days in the future.");
           
            var thisRoomReservedbythisuser = context.Reservations
                    .Where(r => r.userId == model.UserId)
                    .Where(r => r.roomId == model.RoomId)
                    .Where(r => r.status == "Booked")
                    .FirstOrDefault();

            if (thisRoomReservedbythisuser != null){
                return BadRequest($"User can't have more than one booked reservation in this room");
            }

            List<Reservation> RoomsBookings = context.Reservations
                                                    .Where(r => r.roomId == model.RoomId)
                                                    .Where(r => r.status == "Booked")
                                                    .ToList();
            
            foreach (Reservation r in RoomsBookings)
            {
                if(r.startDate >= model.StartDate && r.startDate <=  model.EndDate || r.endDate >= model.StartDate && r.endDate <= model.EndDate)
                    return BadRequest($"room bookings must not overlap");
            }

            List<Reservation> UserBookings = context.Reservations
                                                    .Where(r => r.userId == model.UserId)
                                                    .Where(r => r.status == "Booked")
                                                    .ToList();
            foreach (Reservation r in UserBookings)
            {
                if (r.startDate >= model.StartDate && r.startDate <= model.EndDate || r.endDate >= model.StartDate && r.endDate <= model.EndDate)
                    return BadRequest($"organizer bookings must not overlap");
            }

            Reservation newReservation = new Reservation(model);
            context.Add(newReservation);
            context.SaveChanges();
            return Ok();
        }

        [HttpPatch("{id}")]
        public IActionResult UpdateState(int id, [FromBody] ReservationStateDTO model)
        {
            Reservation? rez = context.Reservations.FirstOrDefault(r => r.id == id);
            if (rez == null)
                return BadRequest($"No reservation with the id {id} exists in database");
            if (model.NewState != "Cancelled" && model.NewState != "Completed")
            {
                return BadRequest($"new State '{model.NewState}' is unhandled in backend");
            }
            if (rez.status != "Booked")
            {
                return BadRequest($"Current Status must be booked to change status");
            }
            rez.status = model.NewState;
            context.SaveChanges();
            return Ok();
        }
    }
}
