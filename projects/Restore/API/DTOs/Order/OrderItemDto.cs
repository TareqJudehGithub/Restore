namespace API.DTOs.Order;

public class OrderItemDto
{
  public int ProductId { get; set; }
  public required string Name { get; set; }
  public required string PictureUrl { get; set; }
  public double Price { get; set; }
  public int Quantity { get; set; }
}
