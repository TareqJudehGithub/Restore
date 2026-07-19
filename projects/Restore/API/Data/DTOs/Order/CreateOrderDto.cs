using API.Entities.OrderAggregate;

namespace API.DTOs.Order;

public class CreateOrderDto
{
  public required ShippingAddress ShippingAddress { get; set; }
  public required PaymentSummary PaymentSummary { get; set; }

}
