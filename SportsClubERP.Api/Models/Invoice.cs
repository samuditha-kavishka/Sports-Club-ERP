namespace SportsClubERP.Api.Models
{
    public class Invoice
    {
        public int Id { get; set; }
        public int MemberId { get; set; }
        public int BookingId { get; set; }
        public double TotalAmount { get; set; }
        public string Status { get; set; } = "Pending";

        // Navigation properties
        public Member? Member { get; set; }
        public Booking? Booking { get; set; }
    }
}
