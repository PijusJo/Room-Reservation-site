using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.DB
{
    public class AppDbContext (DbContextOptions<AppDbContext> options): DbContext(options)
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Room> Rooms {  get; set; }
        public DbSet<Reservation> Reservations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
                .HasMany(u => u.Reservations)
                .WithOne(r => r.user)
                .HasForeignKey(r => r.userId)
                .OnDelete(DeleteBehavior.Cascade); 
        }
    }
}
