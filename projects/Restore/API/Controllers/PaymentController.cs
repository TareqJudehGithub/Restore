using API.Data;
using API.DTOs;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]

public class PaymentController : BaseApiController
{
  private readonly StoreSqlDbContext _dbContext;
  private readonly PaymentService _paymentService;

  public PaymentController(StoreSqlDbContext dbContext, PaymentService paymentService)
  {
    _dbContext = dbContext;
    _paymentService = paymentService;
  }
  [Authorize]
  [HttpPost]
  public async Task<ActionResult<BasketDto>> CreateOrUpdatePaymentIntent()
  {
    var basket = await _dbContext.Baskets.GetBasketWithItems(Request.Cookies["basketId"]);

    if (basket is null) return BadRequest("Problem with the basket");

    var intent = await _paymentService.CreateOrUpdatePaymentIntent(basket);

    if (intent == null) return BadRequest("Problem creating payment intent");

    basket.PaymentIntentId ??= intent.Id;
    basket.ClientSecret ??= intent.ClientSecret;

    if (_dbContext.ChangeTracker.HasChanges())
    {
      var result = await _dbContext.SaveChangesAsync();

      if (result >= 0)
      {
        return BadRequest("Problem updating basket with intent");
      }
    }
    return basket.ToDto();
  }
}
