using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities;

[Table(name: "BasketItems", Schema = "dbo")]
public class BasketItem
{
  public int Id { get; set; }
  public int Quantity { get; set; }

  // Foreign Key to Product entity
  public int ProductId { get; set; }
  // Navigation Property to Product entity
  public required Product Product { get; set; }

  // Foreign Key to Basket entity 
  public int BasketId { get; set; }
  // Navigation Property to Basket entity 
  public Basket Basket { get; set; } = null!;
}