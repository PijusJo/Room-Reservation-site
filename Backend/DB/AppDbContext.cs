using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.DB
{
    public class AppDbContext (DbContextOptions<AppDbContext> options): DbContext(options)
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Room> Rooms {  get; set; }
        public DbSet<Reservation> Reservations { get; set; }

        
    }
}
