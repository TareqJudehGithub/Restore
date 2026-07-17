using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.DTOs;
using API.Extensions;
using API.Services;
using Stripe;
using Microsoft.EntityFrameworkCore;
using API.Entities.OrderAggregate;

namespace API.Controllers;

[ApiController]
[Route("api/payments")]

public class PaymentController : BaseApiController
{
  private readonly StoreSqlDbContext _dbContext;
  private readonly PaymentService _paymentService;
  private readonly IConfiguration _config;
  private readonly ILogger _logger;


  public PaymentController(
    StoreSqlDbContext dbContext,
    PaymentService paymentService,
    IConfiguration config,
    ILogger<PaymentController> logger
     )
  {
    _dbContext = dbContext;
    _paymentService = paymentService;
    _config = config;
    _logger = logger;
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

      if (result == 0)
      {
        return BadRequest("Problem updating basket with intent");
      }
    }
    return basket.ToDto();
  }
  // Stripe webhook
  [HttpPost("webhook")]
  public async Task<IActionResult> StripeWebhook()
  {
    var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
    try
    {
      var stripeEvent = ConstructStripeEvent(json);
      if (stripeEvent.Data.Object is not PaymentIntent intent)
      {
        return BadRequest("Invalid event data");
      }
      _logger.LogInformation("Stripe webhook received event {EventType} for PaymentIntent {PaymentIntentId}", stripeEvent.Type, intent.Id);
      if (intent.Status == "succeeded")
      {
        await HandlePaymentIntentSucceeded(intent);
      }
      else
      {
        await HandlePaymentFailed(intent);
      }
      return Ok();
    }
    catch (Stripe.StripeException ex)
    {
      _logger.LogError(ex, "Stripe webhook signature verification failed");
      return BadRequest("Invalid Stripe webhook signature");
    }
    catch (Exception ex)
    {
      _logger.LogError(ex, "An unexpected error has occurred.");
      return StatusCode(StatusCodes.Status500InternalServerError, "Unexpected error");
    }
  }

  private async Task HandlePaymentIntentSucceeded(PaymentIntent intent)
  {
    // Check if order was found
    var order = await _dbContext.Orders
    .Include(q => q.OrderItems)
    .FirstOrDefaultAsync(q => q.PaymentIntentId == intent.Id)
    ?? throw new Exception("Order not found");

    if (order.GetTotal() != intent.Amount)
    {
      order.OrderStatus = OrderStatus.PaymentMismatch;
    }
    else
    {
      order.OrderStatus = OrderStatus.PaymentReceived;
    }

    // Remove basket from DB
    var basket = await _dbContext.Baskets
    .FirstOrDefaultAsync(q => q.PaymentIntentId == intent.Id);
    if (basket is not null)
    {
      _dbContext.Baskets.Remove(basket);
    }
    order.OrderStatus = OrderStatus.PaymentReceived;
    await _dbContext.SaveChangesAsync();
  }

  private async Task HandlePaymentFailed(PaymentIntent intent)
  {

    // Check if order was found
    var order = await _dbContext.Orders
    .Include(q => q.OrderItems)
    .FirstOrDefaultAsync(q => q.PaymentIntentId == intent.Id)
    ?? throw new Exception("Order not found;");

    // order found
    foreach (var item in order.OrderItems)
    {
      var productItem = await _dbContext.Products
      .FindAsync(item.ItemOrdered.ProductId)
      ?? throw new Exception("Problem updating order stock");

      productItem.QuantityInStock += item.Quantity;
    }

    order.OrderStatus = OrderStatus.PaymentFailed;

    await _dbContext.SaveChangesAsync();
  }

  private Event ConstructStripeEvent(string json)
  {
    try
    {
      return EventUtility.ConstructEvent(
        json,
        Request.Headers["Stripe-Signature"], _config["StripesSettings:WhSecret"]);
    }
    catch (Exception ex)
    {
      _logger.LogError(ex, "Failed to construct Stripe event");
      throw new StripeException("Invalid signature");
    }
  }
}
