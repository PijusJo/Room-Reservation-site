using Backend.DB;
using Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController(AppDbContext context) : Controller
    {

        [HttpGet]
        public ActionResult<IEnumerable<User>> GetAll()
        {
            return Ok(context.Users
                .Include(u => u.Reservations)
                .ToList());
        }
        [HttpGet("{id}")]
        public ActionResult<User> GetById(int id)
        {
            User? user = context.Users.Find(id);
            if (user!=null)
                return Ok(user);
            return NotFound(null);
        }

    }
}
