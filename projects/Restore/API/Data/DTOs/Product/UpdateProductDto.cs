using System.ComponentModel.DataAnnotations;

namespace API.DTOs.Product;

public class UpdateProductDto
{
  public int Id { get; set; }
  [Required]
  public required string Name { get; set; }

  [Required]
  public required string Description { get; set; }

  [Required]
  [Range(1, double.MaxValue, ErrorMessage = "Invalid Price amount.")]
  public double Price { get; set; }

  public IFormFile? File { get; set; }

  [Required]
  public required string Type { get; set; }

  [Required]
  public required string Brand { get; set; }

  [Required]
  [Range(1, int.MaxValue, ErrorMessage = "Invalid {0} amount.")]
  public int QuantityInStock { get; set; }
}
