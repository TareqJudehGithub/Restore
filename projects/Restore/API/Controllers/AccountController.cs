using API.DTOs.Account;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

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
      foreach (var error in result.Errors)
      {
        ModelState.AddModelError(error.Code, error.Description);
      }
      return ValidationProblem();
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
}

