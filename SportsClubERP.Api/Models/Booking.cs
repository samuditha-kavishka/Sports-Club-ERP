using System;
using System.Collections.Generic;

namespace SportsClubERP.Api.Models
{
    public class Booking
    {
        public int Id { get; set; }
        public int MemberId { get; set; }
        public int FacilityId { get; set; }
        public DateTime BookingDate { get; set; }
        public double DurationHours { get; set; }

        // Navigation properties
        public Member? Member { get; set; }
        public Facility? Facility { get; set; }
        public List<Invoice> Invoices { get; set; } = new List<Invoice>();
    }
}
