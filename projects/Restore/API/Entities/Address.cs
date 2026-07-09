using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace API.Entities;

[Table(name: "Addresses", Schema = "dbo")]
public class Address
{
  [JsonIgnore]
  public int Id { get; set; }
  [Required]
  public required string Name { get; set; }
  public required string Line1 { get; set; }
  public string? Line2 { get; set; }
  public required string City { get; set; }
  public required string State { get; set; }
  [JsonPropertyName("postal_code")]
  public required string PostalCode { get; set; }
  public required string Country { get; set; }
}
