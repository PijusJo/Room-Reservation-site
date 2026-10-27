using Backend.Models;

namespace Backend.DB
{
    public class DbInitializer
    {
        public static void AddStartingData(AppDbContext context)
        {
            context.Database.EnsureCreated();
            
            
            //check for duplication
            if (context.Users.Any())
            {
                return;
            }

            User[] users =
            {
                new User("John", "Doe", 2),
                new User("Jane", "Smith", 0),
                new User("Alice", "Johnson", 1),
                new User("Bob", "Brown", 3),
                new User("Emily", "Davis", 0)
            };
            Room[] rooms =
            {
                new Room("Alpha Conference Room", 12, "Floor 1, Building A", true, true, true, true, true),
                new Room("Beta Meeting Room", 6, "Floor 1, Building A", false, true, false, true, true),
                new Room("Executive Boardroom", 20, "Floor 3, Building B", true, true, true, true, true),
                new Room("Focus Pod 1", 3, "Floor 2, Building A", false, false, false, true, true),
                new Room("Gamma Workshop", 15, "Floor 2, Building B", true, false, true, true, false)
            };
            Reservation[] reservations =
            {
                new Reservation(
                    roomId: 0,
                    userid: 0,
                    meetingTitle: "Q3 Strategy Planning",
                    startDate: new DateOnly(2026, 6, 1),
                    endDate: new DateOnly(2026, 6, 3),
                    status: "Confirmed",
                    attendees: 8
                ),
                new Reservation(
                    roomId: 1,
                    userid: 1,
                    meetingTitle: "UI/UX Design Sync",
                    startDate: new DateOnly(2026, 6, 5),
                    endDate: new DateOnly(2026, 6, 5),
                    status: "Pending",
                    attendees: 4
                ),
                new Reservation(
                    roomId: 2,
                    userid: 2,
                    meetingTitle: "Client Presentation",
                    startDate: new DateOnly(2026, 6, 10),
                    endDate: new DateOnly(2026, 6, 12),
                    status: "Confirmed",
                    attendees: 12
                ),
                new Reservation(
                    roomId: 3,
                    userid: 3,
                    meetingTitle: "Code Review & Refactoring",
                    startDate: new DateOnly(2026, 6, 15),
                    endDate: new DateOnly(2026, 6, 15),
                    status: "Cancelled",
                    attendees: 2
                ),
                new Reservation(
                    roomId: 4,
                    userid: 4,
                    meetingTitle: "Team Retrospective",
                    startDate: new DateOnly(2026, 6, 20),
                    endDate: new DateOnly(2026, 6, 21),
                    status: "Confirmed",
                    attendees: 10
                )
            };

            context.Users.AddRange(users);
            context.Rooms.AddRange(rooms);
            context.Reservations.AddRange(reservations);
        }
    }
}
