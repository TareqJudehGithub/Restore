using System.ComponentModel.DataAnnotations;

namespace API.DTOs.Account;

public class RegisterDto
{
  [Required]
  public string Email { get; set; } = "@restore.com";

  [Required]
  public string Password { get; set; } = string.Empty;

  [Required]
  [Compare(otherProperty: "Password")]
  public string ConfirmPassword { get; set; } = string.Empty;
}
