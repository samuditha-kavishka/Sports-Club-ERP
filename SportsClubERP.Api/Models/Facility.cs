using System.Collections.Generic;

namespace SportsClubERP.Api.Models
{
    public class Facility
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public double HourlyRate { get; set; }

        // Navigation properties
        public List<Booking> Bookings { get; set; } = new List<Booking>();
    }
}
