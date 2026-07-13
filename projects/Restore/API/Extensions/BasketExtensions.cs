using Microsoft.EntityFrameworkCore;
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
      BasketId = basket.BasketId,
      ClientSecret = basket.ClientSecret,
      PaymentIntentId = basket.PaymentIntentId,
      Items = basket.Items
      .Select(q =>
      new BasketItemDto
      {
        ProductId = q.ProductId,
        Name = q.Product.Name,
        Price = q.Product.Price,
        Brand = q.Product.Brand,
        Type = q.Product.Type,
        PictureUrl = q.Product.PictureUrl,
        Quantity = q.Quantity
      }).
      ToList()
    };
    return basketDto;
  }

  public static async Task<Basket> GetBasketWithItems(
    this IQueryable<Basket> query, string? basketId)
  {
    return await query
    .Include(q => q.Items)
    .ThenInclude(q => q.Product)
    .FirstOrDefaultAsync(q => q.BasketId == basketId)
    ??
    throw new Exception("Cannot get basket");

  }

}
