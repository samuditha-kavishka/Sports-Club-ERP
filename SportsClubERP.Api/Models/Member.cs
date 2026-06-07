using System;
using System.Collections.Generic;

namespace SportsClubERP.Api.Models
{
    public class Member
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? Phone { get; set; }
        public DateTime JoinDate { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public List<Booking> Bookings { get; set; } = new List<Booking>();
        public List<Invoice> Invoices { get; set; } = new List<Invoice>();
    }
}
