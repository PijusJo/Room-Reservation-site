using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.DB;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController(AppDbContext context) : Controller
    {

        [HttpGet]
        public ActionResult<User> GetAll()
        {
            return Ok(context.Users.ToList());
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
