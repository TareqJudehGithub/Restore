using API.DTOs;
using API.Entities;

namespace API.Extensions;

public static class BasketExtensions
{
  public static BasketDto ToDto(this Basket basket) // basket.toDto()
  {
    // Map basket model to Dto
    var basketDto = new BasketDto()
    {
      BasketDtoId = basket.BasketId,
      ItemsDto = basket.Items
      .Select(q =>
      new BasketItemDto
      {
        ProductIdDto = q.ProductId,
        NameDto = q.Product.Name,
        PriceDto = q.Product.Price,
        BrandDto = q.Product.Brand,
        TypeDto = q.Product.Type,
        PictureUrlDto = q.Product.PictureUrl,
        QuantityDto = q.Quantity
      }).
      ToList()
    };
    return basketDto;
  }
}
