using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities.OrderAggregate;

[Table(name: "OrderItems", Schema = "dbo")]
public class OrderItem
{
  public int Id { get; set; }
  public required ProductItemOrdered ItemOrdered { get; set; }
  public double Price { get; set; }
  public int Quantity { get; set; }
}
