using API.Entities;
using API.DTOs.Product;
namespace API.Extensions;

public static class ProductExtensions
{
  public static IQueryable<Product> Sort(
    this IQueryable<Product> query,
    string? orderBy
    )
  {
    query = orderBy switch
    {
      "price" => query.OrderBy(q => q.Price),
      "priceDesc" => query.OrderByDescending(q => q.Price),
      "name" => query.OrderBy(q => q.Name),
      "nameDesc" => query.OrderByDescending(q => q.Name),
      _ => query.OrderBy(q => q.Type)
    };
    return query;
  }
  public static IQueryable<Product> Search(
    this IQueryable<Product> query, string? searchTerm)
  {
    if (string.IsNullOrWhiteSpace(searchTerm))
    {
      return query;
    }
    var lowerCaseSearchTerm = searchTerm.Trim().ToLower();

    return query
    .Where(q =>
    q.Name.ToLower().Contains(lowerCaseSearchTerm));
  }
  public static IQueryable<Product> Filter(
    this IQueryable<Product> query,
    string? types,
    string? brands
    )
  {
    var typesList = new List<string>();
    var brandsList = new List<string>();


    if (!string.IsNullOrWhiteSpace(types))
    {
      typesList.AddRange([.. types.ToLower().Split(",")]);
    }
    if (!string.IsNullOrWhiteSpace(brands))
    {
      brandsList.AddRange([.. brands.ToLower().Split(",")]);
    }

    query = query.Where(q => typesList.Count == 0 ||
    typesList.Contains(q.Type.ToLower()));

    query = query.Where(q => brandsList.Count == 0 ||
    brandsList.Contains(q.Brand.ToLower()));

    return query;
  }

  public static GetProductDto ToDto(this Product product)
  {
    // Map domain model to dto
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

