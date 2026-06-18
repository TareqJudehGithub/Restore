namespace API.DTOs.Product;

public class UpdateProductDto
{
  public int Id { get; set; }
  public required string Name { get; set; }
  public required string Description { get; set; }
  public long PriceDto { get; set; }
  public required string PictureUrl { get; set; }
  public required string Type { get; set; }
  public required string Brand { get; set; }
  public int QuantityInStock { get; set; }
}
