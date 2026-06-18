namespace API.DTOs.Product;

public class GetProductDto
{
  public int IdDto { get; set; }
  public required string NameDto { get; set; }
  public required string DescriptionDto { get; set; }
  public long PriceDto { get; set; }
  public required string PictureUrlDto { get; set; }
  public required string TypeDto { get; set; }
  public required string BrandDto { get; set; }
  public int QuantityInStockDto { get; set; }
}
