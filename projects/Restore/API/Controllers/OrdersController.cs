using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.Entities.OrderAggregate;
using Microsoft.EntityFrameworkCore;
using API.Extensions;
using API.DTOs.Order;
using API.Entities;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]

[Authorize]
public class OrdersController : BaseApiController

{
  private readonly StoreSqlDbContext _dbContext;

  public OrdersController(StoreSqlDbContext dbContext)
  {
    _dbContext = dbContext;
  }

  [HttpGet]
  public async Task<ActionResult<List<OrderDto>>> GetOrders()
  {

    var orders = await _dbContext.Orders
    // .Include(q => q.OrderItems)
    .ProjectToDto()
    .Where(q => q.BuyerEmail == User.GetUserName())
    .ToListAsync();

    if (orders.Count == 0)
    {
      return NoContent();
    }
    return Ok(orders);
  }

  [HttpGet("{id:int}")]
  public async Task<ActionResult<OrderDto>> GetOrderDetails(int id)
  {
    var order = await _dbContext.Orders
      // .Include(q => q.OrderItems)
      .ProjectToDto()
    .Where(q => q.BuyerEmail == User.GetUserName() && id == q.Id)
    //.FirstOrDefaultAsync(q => id == q.Id);
    .FirstOrDefaultAsync();

    if (order is null)
    {
      return NotFound();
    }
    return Ok(order);
  }

  [HttpPost]
  public async Task<ActionResult<Order>> CreateOrder(CreateOrderDto createOrderDto)
  {
    var basketId = Request.Cookies["basketId"];
    var basket = await _dbContext.Baskets.GetBasketWithItems(basketId);

    if (basket is null || basket.Items.Count == 0 || string.IsNullOrWhiteSpace(basket.PaymentIntentId))
    {
      return BadRequest("Basket is empty or not found");
    }

    var items = CreateOrderItem(basket.Items);
    if (items is null)
    {
      return BadRequest("Some items are out of stock");
    }

    var subtotal = items.Sum(q => q.Price * q.Quantity);
    var deliveryFees = CalculateDeliveryFees(subtotal);
    var discount = Math.Round(subtotal * 0.1, 2);

    // Check if we have an order in DB:
    var order = await _dbContext.Orders
    .Include(q => q.OrderItems)
    .FirstOrDefaultAsync(q => q.PaymentIntentId == basket.PaymentIntentId);

    // New order
    if (order is null)
    {
      order = new Order
      {
        OrderItems = items,
        BuyerEmail = User.GetUserName(),
        ShippingAddress = createOrderDto.ShippingAddress,
        DeliveryFee = deliveryFees,
        Discount = discount,
        Subtotal = subtotal,
        PaymentSummary = createOrderDto.PaymentSummary,
        PaymentIntentId = basket.PaymentIntentId
      };
      _dbContext.Orders.Add(order);
    }
    // Update existing order
    else
    {
      order.OrderItems = items;
    }

    // _dbContext.Baskets.Remove(basket);
    // Response.Cookies.Delete("basketId");

    var result = await _dbContext.SaveChangesAsync();

    if (result == 0)
    {
      return BadRequest("Problem creating order");
    }

    var createdOrder = order.ToDto();

    return CreatedAtAction(
      actionName: nameof(GetOrderDetails),
      routeValues: new { id = order.Id },
      value: createdOrder
    );
  }

  // Helper methods
  private List<OrderItem>? CreateOrderItem(List<BasketItem> items)
  {
    var orderItems = new List<OrderItem>();

    foreach (var item in items)
    {
      var quantityInStock = item.Product.QuantityInStock;

      if (quantityInStock < item.Quantity)
      {
        return null;
      }
      var orderItem = new OrderItem
      {
        ItemOrdered = new ProductItemOrdered
        {
          ProductId = item.ProductId,
          Name = item.Product.Name,
          PictureUrl = item.Product.PictureUrl
        },
        Price = item.Product.Price,
        Quantity = item.Quantity
      };

      orderItems.Add(orderItem);

      // Quantity in stock remaining
      item.Product.QuantityInStock -= item.Quantity;
    }
    return orderItems;
  }
  private double CalculateDeliveryFees(double subtotal)
  {
    var deliveryFees = 5;
    if (subtotal > 100)
    {
      deliveryFees = 0;
    }
    return deliveryFees;
  }
}

