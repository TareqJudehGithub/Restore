using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities.OrderAggregate;

[Table(name: "Orders", Schema = "dbo")]
public class Order
{
  public int Id { get; set; }
  public required string BuyerEmail { get; set; }
  public required ShippingAddress ShippingAddress { get; set; }
  public DateTime OrderDate { get; set; } = DateTime.UtcNow;
  public List<OrderItem> OrderItems { get; set; } = [];
  public double Subtotal { get; set; }
  public double DeliveryFee { get; set; }
  public double Discount { get; set; }
  public required string PaymentIntentId { get; set; }
  public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;
  public required PaymentSummary PaymentSummary { get; set; }

  public double GetTotal()
  {
    return Subtotal + DeliveryFee - Discount;
  }
}
