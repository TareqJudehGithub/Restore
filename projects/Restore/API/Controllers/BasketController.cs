using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using API.Data;
using API.Entities;
using API.DTOs;
using API.Extensions;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BasketController : BaseApiController
{
  #region Fields
  private readonly StoreSqlDbContext _dbContext;
  #endregion

  #region Constructor
  public BasketController(StoreSqlDbContext dbContext)
  {
    _dbContext = dbContext;
  }
  #endregion

  #region API Endpoints

  [HttpGet]
  public async Task<ActionResult<BasketDto>> GetBasket()
  {
    var basketModel = await RetrieveBasket();

    if (basketModel is null) return NoContent();

    // Map basket model to Dto

    return Ok(basketModel.ToDto());
  }

  [HttpPost]
  public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
  {

    // get bBasket
    var basketModel = await RetrieveBasket();

    basketModel ??= CreateBasket();

    // get product
    var product = await _dbContext.Products
    .FirstOrDefaultAsync(q => q.Id == productId);

    if (product is null)
    {
      return BadRequest("Problem adding item to Basket error.");
    }
    // add item to basket

    basketModel.AddItem(product: product, quantity: quantity);

    // save changes
    var result = await _dbContext.SaveChangesAsync();

    // Map basket model to Dto

    if (result > 0)
    {
      return CreatedAtAction(
        actionName: nameof(GetBasket),
        routeValues: new { id = basketModel.ToDto().BasketId },
        value: basketModel.ToDto()
      );
    }
    else
    {
      return BadRequest("Problem saving/updating Basket.");
    }
  }
  [HttpPut]
  public async Task<ActionResult<BasketDto>> IncreaseBasketItemQty(int productId, int quantity)
  {

    // get product
    var product = await _dbContext.Products
    .FirstOrDefaultAsync(q => q.Id == productId);

    if (product is null)
    {
      return BadRequest("Problem adding item to Basket error.");
    }

    var basketModel = await RetrieveBasket();
    if (basketModel is null)
    {
      return NotFound("Basket not found. Error 404");
    }
    var basketItem = await _dbContext.Products
       .FirstOrDefaultAsync(q => q.Id == productId);


    if (basketItem is null)
    {
      return NotFound("Item not found. Error 404");
    }
    // Increase item quantity
    basketModel.AddItem(product: product, quantity: quantity);

    // save changes
    var result = await _dbContext.SaveChangesAsync();

    // Map basket model to Dto

    if (result > 0)
    {
      return CreatedAtAction(
        actionName: nameof(GetBasket),
        routeValues: new { id = basketModel.ToDto().BasketId },
        value: basketModel.ToDto()
      );
    }
    else
    {
      return BadRequest("Problem saving/updating Basket.");
    }
  }

  [HttpDelete]
  public async Task<ActionResult<BasketDto>> RemoveBasketItem(int productId, int quantity)
  {
    // Get basket
    var basketModel = await RetrieveBasket();

    if (basketModel is null)
    {
      return NotFound("Basket not found. Error 404");
    }

    var basketItem = await _dbContext.Products
    .FirstOrDefaultAsync(q => q.Id == productId);

    if (basketItem is null)
    {
      return NotFound("Item not found. Error 404");
    }
    // Remove item or reduce its quantity
    basketModel.RemoveItem(product: basketItem, quantity: quantity);

    // Check if BasketItems is empty
    if (!basketModel.Items.Any())
    {
      _dbContext.Baskets.Remove(basketModel);
    }

    // Save changes
    var result = await _dbContext.SaveChangesAsync();

    if (result > 0)
    {
      return CreatedAtAction(

      actionName: nameof(GetBasket),
      routeValues: new { id = basketModel.ToDto().BasketId },
      value: basketModel.ToDto()
      );
    }
    else
    {
      return BadRequest("Problem saving/Delete item from Basket.");
    }
  }
  #endregion


  #region Basket helper methods
  private async Task<Basket?> RetrieveBasket()
  {
    return await _dbContext.Baskets
    .Include(q => q.Items)
    .ThenInclude(q => q.Product)
    .FirstOrDefaultAsync(q => q.BasketId == Request.Cookies["basketId"]);
  }

  private Basket CreateBasket()
  {
    // create a new basket and save it to the database
    var basketId = Guid.NewGuid().ToString();
    // create cookie with the basketId and set it to expire in 30 days
    var cookieOptions = new CookieOptions
    {
      IsEssential = true,
      Expires = DateTime.UtcNow.AddDays(30)
    };
    // add the cookie to the response
    Response.Cookies.Append(key: "basketId", value: basketId, options: cookieOptions);

    // create a new basket with the generated basketId
    var basket = new Basket() { BasketId = basketId };

    // Track newly created basket (in memory)
    _dbContext.Baskets.Add(basket);

    return basket;
  }
  #endregion

}
