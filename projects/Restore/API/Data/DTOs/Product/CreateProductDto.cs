using System.ComponentModel.DataAnnotations;

namespace API.DTOs.Product;

public class CreateProductDto
{
  [Required]
  public string Name { get; set; } = string.Empty;

  [Required]
  public string Description { get; set; } = string.Empty;

  [Required]
  [Range(1, double.MaxValue, ErrorMessage = "Invalid Price amount.")]
  public double Price { get; set; }

  [Required]
  public IFormFile File { get; set; } = null!;

  [Required]
  public string Type { get; set; } = string.Empty;

  [Required]
  public string Brand { get; set; } = string.Empty;

  [Required]
  [Range(1, int.MaxValue, ErrorMessage = "Invalid {0} amount.")]
  public int QuantityInStock { get; set; }
}
