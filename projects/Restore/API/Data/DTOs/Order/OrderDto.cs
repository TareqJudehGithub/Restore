using System.ComponentModel.DataAnnotations;
using API.Entities.OrderAggregate;

namespace API.DTOs.Order;

public class OrderDto
{
  public int Id { get; set; }
  public required string BuyerEmail { get; set; }
  public required ShippingAddress ShippingAddress { get; set; }
  public DateTime OrderDate { get; set; }
  public List<OrderItemDto> OrderItems { get; set; } = [];
  public double Subtotal { get; set; }
  public double DeliveryFee { get; set; }
  public double Discount { get; set; }
  public double Total { get; set; }
  public required string OrderStatus { get; set; }
  public required PaymentSummary PaymentSummary { get; set; }

}
