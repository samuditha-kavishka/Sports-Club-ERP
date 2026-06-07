namespace SportsClubERP.Api.Models
{
    public class Inventory
    {
        public int Id { get; set; }
        public string ItemName { get; set; } = string.Empty;
        public int QuantityInStock { get; set; }
        public double UnitPrice { get; set; }
    }
}
