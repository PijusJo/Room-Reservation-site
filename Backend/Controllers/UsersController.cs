using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Backend.Models;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private int Count;
        private static readonly UserModel[] users =
        [
            new UserModel("Pijus", "Jovaisa", 1, 2),
            new UserModel("Adas", "Jovaisa", 2, 2),
            new UserModel("Nojus", "Jovaisa", 3, 2)
        ];

        [HttpGet]
        public ActionResult<UserModel> GetAll()
        {
            return Ok(users);
        }
        [HttpGet("{id}")]
        public ActionResult<UserModel> GetById(int id)
        {
            foreach (var user in users)
            {
                if (user.id == id)
                    return Ok(user);
            }
            return NotFound(null);
        }

    }
}
