using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities;

[Table(name: "Baskets", Schema = "dbo")]
public partial class Basket
{
  // Primary Key for Basket entity
  public int Id { get; set; }

  // Unique identifier for the basket, typically a GUID or a string
  public required string BasketId { get; set; }
  // Collection of BasketItem entities associated with this Basket
  public List<BasketItem> Items { get; set; } = [];


  #region Helper Methods - add, remove, and find item(s).
  // Helper Methods just to track entity state in memory.
  public void AddItem(Product product, int quantity)
  {
    if (product is null) ArgumentNullException.ThrowIfNull(product);

    if (quantity <= 0) throw new ArgumentException(
      message: "Quantity should be greater than 0",
      paramName: nameof(quantity)
      );

    var existingItem = FindItem(product.Id);

    // Check if item is already in Basket or not
    if (existingItem == null)
    {
      Items.Add(new BasketItem
      {
        Product = product,
        Quantity = quantity
      });
    }
    else
    {
      // Update item quantity in Basket
      existingItem.Quantity += quantity;
    }
  }
  public void RemoveItem(Product product, int quantity)
  {
    if (quantity <= 0) throw new ArgumentException(
     message: "Quantity should be greater than 0",
     paramName: nameof(quantity)
     );

    var existingItem = FindItem(product.Id);

    if (existingItem is null)
    {
      return;
    }
    ;

    existingItem.Quantity -= quantity;
    if (existingItem.Quantity <= 0)
    {
      Items.Remove(existingItem);
    }
  }

  private BasketItem? FindItem(int productId)
  {
    return Items.FirstOrDefault(item => item.ProductId == productId);
  }
  #endregion
}

