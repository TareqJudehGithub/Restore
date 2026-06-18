namespace API.DTOs;

public class BasketItemDto
{
  public int ProductIdDto { get; set; }
  public required string NameDto { get; set; }
  public long PriceDto { get; set; }
  public required string PictureUrlDto { get; set; }
  public required string TypeDto { get; set; }
  public required string BrandDto { get; set; }
  public int QuantityDto { get; set; }
}
