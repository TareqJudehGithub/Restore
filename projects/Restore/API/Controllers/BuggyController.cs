using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BuggyController : BaseApiController
{
  #region Endpoints

  [HttpGet("validation-error")]
  public IActionResult GetValidation()
  {
    ModelState.AddModelError("Problem1", "First error");
    ModelState.AddModelError("Problem2", "Second error");

    return ValidationProblem();
  }
  [HttpGet("bad-request")]
  public IActionResult GetBadRequest()
  {
    return BadRequest("Bad request error code: 400");
  }
  [HttpGet("unauthorized")]
  public IActionResult GetUnauthorized()
  {
    return Unauthorized("Unauthorized error code: 401");
  }
  [HttpGet("not-found")]
  public IActionResult GetNotFound()
  {
    return NotFound("Not Found error code: 404");
  }
  [HttpGet("server-error")]
  public IActionResult GetServerError()
  {

    throw new Exception("Server error code: 500");

  }
  #endregion
}
