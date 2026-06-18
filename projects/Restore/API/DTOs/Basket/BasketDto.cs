namespace API.DTOs;

public class BasketDto
{
  public required string BasketDtoId { get; set; }
  public List<BasketItemDto> ItemsDto { get; set; } = [];
}
