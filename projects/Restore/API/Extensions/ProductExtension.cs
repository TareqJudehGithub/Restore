using API.Entities;
using API.DTOs.Product;


namespace API.Extensions;

public static class ProductExtension
{
  public static GetProductDto ToDto(this Product product)
  {
    var productDto = new GetProductDto()
    {
      Id = product.Id,
      Name = product.Name,
      Description = product.Description,
      Price = product.Price,
      PictureUrl = product.PictureUrl,
      Type = product.Type,
      Brand = product.Brand,
      QuantityInStock = product.QuantityInStock
    };

    return productDto;
  }
}
