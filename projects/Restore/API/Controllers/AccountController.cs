using API.DTOs.Account;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountController : BaseApiController
{
  private readonly SignInManager<User> _signInManager;
  public AccountController(SignInManager<User> signInManager)
  {
    _signInManager = signInManager;
  }

  [HttpPost("register")]
  public async Task<ActionResult> RegisterUser(RegisterDto registerDto)
  {
    var user = new User
    {
      UserName = registerDto.Email,
      Email = registerDto.Email
    };

    var result = await _signInManager.UserManager.CreateAsync(user, registerDto.Password);

    if (!result.Succeeded)
    {
      var error = result.Errors.FirstOrDefault();

      if (error is not null)
      {
        ModelState.AddModelError(error.Code, error.Description);
      }
      return ValidationProblem();

      // foreach (var error in result.Errors)
      // {       
      //   ModelState.AddModelError(error.Code, error.Description);
      // }
    }

    await _signInManager.UserManager
    .AddToRoleAsync(user: user, role: "User");

    var registeredUSer = await _signInManager.UserManager.GetUserAsync(User);
    var roles = await _signInManager.UserManager.GetRolesAsync(user);

    return Ok(new
    {
      user.Email,
      user.UserName,
      Roles = roles
    });

  }

  [HttpGet("user-info")]
  public async Task<ActionResult> GetUserInfo()
  {
    if (User.Identity?.IsAuthenticated == false)
    {
      return NoContent();
    }
    var user = await _signInManager.UserManager.GetUserAsync(User);
    if (user is null)
    {
      return Unauthorized();
    }
    var roles = await _signInManager.UserManager.GetRolesAsync(user);

    return Ok(new
    {
      user.Email,
      user.UserName,
      Roles = roles
    });
  }
  [HttpPost("logout")]
  public async Task<ActionResult> Logout()
  {
    await _signInManager.SignOutAsync();

    return NoContent();
  }

  [Authorize]
  [HttpPost("address")]
  public async Task<ActionResult<Address>> CreateOrUpdateAddress(
    [FromBody] Address address)
  {
    // Fetch user 
    var user = await _signInManager.UserManager.Users
      .Include(q => q.Address)
      .FirstOrDefaultAsync(q => q.UserName == User.Identity!.Name);

    if (user is null)
    {
      return Unauthorized();
    }
    if (address is null)
    {
      user.Address = address;
    }
    if (user.Address is not null && address is not null)
    {

      user.Address.Name = address.Name;
      user.Address.Line1 = address.Line1;
      user.Address.Line2 = address.Line2;
      user.Address.City = address.City;
      user.Address.State = address.State;
      user.Address.PostalCode = address.PostalCode;
      user.Address.Country = address.Country;
    }

    var result = await _signInManager.UserManager.UpdateAsync(user);
    if (!result.Succeeded)
    {
      return BadRequest("Error updating user address");
    }
    return Ok();
  }

  [Authorize]
  [HttpGet("address")]
  public async Task<ActionResult<Address>> GetSavedAddress()
  {
    var address = await _signInManager.UserManager.Users
    .Where(q => q.UserName == User.Identity!.Name)
    .Select(q => q.Address)
    .FirstOrDefaultAsync();

    if (address is null)
    {
      return NoContent();
    }
    return Ok(address);
  }

}

